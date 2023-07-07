type FormFields = {
  name: string;
  id: number;
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
};
