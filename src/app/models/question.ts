export interface QuestionCategory {
  questionCategoryId: string;
  title: string;
  totalQuestion: number;
  level: string;
  timeLimitOfMinuteUnit: number;
  questionInfo: QuestionInfo[];
}

export interface QuestionInfo {
  questionId: string;
  sequence: number;
  title: string;
  questionAnswerInfo: QuestionAnswerInfo[];
}

export interface QuestionAnswerInfo {
  questionAnswerId: string;
  sequence: number;
  answer: string;
}
