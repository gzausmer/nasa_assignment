import "./header.scss";
import { CSSProperties } from "react";

export function Header({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  return (
    <h1 className={"page_header"} style={style}>
      {text}
    </h1>
  );
}
