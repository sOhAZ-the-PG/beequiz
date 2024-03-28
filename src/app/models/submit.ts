export class Submit {
  questionCategoryId: string = '';
  questions: SubmitQuestion[] = [];
}

export class SubmitQuestion {
  questionId: string = '';
  answers: SubmitAnswer[] = [];

  constructor(questionId: string, answers: SubmitAnswer[]) {
    this.questionId = questionId;
    this.answers = answers;
  }
}

export class SubmitAnswer {
  questionAnswerId: string = '';

  constructor(questionAnswerId: string) {
    this.questionAnswerId = questionAnswerId;
  }
}
