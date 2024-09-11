export interface StateTagProps {
  current: string | null;
}

export interface StateTagType {
  [props: string]: boolean;
}

export interface ActiveTagProps {
  isActive: boolean;
}
