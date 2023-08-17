import { useRouter } from "next/router";
import React from "react";

/**
 * This components represents a dyanamic route page
 *
 * here we use the rotues to just display the id as the proof of concept
 *
 * @returns A dynamic page
 */
const Dynamic = () => {
  const { query } = useRouter();
  return <div>***** {query.id} *****</div>;
};

export default Dynamic;
