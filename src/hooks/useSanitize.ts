import React, { useState, useEffect, createContext } from "react";

import {
  removeNonBreakingSpaces,
  removeEmptyEmphasisElements,
  removeEmptyParagraphElements,
  removeEmptyStrongElements,
  removeLeadingBrElements,
  removeTrailingBrElements,
  transformString
} from 'content-editable-formatter';

const sanitizeHtml = require('sanitize-html');

export const useSanitize = (
  defaultValue = "",
  onChange = (data) => console.info("sanitize", data),
) => {
  const [value, setValue] = useState(defaultValue);

  let sanitizedValue = "";
  let encodedValue = "";
  if (typeof value !== "undefined" && value !== "") {
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

    encodedValue = encodeURI(sanitizedValue);
    
    onChange({
      sanitized: sanitizedValue,
      encoded: encodedValue
    });
  }

  const setText = (text: string) => {
    setValue(text);
  };

  return {
    sanitized: sanitizedValue,
    encoded: encodedValue,
    setText
  };
};
