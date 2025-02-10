import { fetchPost, fetchPosts } from '@/utils/fetchContent'
import { StoryblokStoryElement, isProduction } from '@/utils/helpers/production'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export { dynamic } from '@/utils/helpers/production'
async function productionStaticParams() {
    const { data, error } = await fetchPosts()
    if (error) return []
    return data.stories?.map((story: any) => ({ post: story.slug }))
}

type Props = {
    params: { post: string }
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const post = params.post
    const { data, error } = await fetchPost(post)

    return {
        title: data.story.name ?? '',
        description:
            data.story.content.description ?? data.story.content.synopsis,
    }
}

export const generateStaticParams = isProduction
    ? productionStaticParams
    : undefined

export default async function Page({ params }: { params: { post: string } }) {
    const { data, error } = await fetchPost(params.post)
    if (error) redirect('/404')

    return (
        <>
            <StoryblokStoryElement
                story={data.story}
                slug={data.story.slug}
                tags={data.story.tag_list}
            />
        </>
    )
}
