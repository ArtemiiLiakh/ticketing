export interface Handler<T, R> {
  handle (value: T): R;
}

export interface AsyncHandler<T, R> {
  handle (value: T): Promise<R>;
}