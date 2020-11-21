//** Text as JSON */
// const ExampleDocument: DocumentJson = {
//     cache: {
//         plainText: "test placeholder",
//         html: "<p>test <strong>placeholder</strong></p>"
//     },
//     nodeTree: [
//         "123", 
//         {
//             effect: ["bold"],
//             subTree: ["456"]
//         }
//     ],
//     textNodes: [{ id: "123", token: "test" }, { id: "456", token: "placeholder" }]
// };

type TextNodeList = TextNode[] | null;

type TextNodeId = string;

type TreeList = Array<NodeTree | TextNodeId> | null;

type NodeObject = "headline" | "paragraph" | "link" | null;

type EffectObject = "bold" | "italic" | null;

interface DocumentJson {
    cache: {
        plainText: string;
        html: string;
    }
    nodeTree: TreeList;
    textNodes: TextNodeList;
}

interface NodeTree {
    object?: NodeObject;
    effect?: EffectObject[];
    subTree?: TreeList;
}

interface TextNode {
    id: TextNodeId;
    token: string;
}
