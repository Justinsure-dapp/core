import React from "react";
import useWeb3 from "../contexts/web3context";

export default function FormattedCurrency(props: { children: string }) {
  const { FUSD } = useWeb3();

  if (isNaN(Number(props.children)))
    return <p className="text-red-500">Error while displaying number</p>;

  const formatted = FUSD.value(Number(props.children));

  return <span>{formatted}</span>;
}
