
export interface Block {
  id: string;
  type: string;
  content: any;
  styles: BlockStyles;
  position: number;
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export interface BlockStyles {
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  minHeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  display?: string;
  alignItems?: string;
  justifyContent?: string;
}

export interface BlockTemplate {
  id: string;
  name: string;
  icon: string;
  category: string;
  content: any;
  styles: BlockStyles;
  preview: string;
}
