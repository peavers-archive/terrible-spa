export interface DialogData {
  title?: string;
  confirmText?: string | null;
  cancelText?: string;
}

export interface EditDialogData extends DialogData {
  formFields: FormField[];
}

export interface FormField {
  label?: string;
  ngModel?: string;
  value?: any;
  placeholder?: string;
  isReadOnly: boolean;
}

export interface Directory {
  id?: string | null;
  path?: string;
}

export interface MediaFile {
  isSelected: boolean;
  id: string;
  name: string;
  path: string;
  extension: string;
  size: number;
  thumbnails: string[12];
  createdTime: number;
  lastAccessTime: number;
  lastModifiedTime: number;
  lastWatched: number;
}

export class MediaList {
  id?: string;
  name: string;
  mediaFiles?: MediaFile[];
}

export class GroupedMediaFile {
  year: number;
  month: number;
  day: number;
  results: MediaFile[];
}

export class History {
  id: string;
  results: MediaFile[];
}
