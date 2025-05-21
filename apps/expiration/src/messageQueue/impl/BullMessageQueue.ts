import { Queue } from 'bull';
import { JobData, MessageQueue, QueueOptions } from '../MessageQueue';

export class BullMessageQueue<TPayload> implements MessageQueue<TPayload> {
  constructor (
    private readonly queue: Queue,
  ) {}

  async add(payload: TPayload, options: QueueOptions): Promise<void> {
    await this.queue.add(payload, {
      jobId: options.jobId,
      delay: options.delay,
    });
  }

  process(callback: (job: JobData<TPayload>) => Promise<void> | void): void {
    this.queue.process((job) => {
      callback({
        data: job.data,
      });
    });
  }

  async removeJob(jobId: string): Promise<void> {
    await this.queue.removeJobs(jobId);
  }
}
