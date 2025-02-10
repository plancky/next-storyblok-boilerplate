import { fetchContent } from '@/utils/fetchContent'
import { StoryblokStoryElement } from '@/utils/helpers/production'
import { Metadata } from 'next'
import React from 'react'

export { dynamic } from '@/utils/helpers/production'

export const metadata: Metadata = {
    title: "Blueprint Ventures | A Venture Capital firm for Southeast Asia's new economies & consumers.",
    description:
        'Blueprint Ventures is a regional early-stage venture capital firm. We back dynamic founders building generation-defining businesses for the Female & Youth economies of Southeast Asia.',
}
export default async function Home() {
    const { data, error } = await fetchContent('main')
    if (error) return <div>Failed to load content</div>
    return (
        <>
            <StoryblokStoryElement story={data.story} />
        </>
    )
}
