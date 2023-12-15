import Head from "next/head";

import withScrollFixed from "../../common/withScrollFixed";
import FooterOne from "../Footer/FooterOne";
import HeaderFour from "../Header/HeaderFour";

let ScrollFixedHeader = withScrollFixed(HeaderFour);

export default function LayoutFour(props) {
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
