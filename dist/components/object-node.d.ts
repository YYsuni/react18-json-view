import type { CustomizeOptions } from '../types';
interface Props {
    node: Record<string, any> | Array<any>;
    depth: number;
    indexOrName?: number | string;
    deleteHandle?: (_: string | number, currentPath: string[]) => void;
    customOptions?: CustomizeOptions;
    parent?: Record<string, any> | Array<any>;
    parentPath: string[];
}
export default function ObjectNode({ node, depth, indexOrName, deleteHandle: _deleteSelf, customOptions, parent, parentPath }: Props): import("react/jsx-runtime").JSX.Element;
export {};
