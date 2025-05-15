export interface Question {
  id: string; 
  category: string;
  question_en: string;
  question_uk: string;
  answer_en?: string;
  answer_uk?: string;
  showAnswer?: boolean;
  question?: string;
  answer?: string;
}