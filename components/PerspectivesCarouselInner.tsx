'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { formatDateInShortForm } from '@/utils/reformatDate'
import IconRightArrow from './icons/IconRightArrow'
import React, { useEffect } from 'react'
import { fetchPosts } from '@/utils/fetchContent'

type Slide = {
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
        component: '',
        date: content?.published_at,
        _editable: content?._editable,
    }
}

export async function getCarouselSlides(blok: any) {
    let slides: Slide[] = []
    if (blok.auto_fetch_posts) {
        const { data, error } = await fetchPosts()
        slides = data.stories?.map((post: any) => {
            return getSlideFromPost(post)
        })
        slides = slides
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .reverse()
    } else {
        slides = blok.slides
            ?.map((blok: any) => {
                if (blok.component == 'global_reference') {
                    const reference_portfolios = blok.reference?.map(
                        (item: any) => {
                            return getSlideFromPost(item)
                        }
                    )
                    return reference_portfolios
                } else {
                    return {
                        ...blok,
                        tags: blok?.tags?.map((tag: any) => tag.name),
                    }
                }
            })
            .flat()
    }
    return slides
}

export const PerspectivesCarouselInner = ({ blok }: { blok: any }) => {
    const [slides, setCarouselSlides] = React.useState<Slide[]>([])
    useEffect(() => {
        getCarouselSlides(blok).then((slides) => {
            setCarouselSlides(slides)
        })
    }, [blok])

    const carouselSlides = slides
    const mobileContent = blok.mobile_view[0]
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true, startIndex: 0, align: 'start' },
        [
            Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnFocusIn: false,
            }),
        ]
    )

    return (
        <>
            <section
                {...storyblokEditable(blok)}
                className="content-grid space-y-5 lg:space-y-10 mt-5 lg:mt-10"
            >
                {/* Section heading and link - DESKTOP */}
                <div className="hidden lg:flex justify-between items-center">
                    <h3 className="text-h3 text-wrap">{blok?.heading}</h3>
                    <a
                        href={blok?.nav_link[0]?.link.url}
                        className="text-primary uppercase text-subheading2 w-fit font-secondary flex items-center gap-3"
                    >
                        <p>{blok?.nav_link[0]?.Name}</p>
                        <IconRightArrow width="17" height="12" />
                    </a>
                </div>

                {/* Section heading, desc, link - MOBILE */}
                <div className="lg:hidden space-y-5 !mt-0">
                    <div className="space-y-10">
                        <span className="text-h5">{blok?.heading}</span>
                        {mobileContent.description && (
                            <p className="text-copy5">
                                {mobileContent.description}
                            </p>
                        )}
                    </div>
                    <a
                        href={mobileContent.link.url}
                        className="text-subheading3 text-primary font-secondary w-fit flex items-center gap-3"
                    >
                        <p className="uppercase">{mobileContent.link_text}</p>
                        <IconRightArrow width="17" height="12" />
                    </a>
                </div>

                {/* Carousel */}
                <div
                    className="embla border-primary lg:content full-width-gridless"
                    ref={emblaRef}
                >
                    <div
                        data-anime-target={'.PostSlide-animation'}
                        className="embla__container lg:-mx-[30px]"
                    >
                        {carouselSlides.map((slide: any, index: number) => {
                            return (
                                <PostSlide
                                    slide={slide}
                                    index={index}
                                    key={`PostSlide-${slide?._uid}`}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

function PostSlide({
    slide,
    index,
}: {
    slide: Slide
    index: number
}): JSX.Element {
    return (
        <a
            href={slide?.url}
            key={`PostSlide-${slide._uid}`}
            className={`embla__slide group ${
                index < 3
                    ? `PostSlide-animation opacity-100 translate-y-[0%]`
                    : ''
            }  bg-none pb-5 pt-10 lg:py-[30px] max-w-[320px] lg:max-w-none lg:!w-1/3 border-primary border-r border-t`}
        >
            <div className="flex flex-col justify-between h-full gap-[60px] lg:gap-0">
                {/* Top Text */}
                <div className="px-5 lg:px-[30px] lg:pb-12 space-y-10">
                    <div className="space-y-1 lg:space-y-2">
                        <p className="font-secondary text-primary text-subheading4 lg:text-subheading2">
                            {formatDateInShortForm(slide?.date).toUpperCase()}
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            {slide?.tags?.map((tag: string, index: number) => (
                                <div
                                    key={`${slide._uid}-${tag}-${index}`}
                                    className="w-fit bg-[#D8E9EA] rounded-[2px] text-subheading4 lg:text-subheading3 uppercase font-secondary text-primary px-[10px] py-[3px] lg:px-4 lg:py-[9px]"
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-h6 lg:text-h5 text-primary">
                        <span className="">{slide?.heading}</span>
                    </div>
                </div>

                {/* Image */}
                <div className="px-5 lg:px-[30px]">
                    <div className="overflow-hidden w-full h-full">
                        <Image
                            src={slide.media?.filename}
                            alt={slide.media?.alt}
                            fill
                            className="!relative group-hover:scale-110 w-full h-auto lg:aspect-[480/395] object-cover aspect-square transition-transform duration-300"
                            quality={100}
                        />
                    </div>
                </div>
            </div>
        </a>
    )
}
