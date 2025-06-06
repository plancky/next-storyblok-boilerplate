import { fetchContent } from '@/utils/fetchContent'
import { StoryblokStoryElement } from '@/utils/helpers/production'
import { Metadata } from 'next'
import React from 'react'

export { dynamic } from '@/utils/helpers/production'

export const metadata: Metadata = {
    title: 'Next Storyblok Boilerplate',
    description: 'Next Storyblok Boilerplate',
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
