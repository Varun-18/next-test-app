import Head from "next/head";
import Link from "next/link";
import { client } from "../client";

import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

/**
 * This component is a server side component that populates the rich text
 *
 * @param {object} data this is the rich text data that we recive from the contentful cms
 *
 * @returns
 */
export default function Home({ data }) {
  console.log(data);

  // The options are used in such a way that when ever the type of the node is hyperlink then a next/link tag will br rendered and its uri will be the data that was recived from the contentful hyperlink
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <Link className="block" href={`${node.data.uri}`}>
            {children}
          </Link>
        );
      },
    },
  };

  return (
    <div>
      <Head>
        <title>Accelerator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* This document to react components render the rich text recived from the contentful to html elements */}
      <div className="flex flex-col">
        {documentToReactComponents(data, options)}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { items } = await client.getEntries({
    content_type: "mainNavigation",
    select: "fields",
    include: 3,
  });

  return {
    props: {
      data: items[0].fields.navigationTabs[0].fields.tabCols[0].fields.col,
    },
  };
};
