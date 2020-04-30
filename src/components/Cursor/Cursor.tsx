import * as React from "react";

import { CursorProps } from "./Cursor.d";

const Cursor: React.FC<CursorProps> = ({
  ref = null,
  className = "",
  onClick = () => console.info("Click"),
  visible = false
}) => {
  let render = <></>;
  if (visible) {
    render = (
      <div className="cursor"></div>
    );
  }

  return (
    <div className="cursorWrapper">
      {render}
    </div>
  );
};

export default Cursor;
