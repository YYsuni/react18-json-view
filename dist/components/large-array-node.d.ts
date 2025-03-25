import type { CustomizeOptions } from '../types';
interface Props {
    originNode: Array<any>;
    node: Array<any>;
    depth: number;
    index: number;
    deleteHandle?: (_: string | number, currentPath: string[]) => void;
    customOptions?: CustomizeOptions;
    startIndex: number;
    parent?: Record<string, any> | Array<any>;
    parentPath: string[];
}
export default function LargeArrayNode({ originNode, node, depth, index, deleteHandle: _deleteSelf, customOptions, startIndex, parent, parentPath }: Props): import("react/jsx-runtime").JSX.Element;
export {};
