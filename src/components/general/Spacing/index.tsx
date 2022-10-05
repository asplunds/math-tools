import React from "react";

type Props = {
  space: string;
};

export default function Spacing({ space }: Props) {
  return <div style={{ margin: space }} />;
}
