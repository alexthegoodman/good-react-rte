import * as React from "react";

import { CursorProps } from "./Cursor.d";

const Cursor: React.FC<CursorProps> = ({
  ref = null,
  className = "",
  onClick = () => console.info("Click"),
  visible = false
}) => {
  return visible ? <span>|</span> : <></>;
};

export default Cursor;
