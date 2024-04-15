import React from "react";
import { Helmet } from "react-helmet";

export default function DocTitle(props: {
  title?: string;
  children?: React.ReactNode;
}) {
  const title = props.title || props.children;

  return (
    <Helmet>
      <title>{`Surity | Web3 Insurance ${title && "| " + title}`}</title>
    </Helmet>
  );
}
