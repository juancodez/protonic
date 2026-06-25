import type { TextAreaProps, TextFieldProps } from 'react-aria-components';

export interface ProtonicTextareaProps extends TextFieldProps {
  label?:         string;
  description?:   string;
  errorMessage?:  string;
  placeholder?:   string;
  rows?:          number;
  textAreaProps?: TextAreaProps;
}
