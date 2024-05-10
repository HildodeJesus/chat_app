import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sendValidationEmail')
export class SendValidationEmailProcessor {
  constructor(private mailerService: MailerService) {}
  @Process()
  async handleSendEmail(job: Job) {
    const { email, name, code } = job.data;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Código de validação',
      html: `<h1>Bem Vindo a nossa comunidade, ${name}</h1><br><p>Nossa comunidade preza pela sua liberdade e tranquilidade com seus dados, então não se preocupe e apenas se divirta conosco!!</p><br><h3>Seu Código de confirmação:</h3><p><strong>${code}</strong></p>`,
    });
  }
}
