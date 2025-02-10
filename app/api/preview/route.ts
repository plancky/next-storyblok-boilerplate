import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get('slug')
    const secret = req.nextUrl.searchParams.get('secret')

    const { origin } = req.nextUrl

    const params = req.url.split('?')

    if (secret !== 'Storyblok_preview_token_7242378') {
        return new Response('Invalid token', { status: 401 })
    }
    draftMode().enable()

    const res = NextResponse.redirect(
        new URL(`/${slug}?${params[1]}`, origin),
        302
    )

    return res
}
