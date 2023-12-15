import React from "react";
import Head from "next/head";

import withScrollFixed from "../../common/withScrollFixed";
import HeaderTwo from "../Header/HeaderTwo";
import FooterOne from "../Footer/FooterOne";

let ScrollFixedHeader = withScrollFixed(HeaderTwo);

export default function LayoutTwo(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Eliah | React"}</title>
      </Head>
      <ScrollFixedHeader container={props.container} />
      {props.children}
      <FooterOne />
    </>
  );
}
