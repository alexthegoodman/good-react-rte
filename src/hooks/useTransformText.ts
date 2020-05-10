import React, { useState, useEffect, createContext } from "react";
import { useSanitize } from "./useSanitize";

export const useTransformText = (
    defaultText = "",
    onChange = (data) => console.info("sanitize", data),
) => {
    const [json, setJson] = useState(null);
    const {sanitized, encoded, setText} = useSanitize(defaultText, onChange);

    let tmpJson = {};
    const makeJson = (value, key): DocumentJson => {
        console.info("makeJson key", value, key);

        switch (key) {
            case "Enter":
                // New paragraph            
                break;

            case "Backspace":
                // Remove and re-parse
                
                break;
            
            case "Tab":
                // Indent
                
                break;
        
            default:
                // Add and re-parse

                break;
        }

        // ** Tokenize ** //
        // const valueParts1 = value.split(" ");
        // let valueParts2;
        // valueParts1.forEach(word => {
        //     // valueParts2
        // });
        // Filter marks: ?([?.!])+

        return {
            cache: {
                plainText: "",
                html: ""
            },
            nodeTree: null,
            textNodes: null
        }
    };

    return {
        sanitized,
        encoded,
        json,
        makeJson
    };
};
