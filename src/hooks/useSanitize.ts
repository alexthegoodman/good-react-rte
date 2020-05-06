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
  value = "",
  onChange = (data) => console.info("sanitize", data),
) => {
  let sanitizedValue = "";
  let encodedValue = "";
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

    encodedValue = encodeURI(sanitizedValue);
    
    onChange({
      sanitized: sanitizedValue,
      encoded: encodedValue
    });
  }

  return {
    sanitized: sanitizedValue,
    encoded: encodedValue
  };
};
