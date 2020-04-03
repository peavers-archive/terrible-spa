export interface DialogData {
  title?: string,
  confirmText?: string | null,
  cancelText?: string
}

export interface EditDialogData extends DialogData {
  formFields: FormField[]
}

export interface FormField {
  label?: string,
  ngModel?: string,
  value?: any,
  placeholder?: string,
  isReadOnly: boolean
}

export interface Directory {
  id?: string | null,
  path?: string,
}

export interface MediaFile {
  id: string,

  name: string,

  absolutePath: string,

  mimeType: string,

  size: number,

  lastAccessTime: number,

  lastModifiedTime: number,

  importedTime: number,

  thumbnails: string[]
}

export interface MediaSearchHit {
  id: string,

  sourceAsMap: SourceAsMap
}

export interface SourceAsMap {
  path: string,
  name: string
}
