import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-validation-email')
export class SendValidationEmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async handleSendEmail(job: Job) {
    const { email, name, code } = job.data;

    await this.mailerService.sendMail({
      from: `"Hildo Neto" <${process.env.MAILER_USER}>`,
      to: email,
      subject: 'Código de validação',
      html: `<h1>Hey, ${name}!! Foi aqui que solicitaram um 'codigozinnn'?</h1><p>Nossa comunidade preza pela sua liberdade e tranquilidade com seus dados, então não se preocupe e apenas se divirta conosco!!</p><br><h3>Seu Código de confirmação:</h3><p><strong>${code}</strong></p><br><br><p>Se não solicitou nada em nosso site recentemente, apenas ignore esse email e não forneça nada a terceiros.</p>`,
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.data.id} of type ${job.data.name} with data ${job.data.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Email enviado para ${job.data.email}`);
  }
}
