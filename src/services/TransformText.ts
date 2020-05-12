import {
    removeNonBreakingSpaces,
    removeEmptyEmphasisElements,
    removeEmptyParagraphElements,
    removeEmptyStrongElements,
    removeLeadingBrElements,
    removeTrailingBrElements,
    transformString
} from 'content-editable-formatter';
  
import * as _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

const sanitizeHtml = require('sanitize-html');

export default class TransformText {
    public json: DocumentJson;

    constructor(json: DocumentJson) {
        this.json = json;
    }

    sanitizeHtmlString(value: string) {
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

    json2PlainText() {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    json2Html() {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    getTreeByNodeId(id: string) {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    updateTreeByNodeId(id, treeProps: NodeTree) {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    getTextNodeByPos(pos: number) {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    getTextNodeById(id: string) {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    updateTextNodeById(id, nodeProps: TextNode) {
        let tmpJson = this.json;
        return tmpJson;
    }
    
    addTextNode(nodeProps: Partial<TextNode>) {
        let tmpJson = _.cloneDeep(this.json);
        if (tmpJson.textNodes !== null) {
            tmpJson.textNodes[tmpJson.textNodes.length] = {
                id: uuidv4(),
                word: "",
                ...nodeProps
            }
        }
        
        return tmpJson;
    }
}