import { createHmac } from 'crypto'
import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'
import { NextRequest, NextResponse } from 'next/server'

async function validatePayloadSignature(req: NextRequest) {
    const webhookSecret = process?.env?.NEXT_STORYBLOK_WEBHOOK_SECRET!
    const getSignature = (body: string) =>
        createHmac('sha1', webhookSecret).update(body).digest('hex')
    const payload = await req.text()

    const signature = req.headers.get('webhook-signature')
    const generateSignature = getSignature(payload)
    return generateSignature === signature
}

export async function POST(req: NextRequest) {
    const res = NextResponse
    /* verify request */
    const isValid = await validatePayloadSignature(req)
    if (!isValid) {
        return new Response('Invalid signature', { status: 401 })
    }
    const ratelimit = new Ratelimit({
        redis: kv,
        // rate limit to 1 requests per 10 minutes
        limiter: Ratelimit.fixedWindow(1, '10 m'),
    })

    const { success, reset } = await ratelimit.limit('ratelimit')

    if (!success || reset === 0) {
        const res = NextResponse.json(
            {
                message: 'Rate Limited',
            },
            {
                status: 429,
            }
        )
        return res
    }

    const deploy_res = await fetch(
        process.env.NEXT_REDEPLOY_TRIGGER_ENDPOINT!,
        {
            method: 'POST',
        }
    )

    return res.json({
        status: 200,
    })
}
