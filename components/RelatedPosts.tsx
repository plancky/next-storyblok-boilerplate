import { fetchPosts } from '@/utils/fetchContent'
import { RelatedPostsInner } from './RelatedPostsInner'

export type Slide = {
    _uid: string
    media: {
        filename: string
        alt: string
    }
    heading: string
    description?: string
    date: string
    tags: string[]
    url: string
    component: string
    slug: string
    _editable: string
}

function getSlideFromPost(post: any): Slide {
    const content = post?.content
    return {
        _uid: post?._uid,
        media: content?.featured_image,
        heading: content?.title,
        tags: post?.tag_list,
        url: `/blog/${post?.slug}`,
        slug: post?.slug,
        component: '',
        date: content?.published_at,
        _editable: content?._editable,
    }
}

async function getCarouselSlides(blok: any) {
    let slides: Slide[] = []

    const { data, error } = await fetchPosts()
    slides = data.stories
        ?.map((post: any) => {
            return getSlideFromPost(post)
        })
        .filter((slide: any) => slide.slug !== blok.post_slug)
    slides = slides
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reverse()
    return slides.slice(0, 6)
}

const RelatedPostsCarousel = async ({ blok }: { blok: any }) => {
    const carouselSlides = await getCarouselSlides(blok)
    return (
        <>
            <RelatedPostsInner blok={blok} slides={carouselSlides} />
        </>
    )
}

export { RelatedPostsCarousel }
