import { ReactNode } from 'react';

export interface TextProps {
  text: string | ReactNode;
}

export function BaseText({ text }: TextProps) {
  return <span>{text}</span>;
}
