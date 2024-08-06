type State = 'ACTIVE' | 'RECEIVED' | 'ANSWERED' | 'CLOSED';

export interface StateTagProps {
  current: State;
}

export interface StateTagType {
  [props: string]: boolean;
}

export interface ActiveTagProps {
  isActive: boolean;
}
