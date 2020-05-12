import React, { useState, useEffect, createContext } from "react";
import { useSanitize } from "./useSanitize";

import * as _ from "lodash";
import TransformText from "services/TransformText";

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

    const setTransformText = (key: string) => {        
        // determine whether to alter or add TextNode
        // determine where to reference the TextNode
        // do not update cache? if I do, I must do json2Html here also

        const transformText = new TransformText(json);

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
                transformText.addTextNode({
                    word: key
                });           
                break;
            default:
                // Extend current TextNode
                break;
        }

        const tmpJson = {
            cache: {
                plainText: transformText.sanitizeHtmlString(json.cache.plainText).sanitized, // json2PlainText
                html: transformText.sanitizeHtmlString(json.cache.html).sanitized // json2Html
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
