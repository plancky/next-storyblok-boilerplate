import { storyblokEditable } from '@storyblok/react/rsc'

import { richTextResolver } from '@storyblok/richtext'
import { SecondaryHeroSection } from './SecondaryHero'
import { PostTag } from './PostTag'
import { RelatedPostsCarousel } from './RelatedPosts'
import { formatDateInDigits, formatDateInShortForm } from '@/utils/reformatDate'
import Image from 'next/image'

const { render: renderHtmlString } = richTextResolver()

function readingTime(_html: string) {
    const text = _html
    const wpm = 265
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)
    return time
}

const Post = ({
    blok,
    tags,
    slug,
}: {
    blok: any
    tags: string[]
    slug: string
}) => {
    const rendered = renderHtmlString(blok.content) as string
    const author = blok.author ? blok.author[0]?.content : null
    return (
        <main
            {...storyblokEditable(blok)}
            className="content-grid grid-rows-[auto_1fr]"
        >
            <section className="full-width-gridless bg-primary text-cover">
                <SecondaryHeroSection
                    heading={blok?.title}
                    heading_alignment="left"
                    subheading={blok?.synopsis}
                    subheading_alignment="end"
                    uid={blok._uid}
                    margins={{
                        top_spacing: 160,
                        bottom_spacing: 169,
                        mobile_top_spacing: 80,
                        mobile_bottom_spacing: 40,
                    }}
                />
            </section>
            <div className="content border-primary border-b h-fit">
                <div className="py-5 flex justify-between flex-wrap gap-4 items-center max-h-fit h-fit">
                    <div className="flex gap-4 items-center">
                        <div className="h-14 rounded-full aspect-square overflow-hidden bg-primary">
                            <Image
                                src={author?.image?.filename}
                                alt={author?.image?.alt}
                                fill
                                className="!relative object-cover"
                                quality={100}
                            />
                        </div>
                        <div className="flex flex-col font-secondary">
                            <span className=" text-pepper uppercase text-subheading4 lg:text-subheading3 font-bold ">
                                {author?.name}
                            </span>
                            <div className="text-lg uppercase flex gap-1 flex-wrap text-subheading4">
                                <span>
                                    {formatDateInShortForm(blok?.published_at)}
                                </span>
                                {'•'}
                                <span>{readingTime(rendered)} min read</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => PostTag({ tag, key: tag }))}
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col max-w-5xl mx-auto lg:pt-20 lg:pb-[60px] pt-[60px] pb-[30px]">
                    <span className="uppercase font-secondary font-semibold text-copy6 lg:text-longform2">
                        {formatDateInShortForm(blok?.published_at)}
                    </span>
                </div>
                <div
                    id="blog-post"
                    className="
                        h-full
                        self-start
                        [&_h2]:font-primary [&_h2]:text-h5 [&_h2]:mb-8 [&_h2]:mt-14 [&_h2]:text-primary
                        [&_h3]:font-primary [&_h3]:text-h5 [&_h3]:mb-8 [&_h3]:mt-14 [&_h3]:text-primary
                        [&_h4]:font-primary [&_h4]:text-h5 [&_h4]:mb-8 [&_h4]:mt-14 [&_h4]:text-primary
                        [&_h5]:font-primary [&_h5]:text-h5 [&_h5]:mb-8 [&_h5]:mt-14 [&_h5]:!text-primary
                        [&_ul]:list-disc [&_ul]:ml-4
                        [&_p]:mb-8
                        max-w-5xl mx-auto
                        flex flex-col gap-7 lg:pb-20 pb-7
                        text-longform2 font-secondary text-fig
                    "
                    dangerouslySetInnerHTML={{
                        __html: rendered,
                    }}
                ></div>
            </div>
            <RelatedPostsCarousel
                blok={{
                    _uid: blok._uid,
                    post_slug: slug,
                    heading: 'Related Posts',
                    nav_link: [
                        {
                            Name: 'SEE ALL',
                            link: {
                                url: '/perspectives',
                            },
                        },
                    ],
                    mobile_view: [
                        {
                            link: {
                                url: '/perspectives',
                            },
                        },
                    ],
                }}
            />
        </main>
    )
}

export { Post }
