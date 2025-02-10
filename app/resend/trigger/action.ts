'use server'
import { EmailTemplate } from '@/components/Email-template'
import { Resend } from 'resend'
import { ModContactFormType } from '@/components/Email-template'

const resend = new Resend(process.env.NEXT_RESEND_API_KEY)
export async function sendMail(values: ModContactFormType) {
    const attachments = {
        content: values.pitchdeck,
        filename: `${values.firstname}-${values.lastname} pitchdeck.${values.fileType}`,
    }
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blueprint Application<blueprint@clients.foureightseven.studio>',
            to: ['investments@blueprint.vc'],
            subject: `New Pitch`,
            react: EmailTemplate(values),
            attachments:
                values.pitchdeck && values.pitchdeck !== ''
                    ? [attachments]
                    : undefined,
        })

        if (error) {
            return { error }
        }

        return { data }
    } catch (error) {
        return { error }
    }
}
