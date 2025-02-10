'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { formatDateInShortForm } from '@/utils/reformatDate'
import IconRightArrow from './icons/IconRightArrow'

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

export const RelatedPostsInner = ({
    blok,
    slides,
}: {
    blok: any
    slides: Slide[]
}) => {
    const carouselSlides = slides
    const mobileContent = blok?.mobile_view[0]
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        dragFree: true,
        startIndex: 0,
        align: 'start',
    })

    return (
        <>
            <section
                {...storyblokEditable(blok)}
                className="full-width lg:mt-10"
            >
                {/* Section heading and link - DESKTOP */}
                <div className=" border-y py-[40px] border-primary">
                    <div className="flex justify-between items-center  ">
                        <h3 className="lg:text-h3 text-h6">{blok?.heading}</h3>
                        <a
                            href={blok?.nav_link[0]?.link.url}
                            className="lg:text-primary !font-semibold lg:text-subheading2 text-copy6 font-secondary flex items-center gap-3"
                        >
                            <p>{blok?.nav_link[0]?.Name}</p>
                            <IconRightArrow width="17" height="12" />
                        </a>
                    </div>
                </div>

                {/* Carousel */}
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
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
            className={
                ' embla__slide group bg-none pb-5 pt-10 lg:py-[30px] px-5 lg:px-[30px] flex flex-col  justify-between gap-[60px] lg:gap-0 max-w-[340px] lg:max-w-none ' +
                ' !flex-[0_0_100%] sm:!flex-[0_0_50%] lg:!flex-[0_0_33%] border-primary border-r last:border-r-0 first:border-l-0'
            }
        >
            {/* Top Text */}
            <div className=" lg:pb-[48px] space-y-10">
                <div className="space-y-1 lg:space-y-2">
                    <p className="font-secondary text-primary text-subheading4 lg:text-subheading2">
                        {formatDateInShortForm(slide?.date)}
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
            <div className="">
                <div className="overflow-hidden w-full h-full">
                    <Image
                        src={slide.media?.filename}
                        alt={slide.media?.alt}
                        fill
                        className="!relative aspect-square lg:aspect-[480/395] group-hover:scale-110 object-cover hover:scale-110 transition-transform duration-300"
                        quality={100}
                    />
                </div>
            </div>
        </a>
    )
}
