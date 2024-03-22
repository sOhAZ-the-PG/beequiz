export class QuestionCategory {
  questionCategoryId: string = '';
  title: string = '';
  totalQuestion: number = 0;
  level: string = '';
  timeLimitOfMinuteUnit: number = 0;
  questionInfo: QuestionInfo[] = [];
}

export class QuestionInfo {
  questionId: string = '';
  sequence: number = 0;
  title: string = '';
  questionAnswerInfo: QuestionAnswerInfo[] = [];
}

export class QuestionAnswerInfo {
  questionAnswerId: string = '';
  sequence: number = 0;
  answer: string = '';
}
