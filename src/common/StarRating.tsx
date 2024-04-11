import React from "react";

interface StarRatingProps {
  rating: number;
  symbol?: string;
  colors: {
    background: string;
    foreground: string;
  };
}

export default function StarRating(props: StarRatingProps) {
  const symbol = props.symbol || "★";

  return (
    <>
      <span></span>
    </>
  );
}
