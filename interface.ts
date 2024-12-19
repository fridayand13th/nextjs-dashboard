export enum EStatus {
  DONE = "done",
  ON_GOING = "on going",
  CANCEL = "cancel",
  NOT_START = "not start",
}

export enum EType {
  PLAY = "play",
  WORK = "work",
  STUDY = "study",
}

export interface ITodo {
  id: number;
  title: string;
  status: EStatus ;
  date: string;
  from: number;
  to: number;
  type: EType ;
}

export interface IModalProps {
  item: ITodo | null;
  onClose: () => void;
  onUpdate: (updatedItem: ITodo | null) => void;
}

export interface IAddModalProps {
  id: number | 0;
  onClose: () => void;
  onUpdate: (updatedItem: ITodo) => void;
}

export interface StatisticStatusProps {
  todoCountsByStatus: Record<EStatus, number>;
}

export interface StatisticTypeProps {
  todoCountsByType: Record<EType, number>;
}
