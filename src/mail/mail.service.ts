import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IPostResponse } from 'src/shared/common.class';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService
) {}

  async sendUserConfirmation(email: string, token: string): Promise<IPostResponse> {
    const url = `${this.config.get("FRONTEND_BASE_URL")}/auth/confirm?token=${token}`;

    const sendMail = await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Shipments | Password Recovery',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // filling curly brackets with content
        name: email.split("@")[0],
        url,
      },
    });

    if(sendMail) {
        return {
            status: true,
            message: "request sent to user email successfully",
            data: sendMail
        }
    }
    
    return {
        status: false,
        message: "unable to process request due to unknown issue",
    }
  }
}
