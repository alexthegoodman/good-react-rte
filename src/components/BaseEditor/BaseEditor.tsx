import * as React from "react";

import { BaseEditorProps } from "./BaseEditor.d";

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const BaseEditor: React.FC<BaseEditorProps> = ({
  ref = null,
  className = "",
  onClick = () => console.info("Click"),
  disable = false
}) => {
  const editableRef = React.useRef(null);
  const [html, setHtml] = React.useState("");
  const triggerChange = (e: ContentEditableEvent) => {
    const { value } = e.currentTarget;
    if (typeof value !== "undefined") {
      setHtml(e.currentTarget.value);
    }
  };

  return (
    <ContentEditable
      innerRef={editableRef}
      html={html}
      disabled={disable}
      onChange={triggerChange}
      tagName='article'
    />
  );
};

export default BaseEditor;
