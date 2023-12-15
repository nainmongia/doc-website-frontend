import Head from "next/head";

import withScrollFixed from "../../common/withScrollFixed";
import HeaderThree from "../Header/HeaderThree";
import FooterOne from "../Footer/FooterOne";

let ScrollFixedHeader = withScrollFixed(HeaderThree);

export default function LayoutThree(props) {
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
