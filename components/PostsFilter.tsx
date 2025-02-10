import { storyblokEditable } from '@storyblok/react/rsc'
import { PostTag } from './PostTag'
import Image from 'next/image'
import { formatDateInDigits, formatDateInShortForm } from '@/utils/reformatDate'

export function PostsFilter({ value }: { value: any }) {
    const { tags: all_tags, stories } = value

    return (
        <div className="w-full">
            <div className="lg:border-b border-primary"></div>
            <div className="flex flex-col w-full">
                {stories.map((story: any, index: number) => (
                    <PostItem
                        key={index}
                        blok={story}
                        entryIndex={index}
                        tag_list={story.tag_list}
                    />
                ))}
            </div>
        </div>
    )
}

function PostItem({
    blok,
    tag_list,
    entryIndex,
}: {
    blok?: any
    tag_list?: string[]
    entryIndex: number
}) {
    const image = blok?.content?.featured_image
    const content = blok?.content
    return (
        <a
            data-anime-target={`.post-item-${blok._uid}`}
            data-y="10px"
            key={blok?._uid}
            href={`blog/${blok?.slug}`}
            {...storyblokEditable(blok)}
            className="flex anime bg-none last:border-b-0 border-b group border-primary transition-colors"
        >
            <div
                className={`post-item-${blok._uid} [a.anime_&]:opacity-0 [a.anime_&]:translate-y-[10px] flex flex-col lg:flex-row justify-between py-10 lg:py-20 gap-10 w-full`}
            >
                <div className="flex flex-col lg:py-10 flex-1 gap-14 w-full">
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-2">
                            <div className="date font-secondary font-semibold text-primary text-copy5">
                                {formatDateInShortForm(
                                    content?.published_at
                                ).toUpperCase()}
                            </div>
                            <div className="tags flex gap-2">
                                {tag_list?.map((tag) =>
                                    PostTag({ tag, key: tag })
                                )}
                            </div>
                        </div>
                        <h2 className="heading-container font-primary lg:max-w-[560px] text-h6 lg:text-h3">
                            {content?.title}
                        </h2>
                    </div>
                    <div className="description-container hidden lg:flex lg:max-w-[720px] text-copy3">
                        {content?.description}
                    </div>
                </div>
                <div className="lg:h-[422px] h-[280px] w-auto overflow-hidden lg:aspect-[513/422] aspect-[350/280]">
                    {
                        <Image
                            src={image?.filename}
                            alt={'blog featured image'}
                            loading={entryIndex < 2 ? 'eager' : 'lazy'}
                            fetchPriority={entryIndex < 2 ? 'high' : 'auto'}
                            className="!relative object-cover group-hover:scale-110 duration-300 transition-transform h-full w-full"
                            fill
                            quality={100}
                        />
                    }
                </div>
            </div>
        </a>
    )
}
