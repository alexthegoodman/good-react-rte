import React, { useState, useEffect, createContext } from "react";
import { useSanitize } from "./useSanitize";

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

import * as _ from "lodash";

export const useTransformText = (
    defaultText = "",
    onChange = (data) => console.info("sanitize", data),
) => {
    const [json, setJson] = useState<DocumentJson>({
        cache: {
            plainText: "",
            html: ""
        },
        nodeTree: null,
        textNodes: null
    });

    const sanitizeHtmlString = (value) => {
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
        }

        return {
            sanitized: sanitizedValue,
            encoded: encodedValue
        };
    }

    const setTransformText = (key) => {        
        // determine whether to alter or add TextNode
        // determine where to reference the TextNode
        // do not update cache? if I do, I must do json2Html here also

        switch (key) {
            case "Alt" || "Control" || "Meta" || "Escape" || "Shift" || "CapsLock": // use react-hotkeys
                break;
            case "ArrowUp" || "ArrowRight" || "ArrowDown" || "ArrowLeft": // use react-hotkeys
                break;
            case "Backspace" || "Delete":
                // Remove and re-parse
                break;
            case "Space" || " ":
                // New TextNode
                break;
            case "Tab":
                // Indent
                break;
            case "Enter":
                // New paragraph            
                break;
            default:
                // Extend current TextNode
                break;
        }

        const tmpJson = {
            cache: {
                plainText: sanitizeHtmlString(json.cache.plainText).sanitized, // json2PlainText
                html: sanitizeHtmlString(json.cache.html).sanitized // json2Html
            },
            nodeTree: null, // getTreeByNodeId, updateTreeByNodeId
            textNodes: null // getTextNodeByPos, getTextNodeById, updateTextNodeById, addTextNode
        };

        // TODO: json2Md, json2ReactNative
        // TODO: SpaCy, ML prep
        // TODO: Separate all Marks as separate TextNodes?

        setJson(tmpJson);
    };

    return {
        json,
        setTransformText
    };
};
