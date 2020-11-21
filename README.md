# Good React Rich-Text-Editor

Use to create multi-page tet documents. Export or store as JSON, HTML, and plaintext. 

Inspiration: Quill, Draft, react-draft-wysiwyg, Slate

## Functional Model

`Document JSON`
The complete editor input state
`Tree List`
An array of Node Tree objects and Node IDs in sequential order (nodeTree in the Document)
`Node Tree`
An object describing the effects and tags applied to the specified (group of) Text Nodes (an object of the Tree List)
`Text Node List`
An array of Text Nodes (textNodes in the Document)
`Text Node`
An object containing a single word (token)
<br />

##### Example Document JSON:
```
const ExampleDocument: DocumentJson = {
    cache: {
        plainText: "test words placeholder more to say here",
        html: "<p>test words <strong>placeholder</strong></p><p>more to <em>say here</em></p>"
    },
    nodeTree: [
        {
            object: ["paragraph"],
            subTree: [
              "123",
              "456",
              { effect: "bold", subTree: ["789"] }
            ]
        },
        {
            object: ["paragraph"],
            subTree: [
              "135",
              "794",
              { effect: "italic", subTree: ["243", "874"] }
            ]
        }
    ],
    textNodes: [
      { id: "123", token: "test" }, 
      { id: "456", token: "words" },
      { id: "789", token: "placeholder" },
      { id: "135", token: "more" },
      { id: "794", token: "to" },
      { id: "243", token: "say" },
      { id: "874", token: "here" }
    ]
};
```

## Installation

- `yarn add good-react-rte`

## Use

- `import { Editor } from "good-react-rte";`

## Tooling

- Storybook
- Cypress
- cypress-storybook (no need for webpack-dev-server)
- Performance testing?

## Features

### Priority

- File menu (some needed)
  - "Save" (send data out via event handler)
  - Print
- Edit menu
  - Undo
  - Redo
- Text Editor
  - Multi-Page or Single-Page
  - Margins feature?
  - 1 Page and Side-by-Side Pages views
  - Emojis
  - Standardized headers (1-6) and body text

### Roadmap

- Formatting menu (some needed)
  - Text changes (font size, line height)
  - Text layout (columns)
- Insert menu (charts, tables, page break, etc)
- Tools and Help menus
- Auto-save
- Drafts

## Contributing

Email Alex at alexthegoodman@gmail.com
