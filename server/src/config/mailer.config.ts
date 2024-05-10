import { MailerModule } from '@nestjs-modules/mailer';

export default MailerModule.forRoot({
  transport: {
    host: process.env.MAILER_HOST,
    secure: false,
    port: Number(process.env.MAILER_PORT),
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },

  defaults: {
    from: `${process.env.MAILER_USER}`,
  },
});
