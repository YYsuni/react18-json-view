import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { useContext, useState, useCallback, useEffect, useRef, isValidElement, useMemo, createContext } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var toggleSelection = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};

var deselectCurrent = toggleSelection;

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") { // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else { // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

var copyToClipboard = copy;

var copy$1 = /*@__PURE__*/getDefaultExportFromCjs(copyToClipboard);

function isObject(node) {
    return Object.prototype.toString.call(node) === '[object Object]';
}
function objectSize(node) {
    return Array.isArray(node) ? node.length : isObject(node) ? Object.keys(node).length : 0;
}
function stringifyForCopying(node, space) {
    // return single string nodes without quotes
    if (typeof node === 'string') {
        return node;
    }
    try {
        return JSON.stringify(node, (key, value) => {
            switch (typeof value) {
                case 'bigint':
                    return String(value) + 'n';
                case 'number':
                case 'boolean':
                case 'object':
                case 'string':
                    return value;
                default:
                    return String(value);
            }
        }, space);
    }
    catch (error) {
        return `${error.name}: ${error.message}` || 'JSON.stringify failed';
    }
}
function writeClipboard(value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield navigator.clipboard.writeText(value);
        }
        catch (err) {
            copy$1(value);
        }
    });
}
function isCollapsed(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions) {
    if (customOptions && customOptions.collapsed !== undefined)
        return !!customOptions.collapsed;
    if (typeof collapsed === 'boolean')
        return collapsed;
    if (typeof collapsed === 'number' && depth > collapsed)
        return true;
    const size = objectSize(node);
    if (typeof collapsed === 'function') {
        const result = safeCall(collapsed, [{ node, depth, indexOrName, size }]);
        if (typeof result === 'boolean')
            return result;
    }
    if (Array.isArray(node) && size > collapseObjectsAfterLength)
        return true;
    if (isObject(node) && size > collapseObjectsAfterLength)
        return true;
    return false;
}
function isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions) {
    if (customOptions && customOptions.collapsed !== undefined)
        return !!customOptions.collapsed;
    if (typeof collapsed === 'boolean')
        return collapsed;
    if (typeof collapsed === 'number' && depth > collapsed)
        return true;
    const size = Math.ceil(node.length / 100);
    if (typeof collapsed === 'function') {
        const result = safeCall(collapsed, [{ node, depth, indexOrName, size }]);
        if (typeof result === 'boolean')
            return result;
    }
    if (Array.isArray(node) && size > collapseObjectsAfterLength)
        return true;
    if (isObject(node) && size > collapseObjectsAfterLength)
        return true;
    return false;
}
function ifDisplay(displaySize, depth, fold) {
    if (typeof displaySize === 'boolean')
        return displaySize;
    if (typeof displaySize === 'number' && depth > displaySize)
        return true;
    if (displaySize === 'collapsed' && fold)
        return true;
    if (displaySize === 'expanded' && !fold)
        return true;
    return false;
}
function safeCall(func, params) {
    try {
        return func(...params);
    }
    catch (event) {
        reportError(event);
    }
}
function editableAdd(editable) {
    if (editable === true)
        return true;
    if (isObject(editable) && editable.add === true)
        return true;
}
function editableEdit(editable) {
    if (editable === true)
        return true;
    if (isObject(editable) && editable.edit === true)
        return true;
}
function editableDelete(editable) {
    if (editable === true)
        return true;
    if (isObject(editable) && editable.delete === true)
        return true;
}
function isReactComponent(component) {
    return typeof component === 'function';
}
function customAdd(customOptions) {
    return !customOptions || customOptions.add === undefined || !!customOptions.add;
}
function customEdit(customOptions) {
    return !customOptions || customOptions.edit === undefined || !!customOptions.edit;
}
function customDelete(customOptions) {
    return !customOptions || customOptions.delete === undefined || !!customOptions.delete;
}
function customCopy(customOptions) {
    return !customOptions || customOptions.enableClipboard === undefined || !!customOptions.enableClipboard;
}
function customMatchesURL(customOptions) {
    return !customOptions || customOptions.matchesURL === undefined || !!customOptions.matchesURL;
}
function resolveEvalFailedNewValue(type, value) {
    if (type === 'string') {
        return value.trim().replace(/^\"([\s\S]+?)\"$/, '$1');
    }
    return value;
}

var _path$8;
function _extends$8() { return _extends$8 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$8.apply(null, arguments); }
var SvgAngleDown = function SvgAngleDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none",
    viewBox: "0 0 16 16"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M12.473 5.806a.666.666 0 0 0-.946 0L8.473 8.86a.667.667 0 0 1-.946 0L4.473 5.806a.667.667 0 1 0-.946.94l3.06 3.06a2 2 0 0 0 2.826 0l3.06-3.06a.667.667 0 0 0 0-.94"
  })));
};

var _path$7;
function _extends$7() { return _extends$7 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$7.apply(null, arguments); }
var SvgCopy = function SvgCopy(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M17.542 2.5h-4.75a3.963 3.963 0 0 0-3.959 3.958v4.75a3.963 3.963 0 0 0 3.959 3.959h4.75a3.963 3.963 0 0 0 3.958-3.959v-4.75A3.963 3.963 0 0 0 17.542 2.5m2.375 8.708a2.38 2.38 0 0 1-2.375 2.375h-4.75a2.38 2.38 0 0 1-2.375-2.375v-4.75a2.38 2.38 0 0 1 2.375-2.375h4.75a2.38 2.38 0 0 1 2.375 2.375zm-4.75 6.334a3.963 3.963 0 0 1-3.959 3.958h-4.75A3.963 3.963 0 0 1 2.5 17.542v-4.75a3.963 3.963 0 0 1 3.958-3.959.791.791 0 1 1 0 1.584 2.38 2.38 0 0 0-2.375 2.375v4.75a2.38 2.38 0 0 0 2.375 2.375h4.75a2.38 2.38 0 0 0 2.375-2.375.792.792 0 1 1 1.584 0"
  })));
};

var _path$6, _path2$5;
function _extends$6() { return _extends$6 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$6.apply(null, arguments); }
var SvgCopied = function SvgCopied(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M17.25 3H6.75A3.755 3.755 0 0 0 3 6.75v10.5A3.754 3.754 0 0 0 6.75 21h10.5A3.754 3.754 0 0 0 21 17.25V6.75A3.755 3.755 0 0 0 17.25 3m2.25 14.25a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25z"
  })), _path2$5 || (_path2$5 = /*#__PURE__*/React.createElement("path", {
    fill: "#14C786",
    d: "M10.312 14.45 7.83 11.906a.625.625 0 0 0-.896 0 .66.66 0 0 0 0 .918l2.481 2.546a1.26 1.26 0 0 0 .896.381 1.24 1.24 0 0 0 .895-.38l5.858-6.011a.66.66 0 0 0 0-.919.625.625 0 0 0-.896 0z"
  })));
};

function CopyButton({ node, nodeMeta }) {
    const { customizeCopy, CopyComponent, CopiedComponent } = useContext(JsonViewContext);
    const [copied, setCopied] = useState(false);
    const copyHandler = (event) => {
        event.stopPropagation();
        const value = customizeCopy(node, nodeMeta);
        if (typeof value === 'string' && value) {
            writeClipboard(value);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };
    return copied ? (typeof CopiedComponent === 'function' ? (jsx(CopiedComponent, { className: 'json-view--copy', style: { display: 'inline-block' } })) : (jsx(SvgCopied, { className: 'json-view--copy', style: { display: 'inline-block' } }))) : typeof CopyComponent === 'function' ? (jsx(CopyComponent, { onClick: copyHandler, className: 'json-view--copy' })) : (jsx(SvgCopy, { onClick: copyHandler, className: 'json-view--copy' }));
}

function NameValue({ indexOrName, value, depth, deleteHandle, editHandle, parent, parentPath }) {
    const { displayArrayIndex } = useContext(JsonViewContext);
    const isArray = Array.isArray(parent);
    return (jsxs("div", { className: 'json-view--pair', children: [!isArray || (isArray && displayArrayIndex) ? (jsxs(Fragment, { children: [jsx("span", { className: typeof indexOrName === 'number' ? 'json-view--index' : 'json-view--property', children: indexOrName }), ":", ' '] })) : (jsx(Fragment, {})), jsx(JsonNode, { node: value, depth: depth + 1, deleteHandle: (indexOrName, parentPath) => deleteHandle(indexOrName, parentPath), editHandle: (indexOrName, newValue, oldValue, parentPath) => editHandle(indexOrName, newValue, oldValue, parentPath), parent: parent, indexOrName: indexOrName, parentPath: parentPath })] }));
}

var _path$5, _path2$4;
function _extends$5() { return _extends$5 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$5.apply(null, arguments); }
var SvgTrash = function SvgTrash(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M18.75 6h-2.325a3.76 3.76 0 0 0-3.675-3h-1.5a3.76 3.76 0 0 0-3.675 3H5.25a.75.75 0 0 0 0 1.5H6v9.75A3.754 3.754 0 0 0 9.75 21h4.5A3.754 3.754 0 0 0 18 17.25V7.5h.75a.75.75 0 1 0 0-1.5m-7.5-1.5h1.5A2.255 2.255 0 0 1 14.872 6H9.128a2.255 2.255 0 0 1 2.122-1.5m5.25 12.75a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25V7.5h9z"
  })), _path2$4 || (_path2$4 = /*#__PURE__*/React.createElement("path", {
    fill: "#DA0000",
    d: "M10.5 16.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 1 0-1.5 0v4.5a.75.75 0 0 0 .75.75M13.5 16.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 1 0-1.5 0v4.5a.75.75 0 0 0 .75.75"
  })));
};

var _path$4, _path2$3;
function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
var SvgAddSquare = function SvgAddSquare(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M21 6.75v10.5A3.754 3.754 0 0 1 17.25 21H6.75A3.754 3.754 0 0 1 3 17.25V6.75A3.754 3.754 0 0 1 6.75 3h10.5A3.754 3.754 0 0 1 21 6.75m-1.5 0c0-1.24-1.01-2.25-2.25-2.25H6.75C5.51 4.5 4.5 5.51 4.5 6.75v10.5c0 1.24 1.01 2.25 2.25 2.25h10.5c1.24 0 2.25-1.01 2.25-2.25z"
  })), _path2$3 || (_path2$3 = /*#__PURE__*/React.createElement("path", {
    fill: "#14C786",
    d: "M15 12.75a.75.75 0 1 0 0-1.5h-2.25V9a.75.75 0 1 0-1.5 0v2.25H9a.75.75 0 1 0 0 1.5h2.25V15a.75.75 0 1 0 1.5 0v-2.25z"
  })));
};

var _path$3, _path2$2;
function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
var SvgDone = function SvgDone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9m0 16.5a7.5 7.5 0 1 1 7.5-7.5 7.51 7.51 0 0 1-7.5 7.5"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#14C786",
    d: "m10.85 13.96-1.986-2.036a.5.5 0 0 0-.716 0 .527.527 0 0 0 0 .735l1.985 2.036a1 1 0 0 0 .717.305 1 1 0 0 0 .716-.305l4.686-4.808a.526.526 0 0 0 0-.735.5.5 0 0 0-.716 0z"
  })));
};

var _path$2, _path2$1;
function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
var SvgCancel = function SvgCancel(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#DA0000",
    d: "M15 9a.75.75 0 0 0-1.06 0L12 10.94 10.06 9A.75.75 0 0 0 9 10.06L10.94 12 9 13.94A.75.75 0 0 0 10.06 15L12 13.06 13.94 15A.75.75 0 0 0 15 13.94L13.06 12 15 10.06A.75.75 0 0 0 15 9"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9m0 16.5a7.5 7.5 0 1 1 7.5-7.5 7.51 7.51 0 0 1-7.5 7.5"
  })));
};

function LargeArrayNode({ originNode, node, depth, index, deleteHandle: _deleteSelf, customOptions, startIndex, parent, parentPath }) {
    const { enableClipboard, src, onEdit, onChange, forceUpdate, displaySize, CustomOperation } = useContext(JsonViewContext);
    const currentPath = [...parentPath, String(index)];
    const [fold, setFold] = useState(true);
    // Edit property
    const editHandle = useCallback((indexOrName, newValue, oldValue) => {
        originNode[indexOrName] = newValue;
        if (onEdit)
            onEdit({
                newValue,
                oldValue,
                depth,
                src,
                indexOrName,
                parentType: 'array',
                parentPath
            });
        if (onChange)
            onChange({ type: 'edit', depth, src, indexOrName, parentType: 'array', parentPath });
        forceUpdate();
    }, [node, onEdit, onChange, forceUpdate]);
    // Delete property
    const deleteHandle = (index) => {
        originNode.splice(index, 1);
        if (_deleteSelf)
            _deleteSelf(index, parentPath);
        forceUpdate();
    };
    const Icons = (jsxs(Fragment, { children: [!fold && (jsxs("span", { onClick: () => setFold(true), className: 'jv-size-chevron', children: [ifDisplay(displaySize, depth, fold) && jsxs("span", { className: 'jv-size', children: [objectSize(node), " Items"] }), jsx(SvgAngleDown, { className: 'jv-chevron' })] })), !fold && enableClipboard && customCopy(customOptions) && (jsx(CopyButton, { node: node, nodeMeta: { depth, indexOrName: index, parent, parentPath, currentPath } })), typeof CustomOperation === 'function' ? jsx(CustomOperation, { node: node }) : null] }));
    return (jsxs("div", { children: [jsx("span", { children: '[' }), Icons, !fold ? (jsx("div", { className: 'jv-indent', children: node.map((n, i) => (jsx(NameValue, { indexOrName: i + startIndex, value: n, depth: depth, parent: node, deleteHandle: deleteHandle, editHandle: editHandle, parentPath: parentPath }, String(index) + String(i)))) })) : (jsxs("button", { onClick: () => setFold(false), className: 'jv-button', children: [startIndex, " ... ", startIndex + node.length - 1] })), jsx("span", { children: ']' })] }));
}

function LargeArray({ node, depth, deleteHandle: _deleteSelf, indexOrName, customOptions, parent, parentPath }) {
    const currentPath = typeof indexOrName !== 'undefined' ? [...parentPath, String(indexOrName)] : parentPath;
    const nestCollapsedArray = [];
    for (let i = 0; i < node.length; i += 100) {
        nestCollapsedArray.push(node.slice(i, i + 100));
    }
    const { collapsed, enableClipboard, collapseObjectsAfterLength, editable, onDelete, src, onAdd, CustomOperation, onChange, forceUpdate, displaySize } = useContext(JsonViewContext);
    const [fold, setFold] = useState(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions));
    useEffect(() => {
        setFold(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions));
    }, [collapsed, collapseObjectsAfterLength]);
    // Delete self
    const [deleting, setDeleting] = useState(false);
    const deleteSelf = () => {
        setDeleting(false);
        if (_deleteSelf)
            _deleteSelf(indexOrName, parentPath);
        if (onDelete)
            onDelete({ value: node, depth, src, indexOrName: indexOrName, parentType: 'array', parentPath });
        if (onChange)
            onChange({
                type: 'delete',
                depth,
                src,
                indexOrName: indexOrName,
                parentType: 'array',
                parentPath
            });
    };
    // Add
    const [adding, setAdding] = useState(false);
    const add = () => {
        const arr = node;
        arr.push(null);
        if (onAdd)
            onAdd({ indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath });
        if (onChange)
            onChange({ type: 'add', indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath });
        forceUpdate();
    };
    const isEditing = deleting || adding;
    const cancel = () => {
        setDeleting(false);
        setAdding(false);
    };
    const Icons = (jsxs(Fragment, { children: [!fold && !isEditing && (jsxs("span", { onClick: () => setFold(true), className: 'jv-size-chevron', children: [ifDisplay(displaySize, depth, fold) && jsxs("span", { className: 'jv-size', children: [node.length, " Items"] }), jsx(SvgAngleDown, { className: 'jv-chevron' })] })), isEditing && jsx(SvgDone, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: adding ? add : deleteSelf }), isEditing && jsx(SvgCancel, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: cancel }), !fold && !isEditing && enableClipboard && customCopy(customOptions) && (jsx(CopyButton, { node: node, nodeMeta: { depth, indexOrName, parent, parentPath, currentPath } })), !fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (jsx(SvgAddSquare, { className: 'json-view--edit', onClick: () => {
                    add();
                } })), !fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (jsx(SvgTrash, { className: 'json-view--edit', onClick: () => setDeleting(true) })), typeof CustomOperation === 'function' ? jsx(CustomOperation, { node: node }) : null] }));
    return (jsxs(Fragment, { children: [jsx("span", { children: '[' }), Icons, !fold ? (jsx("div", { className: 'jv-indent', children: nestCollapsedArray.map((item, index) => (jsx(LargeArrayNode, { originNode: node, node: item, depth: depth, index: index, startIndex: index * 100, deleteHandle: _deleteSelf, customOptions: customOptions, parentPath: parentPath }, String(indexOrName) + String(index)))) })) : (jsx("button", { onClick: () => setFold(false), className: 'jv-button', children: "..." })), jsx("span", { children: ']' }), fold && ifDisplay(displaySize, depth, fold) && (jsxs("span", { onClick: () => setFold(false), className: 'jv-size', children: [node.length, " Items"] }))] }));
}

function ObjectNode({ node, depth, indexOrName, deleteHandle: _deleteSelf, customOptions, parent, parentPath }) {
    const { collapsed, onCollapse, enableClipboard, ignoreLargeArray, collapseObjectsAfterLength, editable, onDelete, src, onAdd, onEdit, onChange, forceUpdate, displaySize, CustomOperation } = useContext(JsonViewContext);
    const currentPath = typeof indexOrName !== 'undefined' ? [...parentPath, String(indexOrName)] : parentPath;
    if (!ignoreLargeArray && Array.isArray(node) && node.length > 100) {
        return jsx(LargeArray, { node: node, depth: depth, indexOrName: indexOrName, deleteHandle: _deleteSelf, customOptions: customOptions, parentPath: currentPath });
    }
    const isPlainObject = isObject(node);
    const [fold, _setFold] = useState(isCollapsed(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions));
    const setFold = (value) => {
        onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse({ isCollapsing: !value, node, depth, indexOrName });
        _setFold(value);
    };
    useEffect(() => {
        setFold(isCollapsed(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions));
    }, [collapsed, collapseObjectsAfterLength]);
    // Edit property
    const editHandle = useCallback((indexOrName, newValue, oldValue) => {
        if (Array.isArray(node)) {
            node[+indexOrName] = newValue;
        }
        else if (node) {
            node[indexOrName] = newValue;
        }
        if (onEdit)
            onEdit({
                newValue,
                oldValue,
                depth,
                src,
                indexOrName: indexOrName,
                parentType: isPlainObject ? 'object' : 'array',
                parentPath: currentPath
            });
        if (onChange)
            onChange({ type: 'edit', depth, src, indexOrName: indexOrName, parentType: isPlainObject ? 'object' : 'array', parentPath: currentPath });
        forceUpdate();
    }, [node, onEdit, onChange, forceUpdate]);
    // Delete property
    const deleteHandle = (indexOrName) => {
        if (Array.isArray(node)) {
            node.splice(+indexOrName, 1);
        }
        else if (node) {
            delete node[indexOrName];
        }
        forceUpdate();
    };
    // Delete self
    const [deleting, setDeleting] = useState(false);
    const deleteSelf = () => {
        setDeleting(false);
        if (_deleteSelf)
            _deleteSelf(indexOrName, currentPath);
        if (onDelete)
            onDelete({ value: node, depth, src, indexOrName: indexOrName, parentType: isPlainObject ? 'object' : 'array', parentPath: currentPath });
        if (onChange)
            onChange({
                type: 'delete',
                depth,
                src,
                indexOrName: indexOrName,
                parentType: isPlainObject ? 'object' : 'array',
                parentPath: currentPath
            });
    };
    // Add
    const [adding, setAdding] = useState(false);
    const inputRef = useRef(null);
    const add = () => {
        var _a;
        if (isPlainObject) {
            const inputName = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value;
            if (inputName) {
                node[inputName] = null;
                if (inputRef.current)
                    inputRef.current.value = '';
                setAdding(false);
                if (onAdd)
                    onAdd({ indexOrName: inputName, depth, src, parentType: 'object', parentPath: currentPath });
                if (onChange)
                    onChange({ type: 'add', indexOrName: inputName, depth, src, parentType: 'object', parentPath: currentPath });
            }
        }
        else if (Array.isArray(node)) {
            const arr = node;
            arr.push(null);
            if (onAdd)
                onAdd({ indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath: currentPath });
            if (onChange)
                onChange({ type: 'add', indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath: currentPath });
        }
        forceUpdate();
    };
    const handleAddKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            add();
        }
        else if (event.key === 'Escape') {
            cancel();
        }
    };
    const isEditing = deleting || adding;
    const cancel = () => {
        setDeleting(false);
        setAdding(false);
    };
    const Icons = (jsxs(Fragment, { children: [!fold && !isEditing && (jsxs("span", { onClick: () => setFold(true), className: 'jv-size-chevron', children: [ifDisplay(displaySize, depth, fold) && jsxs("span", { className: 'jv-size', children: [objectSize(node), " Items"] }), jsx(SvgAngleDown, { className: 'jv-chevron' })] })), adding && isPlainObject && jsx("input", { className: 'json-view--input', placeholder: 'property', ref: inputRef, onKeyDown: handleAddKeyDown }), isEditing && jsx(SvgDone, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: adding ? add : deleteSelf }), isEditing && jsx(SvgCancel, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: cancel }), !fold && !isEditing && enableClipboard && customCopy(customOptions) && (jsx(CopyButton, { node: node, nodeMeta: { depth, indexOrName, parent, parentPath, currentPath } })), !fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (jsx(SvgAddSquare, { className: 'json-view--edit', onClick: () => {
                    if (isPlainObject) {
                        setAdding(true);
                        setTimeout(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
                    }
                    else {
                        add();
                    }
                } })), !fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (jsx(SvgTrash, { className: 'json-view--edit', onClick: () => setDeleting(true) })), typeof CustomOperation === 'function' ? jsx(CustomOperation, { node: node }) : null] }));
    if (Array.isArray(node)) {
        return (jsxs(Fragment, { children: [jsx("span", { children: '[' }), Icons, !fold ? (jsx("div", { className: 'jv-indent', children: node.map((n, i) => (jsx(NameValue, { indexOrName: i, value: n, depth: depth, parent: node, deleteHandle: deleteHandle, editHandle: editHandle, parentPath: currentPath }, String(indexOrName) + String(i)))) })) : (jsx("button", { onClick: () => setFold(false), className: 'jv-button', children: "..." })), jsx("span", { children: ']' }), fold && ifDisplay(displaySize, depth, fold) && (jsxs("span", { onClick: () => setFold(false), className: 'jv-size', children: [objectSize(node), " Items"] }))] }));
    }
    else if (isPlainObject) {
        return (jsxs(Fragment, { children: [jsx("span", { children: '{' }), Icons, !fold ? (jsx("div", { className: 'jv-indent', children: Object.entries(node).map(([name, value]) => (jsx(NameValue, { indexOrName: name, value: value, depth: depth, parent: node, deleteHandle: deleteHandle, editHandle: editHandle, parentPath: currentPath }, String(indexOrName) + String(name)))) })) : (jsx("button", { onClick: () => setFold(false), className: 'jv-button', children: "..." })), jsx("span", { children: '}' }), fold && ifDisplay(displaySize, depth, fold) && (jsxs("span", { onClick: () => setFold(false), className: 'jv-size', children: [objectSize(node), " Items"] }))] }));
    }
    else {
        return jsx("span", { children: String(node) });
    }
}

const LongString = React__default.forwardRef(({ str, className, ctrlClick }, ref) => {
    let { collapseStringMode, collapseStringsAfterLength, customizeCollapseStringUI } = useContext(JsonViewContext);
    const [truncated, setTruncated] = useState(true);
    const strRef = useRef(null);
    collapseStringsAfterLength = collapseStringsAfterLength > 0 ? collapseStringsAfterLength : 0;
    const str_show = str.replace(/\s+/g, ' ');
    const collapseStringUI = typeof customizeCollapseStringUI === 'function'
        ? customizeCollapseStringUI(str_show, truncated)
        : typeof customizeCollapseStringUI === 'string'
            ? customizeCollapseStringUI
            : '...';
    const clickToTruncateOrEdit = (event) => {
        var _a;
        if ((event.ctrlKey || event.metaKey) && ctrlClick) {
            ctrlClick(event);
        }
        else {
            const selection = window.getSelection();
            if (selection && selection.anchorOffset !== selection.focusOffset && ((_a = selection.anchorNode) === null || _a === void 0 ? void 0 : _a.parentElement) === strRef.current)
                return;
            setTruncated(!truncated);
        }
    };
    if (str.length <= collapseStringsAfterLength)
        return (jsxs("span", { ref: strRef, className: className, onClick: ctrlClick, children: ["\"", str, "\""] }));
    if (collapseStringMode === 'address')
        return str.length <= 10 ? (jsxs("span", { ref: strRef, className: className, onClick: ctrlClick, children: ["\"", str, "\""] })) : (jsxs("span", { ref: strRef, onClick: clickToTruncateOrEdit, className: className + ' cursor-pointer', children: ["\"", truncated ? [str_show.slice(0, 6), collapseStringUI, str_show.slice(-4)] : str, "\""] }));
    if (collapseStringMode === 'directly') {
        return (jsxs("span", { ref: strRef, onClick: clickToTruncateOrEdit, className: className + ' cursor-pointer', children: ["\"", truncated ? [str_show.slice(0, collapseStringsAfterLength), collapseStringUI] : str, "\""] }));
    }
    if (collapseStringMode === 'word') {
        let index_ahead = collapseStringsAfterLength;
        let index_behind = collapseStringsAfterLength + 1;
        let str_collapsed = str_show;
        let count = 1;
        while (true) {
            if (/\W/.test(str[index_ahead])) {
                str_collapsed = str.slice(0, index_ahead);
                break;
            }
            if (/\W/.test(str[index_behind])) {
                str_collapsed = str.slice(0, index_behind);
                break;
            }
            if (count === 6) {
                str_collapsed = str.slice(0, collapseStringsAfterLength);
                break;
            }
            count++;
            index_ahead--;
            index_behind++;
        }
        return (jsxs("span", { ref: strRef, onClick: clickToTruncateOrEdit, className: className + ' cursor-pointer', children: ["\"", truncated ? [str_collapsed, collapseStringUI] : str, "\""] }));
    }
    return (jsxs("span", { ref: strRef, className: className, children: ["\"", str, "\""] }));
});

var _path$1;
function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
var SvgEdit = function SvgEdit(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M17.25 3H6.75A3.754 3.754 0 0 0 3 6.75v10.5A3.754 3.754 0 0 0 6.75 21h10.5A3.754 3.754 0 0 0 21 17.25V6.75A3.754 3.754 0 0 0 17.25 3m2.25 14.25c0 1.24-1.01 2.25-2.25 2.25H6.75c-1.24 0-2.25-1.01-2.25-2.25V6.75c0-1.24 1.01-2.25 2.25-2.25h10.5c1.24 0 2.25 1.01 2.25 2.25zm-6.09-9.466-5.031 5.03a2.98 2.98 0 0 0-.879 2.121v1.19c0 .415.336.75.75.75h1.19c.8 0 1.554-.312 2.12-.879l5.03-5.03a2.25 2.25 0 0 0 0-3.182c-.85-.85-2.331-.85-3.18 0m-2.91 7.151c-.28.28-.666.44-1.06.44H9v-.44c0-.4.156-.777.44-1.06l3.187-3.187 1.06 1.06zm5.03-5.03-.782.783-1.06-1.061.782-.782a.766.766 0 0 1 1.06 0 .75.75 0 0 1 0 1.06"
  })));
};

var _path, _path2;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgLink = function SvgLink(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M6.75 3h5.5v1.5h-5.5C5.51 4.5 4.5 5.51 4.5 6.75v10.5c0 1.24 1.01 2.25 2.25 2.25h10.5c1.24 0 2.25-1.01 2.25-2.25v-5.5H21v5.5A3.754 3.754 0 0 1 17.25 21H6.75A3.754 3.754 0 0 1 3 17.25V6.75A3.754 3.754 0 0 1 6.75 3"
  })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M20.013 3h-3.946a.987.987 0 0 0 0 1.973h1.564l-6.342 6.342a1.004 1.004 0 0 0 0 1.396 1.004 1.004 0 0 0 1.396 0l6.342-6.342v1.564a.987.987 0 0 0 1.973 0V3.987A.987.987 0 0 0 20.013 3"
  })));
};

function JsonNode({ node, depth, deleteHandle: _deleteHandle, indexOrName, parent, editHandle, parentPath }) {
    // prettier-ignore
    const { collapseStringsAfterLength, enableClipboard, editable, src, onDelete, onChange, customizeNode, matchesURL, urlRegExp, EditComponent, DoneComponent, CancelComponent, CustomOperation } = useContext(JsonViewContext);
    let customReturn;
    if (typeof customizeNode === 'function')
        customReturn = safeCall(customizeNode, [{ node, depth, indexOrName }]);
    if (customReturn) {
        if (isValidElement(customReturn))
            return customReturn;
        else if (isReactComponent(customReturn)) {
            const CustomComponent = customReturn;
            return jsx(CustomComponent, { node: node, depth: depth, indexOrName: indexOrName });
        }
    }
    const editCustom = useCallback((newValue) => {
        try {
            const parsedValue = JSON.parse(newValue);
            if (editHandle)
                editHandle(indexOrName, parsedValue, node, parentPath);
        }
        catch (e) {
            const type = typeof node;
            const trimmedStringValue = resolveEvalFailedNewValue(type, newValue);
            if (editHandle)
                editHandle(indexOrName, trimmedStringValue, node, parentPath);
        }
    }, [editHandle, indexOrName, node]);
    if (Array.isArray(node) || isObject(node)) {
        return (jsx(ObjectNode, { parent: parent, node: node, depth: depth, indexOrName: indexOrName, deleteHandle: _deleteHandle, parentPath: parentPath, customOptions: typeof customReturn === 'object' ? customReturn : undefined }));
    }
    else {
        const type = typeof node;
        const currentPath = typeof indexOrName !== 'undefined' ? [...parentPath, String(indexOrName)] : parentPath;
        const [editing, setEditing] = useState(false);
        const [deleting, setDeleting] = useState(false);
        const valueRef = useRef(null);
        const edit = () => {
            setEditing(true);
            setTimeout(() => {
                var _a, _b;
                (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.selectAllChildren(valueRef.current);
                (_b = valueRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            });
        };
        const done = useCallback(() => {
            let newValue = valueRef.current.innerText;
            try {
                const parsedValue = JSON.parse(newValue);
                if (editHandle)
                    editHandle(indexOrName, parsedValue, node, parentPath);
            }
            catch (e) {
                const trimmedStringValue = resolveEvalFailedNewValue(type, newValue);
                if (editHandle)
                    editHandle(indexOrName, trimmedStringValue, node, parentPath);
            }
            setEditing(false);
        }, [editHandle, indexOrName, node, parentPath, type]);
        const cancel = () => {
            setEditing(false);
            setDeleting(false);
        };
        const deleteHandle = () => {
            setDeleting(false);
            if (_deleteHandle)
                _deleteHandle(indexOrName, parentPath);
            if (onDelete)
                onDelete({
                    value: node,
                    depth,
                    src,
                    indexOrName: indexOrName,
                    parentType: Array.isArray(parent) ? 'array' : 'object',
                    parentPath
                });
            if (onChange)
                onChange({
                    depth,
                    src,
                    indexOrName: indexOrName,
                    parentType: Array.isArray(parent) ? 'array' : 'object',
                    type: 'delete',
                    parentPath
                });
        };
        const handleKeyDown = useCallback((event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                done();
            }
            else if (event.key === 'Escape') {
                cancel();
            }
        }, [done]);
        const isEditing = editing || deleting;
        const ctrlClick = !isEditing && editableEdit(editable) && customEdit(customReturn) && editHandle
            ? (event) => {
                if (event.ctrlKey || event.metaKey)
                    edit();
            }
            : undefined;
        const Icons = (jsxs(Fragment, { children: [isEditing &&
                    (typeof DoneComponent === 'function' ? (jsx(DoneComponent, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: deleting ? deleteHandle : done })) : (jsx(SvgDone, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: deleting ? deleteHandle : done }))), isEditing &&
                    (typeof CancelComponent === 'function' ? (jsx(CancelComponent, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: cancel })) : (jsx(SvgCancel, { className: 'json-view--edit', style: { display: 'inline-block' }, onClick: cancel }))), !isEditing && enableClipboard && customCopy(customReturn) && (jsx(CopyButton, { node: node, nodeMeta: { depth, indexOrName, parent, parentPath, currentPath } })), !isEditing && matchesURL && type === 'string' && urlRegExp.test(node) && customMatchesURL(customReturn) && (jsx("a", { href: node, target: '_blank', className: 'json-view--link', children: jsx(SvgLink, {}) })), !isEditing &&
                    editableEdit(editable) &&
                    customEdit(customReturn) &&
                    editHandle &&
                    (typeof EditComponent === 'function' ? (jsx(EditComponent, { value: node, editCustom: editCustom, className: 'json-view--edit', onClick: edit })) : (jsx(SvgEdit, { className: 'json-view--edit', onClick: edit }))), !isEditing && editableDelete(editable) && customDelete(customReturn) && _deleteHandle && (jsx(SvgTrash, { className: 'json-view--edit', onClick: () => setDeleting(true) })), typeof CustomOperation === 'function' ? jsx(CustomOperation, { node: node }) : null] }));
        let className = 'json-view--string';
        switch (type) {
            case 'number':
            case 'bigint':
                className = 'json-view--number';
                break;
            case 'boolean':
                className = 'json-view--boolean';
                break;
            case 'object':
                className = 'json-view--null';
                break;
        }
        if (typeof (customReturn === null || customReturn === void 0 ? void 0 : customReturn.className) === 'string')
            className += ' ' + customReturn.className;
        if (deleting)
            className += ' json-view--deleting';
        let displayValue = String(node);
        if (type === 'bigint')
            displayValue += 'n';
        const EditingElement = useMemo(() => (jsx("span", { contentEditable: true, className: className, dangerouslySetInnerHTML: { __html: type === 'string' ? `"${displayValue}"` : displayValue }, ref: valueRef, onKeyDown: handleKeyDown })), [displayValue, type, handleKeyDown]);
        if (type === 'string')
            return (jsxs(Fragment, { children: [editing ? (EditingElement) : node.length > collapseStringsAfterLength ? (jsx(LongString, { str: node, ref: valueRef, className: className, ctrlClick: ctrlClick })) : (jsxs("span", { className: className, onClick: ctrlClick, children: ["\"", displayValue, "\""] })), Icons] }));
        else {
            return (jsxs(Fragment, { children: [editing ? (EditingElement) : (jsx("span", { className: className, onClick: ctrlClick, children: displayValue })), Icons] }));
        }
    }
}

const defaultURLRegExp = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
const JsonViewContext = createContext({
    src: undefined,
    collapseStringsAfterLength: 99,
    collapseStringMode: 'directly',
    customizeCollapseStringUI: undefined,
    collapseObjectsAfterLength: 20,
    collapsed: false,
    onCollapse: undefined,
    enableClipboard: true,
    editable: false,
    onEdit: undefined,
    onDelete: undefined,
    onAdd: undefined,
    onChange: undefined,
    forceUpdate: () => { },
    customizeNode: undefined,
    customizeCopy: (() => { }),
    displaySize: undefined,
    displayArrayIndex: true,
    matchesURL: false,
    urlRegExp: defaultURLRegExp,
    ignoreLargeArray: false,
    CopyComponent: undefined,
    CopiedComponent: undefined,
    EditComponent: undefined,
    CancelComponent: undefined,
    DoneComponent: undefined,
    CustomOperation: undefined
});
function JsonView({ src: _src, collapseStringsAfterLength = 99, collapseStringMode = 'directly', customizeCollapseStringUI, collapseObjectsAfterLength = 99, collapsed, onCollapse, enableClipboard = true, editable = false, onEdit, onDelete, onAdd, onChange, dark = false, theme = 'default', customizeNode, customizeCopy = node => stringifyForCopying(node), displaySize, displayArrayIndex = true, style, className, matchesURL = false, urlRegExp = defaultURLRegExp, ignoreLargeArray = false, CopyComponent, CopiedComponent, EditComponent, CancelComponent, DoneComponent, CustomOperation }) {
    const [_, update] = useState(0);
    const forceUpdate = useCallback(() => update(state => ++state), []);
    const [src, setSrc] = useState(_src);
    useEffect(() => setSrc(_src), [_src]);
    return (jsx(JsonViewContext.Provider, { value: {
            src,
            collapseStringsAfterLength,
            collapseStringMode,
            customizeCollapseStringUI,
            collapseObjectsAfterLength,
            collapsed,
            onCollapse,
            enableClipboard,
            editable,
            onEdit,
            onDelete,
            onAdd,
            onChange,
            forceUpdate,
            customizeNode,
            customizeCopy,
            displaySize,
            displayArrayIndex,
            matchesURL,
            urlRegExp,
            ignoreLargeArray,
            CopyComponent,
            CopiedComponent,
            EditComponent,
            CancelComponent,
            DoneComponent,
            CustomOperation
        }, children: jsx("code", { className: 'json-view' + (dark ? ' dark' : '') + (theme && theme !== 'default' ? ' json-view_' + theme : '') + (className ? ' ' + className : ''), style: style, children: jsx(JsonNode, { node: src, depth: 1, editHandle: (indexOrName, newValue, oldValue, parentPath) => {
                    setSrc(newValue);
                    if (onEdit)
                        onEdit({
                            newValue,
                            oldValue,
                            depth: 1,
                            src,
                            indexOrName: indexOrName,
                            parentType: null,
                            parentPath: parentPath
                        });
                    if (onChange)
                        onChange({ type: 'edit', depth: 1, src, indexOrName: indexOrName, parentType: null, parentPath: parentPath });
                }, deleteHandle: (indexOrName, parentPath) => {
                    setSrc(undefined);
                    if (onDelete)
                        onDelete({
                            value: src,
                            depth: 1,
                            src,
                            indexOrName: indexOrName,
                            parentType: null,
                            parentPath: parentPath
                        });
                    if (onChange)
                        onChange({
                            depth: 1,
                            src,
                            indexOrName: indexOrName,
                            parentType: null,
                            type: 'delete',
                            parentPath: parentPath
                        });
                }, parentPath: [] }) }) }));
}

export { SvgCancel as CancelSVG, SvgCopied as CopiedSVG, SvgCopy as CopySVG, SvgTrash as DeleteSVG, SvgDone as DoneSVG, SvgEdit as EditSVG, SvgLink as LinkSVG, JsonView as default, defaultURLRegExp, stringifyForCopying as stringify };
//# sourceMappingURL=index.mjs.map
