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
  id?: string,
  path?: string,
}
