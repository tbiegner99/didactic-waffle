import { HTTPStatus } from "../utils/constants";
export class CodedError {
  constructor(public status: number, public message: string) {}
}

export class ScheduleConflictError extends CodedError {
  constructor(message: string) {
    super(HTTPStatus.CONFLICT, message);
  }
}
