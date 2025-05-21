export interface QueueOptions {
  jobId: string
  delay?: number
}

export interface JobData<TData> {
  data: TData,
}

export interface MessageQueue<TPayload=unknown> {
  add(payload: TPayload, options: QueueOptions): Promise<void>;
  removeJob(jobId: string): Promise<void>;
  process(callback: (data: JobData<TPayload>) => Promise<void> | void): void;
}