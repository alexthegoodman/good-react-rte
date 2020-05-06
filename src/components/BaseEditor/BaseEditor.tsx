import * as React from "react";

import { BaseEditorProps } from "./BaseEditor.d";

import * as useKey from 'use-key-hook';
import Cursor from "components/Cursor/Cursor";
import { useSanitize } from "hooks/useSanitize";
import { useParseText } from "hooks/useParseText";

const BaseEditor: React.FC<BaseEditorProps> = ({
  ref = null,
  className = "",
  onClick = () => console.info("Click"),
  disable = false,
  onChange = val => console.info("good-react-rte onChange", val)
}) => {
  const editableRef = React.useRef(null);
  const [blur, setBlur] = React.useState(false);
  const {sanitized, encoded, json, makeJson} = useParseText("", onChange);
  // TODO: jsonToText?

  // TODO: cause too many renders on each key stroke? (2+)
  useKey((pressedKey: any, event: KeyboardEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    setBlur((blur: boolean) => {
      if (blur) {
        makeJson(sanitized, event.key);
      }
      return blur;
    })
  });

  return (
    <section className="baseEditorWrapper">
      <div 
        ref={editableRef}
        className="baseEditor"
        onClick={() => setBlur(!blur)}
        style={{
          height: 150
        }}
      >
        {sanitized}
        <Cursor 
          visible={blur}
        />
      </div>
    </section>
  );
};

export default BaseEditor;
