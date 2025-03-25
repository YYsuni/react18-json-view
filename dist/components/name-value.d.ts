interface Props {
    indexOrName: number | string;
    value: any;
    depth: number;
    parent?: Record<string, any> | Array<any>;
    parentPath: string[];
    deleteHandle: (indexOrName: string | number, parentPath: string[]) => void;
    editHandle: (indexOrName: string | number, newValue: any, oldValue: any, parentPath: string[]) => void;
}
export default function NameValue({ indexOrName, value, depth, deleteHandle, editHandle, parent, parentPath }: Props): import("react/jsx-runtime").JSX.Element;
export {};
