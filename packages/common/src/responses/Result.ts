import { Exception } from '../exceptions';

export class Result<T=unknown> {
  private constructor (
    private readonly _value: T,
  ) {}

  static create<I=unknown>(value: I): Result<I> {
    return new Result<I>(value);
  }

  static empty(): Result<undefined> {
    return new Result(undefined);
  }

  isFailure (): boolean {
    return this._value instanceof Exception || this._value instanceof Error;
  }

  isSuccess (): boolean {
    return !this.isFailure();
  }

  get value (): T {
    return this._value;
  }
}