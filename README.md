# [React18 JSON View](https://jv.yysuni.com/)

<p >
  <a href="https://www.npmjs.com/package/react18-json-view" target="_blank">
    <img src="https://img.shields.io/npm/v/react18-json-view.svg" />
  </a>
  <a href="https://www.npmjs.com/package/react18-json-view" target="_blank">
    <img src="https://img.shields.io/npm/dm/react18-json-view.svg" />
  </a>
    <a href="https://github.com/YYsuni/react18-json-view/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/react18-json-view.svg">
  </a>
</p>

React function component for displaying javascript arrays and JSON objects. Supports all JS types.

[Website](https://jv.yysuni.com/), [Storybook](https://react18-json-view.vercel.app/),[Online](https://json-view-online.vercel.app/)

![JSON View](sample.png 'JSON View')

## Installation

```bash
npm i react18-json-view
```

```bash
npm i react18-json-view@canary
```

## Usage

```tsx
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
// If dark mode is needed, import `dark.css`.
// import 'react18-json-view/src/dark.css'

;<JsonView src={my_json_object} />

// If needed, you can use the internal stringify function.
// import { stringify } from 'react18-json-view'
```

### Props

| Name                                                    | Type                                                                                                                              | Default                                                                                             | Description                                                                                                                                                                                    |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                                                   | `JSON Object`                                                                                                                     | None                                                                                                | <div style="min-width: 200px"> This property contains your input JSON </div>                                                                                                                   |
| `className`                                             | `string`                                                                                                                          | None                                                                                                | The CSS class name(s) to apply to the component.                                                                                                                                               |
| `style`                                                 | `JSON Object`                                                                                                                     | None                                                                                                | An object containing custom style rules to apply to the component.                                                                                                                             |
| `dark`                                                  | `boolean`                                                                                                                         | `false`                                                                                             | Keep in dark mode (Don't forget to import `dark.css`)                                                                                                                                          |
| `theme`                                                 | `default` \| `a11y` \| `github` \| `vscode` \| `atom`\|`winter-is-coming`                                                         | `'default'`                                                                                         | Color theme                                                                                                                                                                                    |
| `enableClipboard`                                       | `boolean`                                                                                                                         | `true`                                                                                              | Whether enable clipboard feature.                                                                                                                                                              |
| `matchesURL`                                            | `boolean`                                                                                                                         | `true`                                                                                              | Show the link icon if value is string and matches URL regex pattern.                                                                                                                           |
| `urlRegExp`                                             | `RegExp`                                                                                                                          | `/^(((ht\|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/` | URL RegExp pattern.                                                                                                                                                                            |
| `displaySize`                                           | `boolean` \| `integer` \| 'collapsed' \| 'expanded'                                                                               | `false`                                                                                             | Whether display the size of `Object`, `Array`.                                                                                                                                                 |
| `displayArrayIndex`                                     | `boolean`                                                                                                                         | `true`                                                                                              | Whether display the index of `Array`.                                                                                                                                                          |
| `collapseStringsAfterLength`                            | `integer`                                                                                                                         | `99`                                                                                                | When an integer value is assigned, strings longer than that length will be truncated and indicated by an ellipsis. To expand or collapse the string content, simply click on the string value. |
| `customizeCollapseStringUI`                             | ` (str_show: string, truncated: boolean) => (JSX.Element \| string)` \| `string`                                                  | -                                                                                                   | Customize the collapse string UI.                                                                                                                                                              |
| `ignoreLargeArray`                                      | `boolean`                                                                                                                         | `false`                                                                                             | Prevent collapsing large array(length > 100) behavior since v0.2.7                                                                                                                             |
| `collapseStringMode`                                    | `'directly'` \| `'word'` \| `'address'`                                                                                           | `'directly'`                                                                                        | If the `word` is assigned, the collapsed length will be adjusted to fully display the last word.                                                                                               |
| `collapsed`                                             | `boolean` \| `integer` \| `function`                                                                                              | `false`                                                                                             | When set to true(false), all nodes will be (not) collapsed by default. When using an integer value, it will collapse at a specific depth. The collapsed also can be a function.                |
| `onCollapse`                                            | `function`                                                                                                                        | -                                                                                                   | `(params: { isCollapsing: boolean, node: Record<string, any> \| Array<any>, indexOrName: string \| number \| undefined, depth: number }) => void`                                              |
| `collapseObjectsAfterLength`                            | `integer`                                                                                                                         | `99`                                                                                                | When an integer value is assigned, the object and array will initially collapse.                                                                                                               |
| `editable`                                              | `boolean` \| {add?: `boolean`, edit?: `boolean`, delete?: `boolean`}                                                              | `false`                                                                                             | When set to true, you can add, edit, or delete the property, and the actions will trigger onAdd, onEdit, or onDelete. Options is available.                                                    |
| `onAdd`                                                 | `function`                                                                                                                        | -                                                                                                   | `(params: { indexOrName: string\| number, depth: number, src: any; parentType: 'object' \| 'array' }) => void`                                                                                 |
| `onDelete`                                              | `function`                                                                                                                        | -                                                                                                   | `(params:{ value: any,indexOrName: string \| number,depth: number,src: any,parentType: 'object' \| 'array'}) => void`                                                                          |
| `onEdit`                                                | `function`                                                                                                                        | -                                                                                                   | `(params: { newValue: any, oldValue: any, depth: number, src: any, indexOrName: string \| number, parentType: 'object' \| 'array'}) => void`                                                   |
| `customizeNode`                                         | `ReactElement`\|`ReactComponent`\|`Options`                                                                                       | -                                                                                                   | Highly customize every node.                                                                                                                                                                   |
| `customizeCopy`                                         | `(node: any, nodeMeta: NodeMeta) => any`                                                                                          | internal stringify                                                                                  | Customize copy behavior, only the returned non-empty string will be written to clipboard.                                                                                                      |
| `CopyComponent` \/ `DoneComponent` \/ `CancelComponent` | `React.FC` \/ `React.Component` `<{ onClick: (event: React.MouseEvent) => void; className: string ; style: React.CSSProperties}>` | -                                                                                                   | Customize copy icon.                                                                                                                                                                           |
| `CopiedComponent`                                       | `React.FC` \/ `React.Component` `<{ className: string; style: React.CSSProperties }>`                                             | -                                                                                                   | Customize copied icon.                                                                                                                                                                         |
| `CustomOperation`                                       | `React.FC` \/ `React.Component` `<{ node: any }>`                                                                                 | -                                                                                                   | Custom Operation                                                                                                                                                                               |

### Collapsed function

```ts
;(params: {
	node: Record<string, any> | Array<any> // Object or array
	indexOrName: number | string | undefined
	depth: number
	size: number // Object's size or array's length
}) => boolean
```

### Editable options

```ts
{
  add?: boolean
  edit?: boolean
  delete?: boolean
}
```

> onEdit, OnDelete, onAdd and OnChange add `parentPath` field, allow us to correctly indicate which field in the JSON is being edited.

### CustomizeNode

```ts
(params: { node: any; indexOrName: number | string | undefined; depth: number }) =>
  | {
    add?: boolean
    edit?: boolean
    delete?: boolean
    enableClipboard?: boolean
    collapsed?: boolean
    className?: string
  }
  | React.FC
  | typeof React.Component
  | React.ReactElement<any, any>
```

### NodeMeta

```ts
{ depth: number; indexOrName?: number | string; parent?: Record<string, any> | Array<any>; parentPath: string[], currentPath: string[] }
```

## Editable

### How to generate object/array

The editor uses `JSON.parse(<input-value>)`. While in edit mode, you can enter `({})` or `([])`, which will cause the result of eval to become a new object or array.

> `{}` and `[]` will be auto convert to `({})`,`([])`

### How the editor works

This component does not perform any cloning operations, so every step of the operation is carried out on the original object. If cloning is required, please handle it yourself.

### Edit keyboard shortcuts

When element is editable:

- `Ctrl/Cmd+Click` => Edit Mode
- `Enter` => Submit
- `Esc` => Cancel

## Custom themes

Below are the default theme variables that you can easily customize to fit your needs.

```css
.json-view {
	color: #4d4d4d;
	--json-property: #009033;
	--json-index: #676dff;
	--json-number: #676dff;
	--json-string: #b2762e;
	--json-boolean: #dc155e;
	--json-null: #dc155e;
}
.json-view .json-view--property {
	color: var(--json-property);
}
.json-view .json-view--index {
	color: var(--json-index);
}
.json-view .json-view--number {
	color: var(--json-number);
}
.json-view .json-view--string {
	color: var(--json-string);
}
.json-view .json-view--boolean {
	color: var(--json-boolean);
}
.json-view .json-view--null {
	color: var(--json-null);
}
```

## Why

react-json-view does not support React 18.

## Todo

- [x] copy (enableClipboard)
- [x] css
- [x] collapse at a particular depth (collapsed)
- [x] editable
  - [x] add
  - [x] edit
  - [x] delete
  - [x] onChange
  - [ ] onSelect
- [x] dark mode
- [ ] custom icon
  - [x] export default icons
- [x] more usability/scenarios
- [ ] gif guide
- [x] more color themes(dark)
- [x] collapse objects callback
- [x] editable option
- [x] advance customization
  - [ ] access internal actions
- [ ] map/set viewer
- [ ] display data type
- [x] display object size
- [ ] handle circle loop
- [x] redesign docs
- [x] truncate long strings
- [ ] custom `stringify`
- [x] split large array

* tree?
