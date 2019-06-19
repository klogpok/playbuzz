export interface IQuestion {
  id: number;
  question: string;
  rightAnswerId: number;
  answers: { id: number; text: string }[];
}
