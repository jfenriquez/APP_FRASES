export interface InterfacePhrases {
  data: InterfacePhraseData[];
  nextPage: string;
}

export interface InterfacePhraseData {
  ID: number;
  CATEGORIAID: number;
  FRASE: string;
  AUTOR: string;
  DISLIKE: null;
  create_at: Date;
}
