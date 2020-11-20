import React, { useState, useEffect, createContext } from "react";
import { useSanitize } from "./useSanitize";

import * as _ from "lodash";
import TransformText from "services/TransformText";

export const useTransformText = (
    defaultText = "",
    onChange = (data) => console.info("sanitize", data),
) => {
    const [currentTextNodeId, setCurrentTextNodeId] = useState<string | null>(null);
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

        let newJson: Partial<DocumentJson> = {};
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
                const altJson = transformText.addTextNode({
                    word: key
                });

                const { textNodes } = altJson;

                if (textNodes !== null) {
                    setCurrentTextNodeId(textNodes[textNodes.length - 1].id);
                }

                newJson = _.merge(altJson, newJson);
                
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

        const tmpJson: DocumentJson = {
            cache: {
                plainText: transformText.sanitizeHtmlString(json.cache.plainText).sanitized, // json2PlainText
                html: transformText.sanitizeHtmlString(json.cache.html).sanitized // json2Html
            },
            nodeTree: null, // getTreeByNodeId, updateTreeByNodeId
            textNodes: null, // getTextNodeByPos, getTextNodeById, updateTextNodeById, addTextNode
            ...newJson
        };

        console.info("setTransformText", key, transformText, newJson, tmpJson);

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
