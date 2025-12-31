export interface Teacher {
  id?: string;
  name: string;
  periodLimit: number;
}

export interface PredefinedSubject {
  id?: string;
  name: string;
  type?: string;
}

export interface TimetableConfig {
  numPeriods: number;
  selectedDays: string[];
}

export interface Subject {
  name: string;
  teacher: string;
  repeat: number;
  isLab?: boolean;
  isEtc?: boolean;
  isLang?: boolean;
  period?: number;  // For fixed scheduling (1-indexed)
  day?: number;     // For fixed scheduling (1-indexed)
}

export type TimetableData = Subject[][];
