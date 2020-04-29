import * as React from "react";

import { BaseEditorProps } from "./BaseEditor.d";

import {
  removeNonBreakingSpaces,
  removeEmptyEmphasisElements,
  removeEmptyParagraphElements,
  removeEmptyStrongElements,
  removeLeadingBrElements,
  removeTrailingBrElements,
  transformString
} from 'content-editable-formatter';
import * as useKey from 'use-key-hook';
import Cursor from "components/Cursor/Cursor";
// import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const sanitizeHtml = require('sanitize-html');

const BaseEditor: React.FC<BaseEditorProps> = ({
  ref = null,
  className = "",
  onClick = () => console.info("Click"),
  disable = false,
  onChange = val => console.info("good-react-rte onChange", val)
}) => {
  const editableRef = React.useRef(null);
  const [html, setHtml] = React.useState("");
  const [blur, setBlur] = React.useState(false);

  const sanitize = (value: string) => {
    let sanitizedValue = "";
    if (typeof value !== "undefined") {
      sanitizedValue = transformString(value)(
        removeNonBreakingSpaces,
        removeEmptyEmphasisElements,
        removeEmptyParagraphElements,
        removeEmptyStrongElements,
        removeLeadingBrElements,
        removeTrailingBrElements
      );

      sanitizedValue = sanitizeHtml(sanitizedValue, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
        allowedAttributes: {
          'a': [ 'href' ]
        },
        allowedIframeHostnames: ['www.youtube.com']
      });

      const encodedValue = encodeURI(sanitizedValue);
      
      onChange({
        sanitized: sanitizedValue,
        encoded: encodedValue
      });
    }

    return sanitizedValue;
  }

  const triggerChange = (html: string, newKey: string) => {
    // Insert new char in correct spot
    const value = html + newKey;

    // Clean HTML output
    return sanitize(value);
  };

  useKey((pressedKey: any, event: any) => {
    setHtml((html: string) => {
      return triggerChange(html, event.key);
    });
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
        {html}
        <Cursor 
          visible={blur}
        />
      </div>
    </section>
  );
};

export default BaseEditor;
