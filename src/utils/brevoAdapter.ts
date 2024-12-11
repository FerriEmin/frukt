import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

const brevoAdapter = (): EmailAdapter => {
  const adapter = () => ({
    name: 'brevo',
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      if (!process.env.BREVO_EMAIL_ACTIVE) {
        console.log('Emails disabled, logging to console instead')
        console.log(message)
        return
      }
      try {
        const res = await axios({
          method: 'post',
          url: 'https://api.brevo.com/v3/smtp/email',
          headers: {
            'api-key': process.env.BREVO_API_KEY as string,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            sender: {
              email: process.env.BREVO_SENDER_EMAIL as string,
              name: process.env.BREVO_SENDER_NAME as string,
            },
            to: [
              {
                email: message.to,
              },
            ],
            subject: message.subject,
            htmlContent: message.html,
          },
        })

        return res.data
      } catch (error) {
        console.error('Error sending email via Brevo', error)
      }
    },
  })

  return adapter
}

export default brevoAdapter
