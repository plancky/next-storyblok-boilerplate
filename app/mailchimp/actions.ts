'use server'
import { mailchimpInit } from '@/utils/mailchimp/client'
const API_KEY = process.env.NEXT_MAILCHIMP_API_KEY
const SERVER_PREFIX = process.env.NEXT_MAILCHIMP_SERVER_PREFIX

const mailchimp = new mailchimpInit({
    apiKey: API_KEY!,
    server_prefix: SERVER_PREFIX!,
})

export async function subscribeToNewsletter({ email }: { email: string }) {
    // target an endpoint
    mailchimp.endpoint = 'lists'

    const { data, error } = await mailchimp.subscribe(email)
    //const response = await mailchimp.automations().get()
    return { data, error }
}
