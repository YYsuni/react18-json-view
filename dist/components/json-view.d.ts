import type { Collapsed, CustomizeCollapseStringUI, CustomizeNode, DisplaySize, Editable, NodeMeta } from '../types';
type OnEdit = (params: {
    newValue: any;
    oldValue: any;
    depth: number;
    src: any;
    indexOrName: string | number;
    parentType: 'object' | 'array' | null;
    parentPath: string[];
}) => void;
type OnDelete = (params: {
    value: any;
    indexOrName: string | number;
    depth: number;
    src: any;
    parentType: 'object' | 'array' | null;
    parentPath: string[];
}) => void;
type OnAdd = (params: {
    indexOrName: string | number;
    depth: number;
    src: any;
    parentType: 'object' | 'array';
    parentPath: string[];
}) => void;
type OnChange = (params: {
    indexOrName: string | number;
    depth: number;
    src: any;
    parentType: 'object' | 'array' | null;
    type: 'add' | 'edit' | 'delete';
    parentPath: string[];
}) => void;
type OnCollapse = (params: {
    isCollapsing: boolean;
    node: Record<string, any> | Array<any>;
    indexOrName: string | number | undefined;
    depth: number;
}) => void;
export declare const defaultURLRegExp: RegExp;
export declare const JsonViewContext: import("react").Context<{
    src: any;
    collapseStringsAfterLength: number;
    collapseStringMode: "directly" | "word" | "address";
    customizeCollapseStringUI: CustomizeCollapseStringUI | undefined;
    collapseObjectsAfterLength: number;
    collapsed: Collapsed;
    onCollapse: OnCollapse | undefined;
    enableClipboard: boolean;
    editable: Editable;
    onEdit: OnEdit | undefined;
    onDelete: OnDelete | undefined;
    onAdd: OnAdd | undefined;
    onChange: OnChange | undefined;
    forceUpdate: () => void;
    customizeNode: CustomizeNode | undefined;
    customizeCopy: (node: any, nodeMeta?: NodeMeta) => any;
    displaySize: DisplaySize;
    displayArrayIndex: boolean;
    matchesURL: boolean;
    urlRegExp: RegExp;
    ignoreLargeArray: boolean;
    CopyComponent: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
    }> | undefined;
    CopiedComponent: React.FC<{
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        className: string;
        style: React.CSSProperties;
    }> | undefined;
    EditComponent: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        editCustom: (newValue: string) => void;
        value: string | null;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        editCustom: (newValue: string) => void;
        value: string | null;
    }> | undefined;
    CancelComponent: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | undefined;
    DoneComponent: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | undefined;
    CustomOperation: React.FC<{
        node: any;
    }> | React.Component<{
        node: any;
    }> | undefined;
}>;
export interface JsonViewProps {
    src: any;
    collapseStringsAfterLength?: number;
    collapseStringMode?: 'directly' | 'word' | 'address';
    customizeCollapseStringUI?: CustomizeCollapseStringUI;
    collapseObjectsAfterLength?: number;
    collapsed?: Collapsed;
    onCollapse?: OnCollapse;
    enableClipboard?: boolean;
    editable?: Editable;
    onEdit?: OnEdit;
    onDelete?: OnDelete;
    onAdd?: OnAdd;
    onChange?: OnChange;
    customizeNode?: CustomizeNode;
    customizeCopy?: (node: any, nodeMeta?: NodeMeta) => any;
    dark?: boolean;
    theme?: 'default' | 'a11y' | 'github' | 'vscode' | 'atom' | 'winter-is-coming';
    displaySize?: DisplaySize;
    displayArrayIndex?: boolean;
    style?: React.CSSProperties;
    className?: string;
    matchesURL?: boolean;
    urlRegExp?: RegExp;
    ignoreLargeArray?: boolean;
    CopyComponent?: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
    }>;
    CopiedComponent?: React.FC<{
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        className: string;
        style: React.CSSProperties;
    }>;
    EditComponent?: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        editCustom: (newValue: string) => void;
        value: string | null;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        editCustom: (newValue: string) => void;
        value: string | null;
    }>;
    CancelComponent?: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }>;
    DoneComponent?: React.FC<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }> | React.Component<{
        onClick: (event: React.MouseEvent) => void;
        className: string;
        style: React.CSSProperties;
    }>;
    CustomOperation?: React.FC<{
        node: any;
    }> | React.Component<{
        node: any;
    }>;
}
export default function JsonView({ src: _src, collapseStringsAfterLength, collapseStringMode, customizeCollapseStringUI, collapseObjectsAfterLength, collapsed, onCollapse, enableClipboard, editable, onEdit, onDelete, onAdd, onChange, dark, theme, customizeNode, customizeCopy, displaySize, displayArrayIndex, style, className, matchesURL, urlRegExp, ignoreLargeArray, CopyComponent, CopiedComponent, EditComponent, CancelComponent, DoneComponent, CustomOperation }: JsonViewProps): import("react/jsx-runtime").JSX.Element;
export {};
