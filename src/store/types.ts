type FormFields = {
  id: string;
  label: string;
  name: {
    name: string;
    id: number;
  };
};

export type FormItem = {
  id: number;
  formTitle: string;
  formDescription: string;
  addedFields: FormFields[];
};

export type FormState = {
  registeredForms: FormItem[];
  filteredForms: FormItem[];
  query: string;
  hasUnsavedChanges: boolean;
  dialogConfirmChanges: boolean;
};
