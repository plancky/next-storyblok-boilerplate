import {
    storyblokEditable,
    StoryblokComponent,
    SbBlokData,
} from '@storyblok/react/rsc'
import { PostTag } from './PostTag'
import Image from 'next/image'
import { fetchPosts, fetchPostsTags } from '@/utils/fetchContent'
import { PostsFilter } from './PostsFilter'

type State = {
    tags: any[]
    stories: any[]
}

export async function PostsList({ blok }: { blok: any }) {
    const {
        data: { stories },
    } = await fetchPosts()
    const {
        data: { tags },
    } = await fetchPostsTags()

    return (
        <>
            <section
                {...storyblokEditable(blok)}
                className="content-grid"
            >
                <PostsFilter value={{ tags, stories }} />
            </section>
        </>
    )
}
