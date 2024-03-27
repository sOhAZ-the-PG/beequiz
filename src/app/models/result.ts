export class Result<T> {
  statusCode: number = 200;
  statusMessage: string = '';
  isSuccess: boolean = true;
  data: T | null = null;
  errors: any;
}
