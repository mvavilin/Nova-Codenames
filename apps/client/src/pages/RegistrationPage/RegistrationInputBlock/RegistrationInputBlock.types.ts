export type inputBlockProps = {
  id: string;
  type: string;
  name: string;
  autocomplete: 'on' | 'off';
  minLength?: string;
  maxLength?: string;
  pattern: RegExp;
};
