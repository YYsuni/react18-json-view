# React18 JSON View

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

React function component for displaying javascript arrays and JSON objects.

[**Storybook**](https://react18-json-view.vercel.app/), or [**Try it online**](https://jv.yysuni.com/) [(**Github**)](https://github.com/YYsuni/json-view-online).


![Sample of generated blockies](sample.png "JSON View")


## Installation
```bash
npm i react18-json-view
```

## Usage
```tsx
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

<JsonView src={my_json_object} />
```

### Props
Name|Type|Default|Description
|:---|:---|:---|:---
`src`|`JSON Object`|None|This property contains your input JSON
`collapseStringsAfterLength`|`integer`|99|When an integer value is assigned, strings will be cut off at that length. Collapsed strings are inserted by an ellipsis. String content can be expanded and collapsed by clicking on the string value.
`collapseObjectsAfterLength`|`integer`|20|When an integer value is assigned, the object and array will be collapsed initially.
`enableClipboard`|`boolean`|true|When prop is not false, the user can copy objects and arrays to clipboard by clicking on the clipboard icon.
`collapsed`|`boolean`/`integer`|false|When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth.

## Why
react-json-view does not support React 18.

## Todo
- [x] copy (enableClipboard)
- [x] css
- [x] collapse at a particular depth (collapsed)
- [ ] editable
  - [ ] add
  - [ ] edit
  - [ ] delete
  - [ ] onSelect

## Custom styles
Here are all the style codes, you can freely change color variables, such as --json-property, or others.
```css
.json-view {
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
.json-view:hover > .json-view--copy {
	display: inline-block;
}
.json-view .json-view--pair:hover > .json-view--copy {
	display: inline-block;
}
.json-view .json-view--copy {
	display: none;
	width: 1em;
	height: 1em;
	margin-left: 4px;
	vertical-align: -11%;
	cursor: pointer;
}

.json-view .jv-indent {
	padding-left: 16px;
}
.json-view .jv-chevron {
	display: inline-block;
	vertical-align: -20%;
	cursor: pointer;
	opacity: 0.4;
}
.json-view .jv-chevron:hover {
	opacity: 0.8;
}
.json-view .jv-button {
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;
}
.json-view .cursor-pointer {
	cursor: pointer;
}
```
