export class ApiError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends Error {
  status: number;

  constructor(message?: string) {
    super(message);
    this.status = 401;
  }
}
