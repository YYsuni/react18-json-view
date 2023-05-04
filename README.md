# React18 JSON View
React function component for displaying javascript arrays and JSON objects.

[**Storybook**](https://react18-json-view.vercel.app/)

![Sample of generated blockies](sample.png "JSON View")


## Installation
```bash
npm install react18-json-view --save
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

## Why
react-json-view does not support React 18.

## Todo
- [x] copy (enableClipboard)
- [ ] collapse at a particular depth (collapsed)
- [ ] css
