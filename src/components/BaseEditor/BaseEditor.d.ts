import { ReactElement } from "react";

export interface BaseEditorProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  disable?: boolean;
}
