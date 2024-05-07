import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sendValidationEmail')
export class SendValidationEmailProcessor {
  @Process()
  handleSendEmail(job: Job) {}
}
