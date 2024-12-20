export interface SurveyContextType {
  handleSubmit: (e: React.FormEvent) => void;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface SurveyProps {
  onSubmit?: (values: Record<string, any>) => void;
  children: React.ReactNode;
}
