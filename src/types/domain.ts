export interface SportScores {
  yuzme: number;
  kosu: number;
  bisiklet: number;
  vucutGelistirme: number;
  pilatesYoga: number;
  basketbolVoleybol: number;
  tenis: number;
  calisthenics: number;
  boksUzakDogu: number;
}

export type SportKey = keyof SportScores;

export type QuestionCategory = "health" | "anthropometric" | "motoric";

export interface QuestionOption {
  label: string;
  weights: Partial<SportScores>;
  explanation: string;
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  options: QuestionOption[];
}

export const SPORT_KEYS: SportKey[] = [
  "yuzme",
  "kosu",
  "bisiklet",
  "vucutGelistirme",
  "pilatesYoga",
  "basketbolVoleybol",
  "tenis",
  "calisthenics",
  "boksUzakDogu",
];