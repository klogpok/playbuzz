export interface IQuestion {
  id: number;
  question: string;
  rightAnswerId: number | never;
  answers: { id: number; text: string }[];
  imageSrc: string;
}
