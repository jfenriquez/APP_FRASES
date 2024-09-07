export interface InterfaceCategory {
  id?: number;
  nombre: string;
  create_at?: Date;
}

export interface InterfacePhrasesXcategory {
  ID?: number;
  CATEGORIAID: number;
  FRASE: string;
  AUTOR: string;
  DISLIKE?: number | null;
  create_at?: Date;
}
