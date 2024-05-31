export type Providers = {
  categories: ICategory[];
};

export type ICategory = {
  id: number;
  categoryName: string;
  questions: Question[];
};

export type Question = {
  questionName: string;
  options: string[];
  answer: string;
};
