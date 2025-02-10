'use client'

import Image from 'next/image'
import { renderHtmlString } from '@/utils/richTextResolver'
import IconRightArrow from './icons/IconRightArrow'
import { useMediaQuery } from './hooks/useMediaQuery'

import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const PortfolioCarouselHelper = ({ blok, items }: any) => {
    const isMobile = useMediaQuery('(max-width: 1023px)')

    const carouselSlides = items.data.stories
        ?.map((item: any) => {
            const blok = item.content
            return {
                _uid: blok?.company_name,
                image: blok?.featured_image,
                heading: blok?.company_name,
                description: blok?.company_description,
                component: 'media-with-text-slide',
                _editable: blok?._editable,
            }
        })
        .flat()

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
                data-y="10px"
                data-anime-target=".portfolio-slide-animation"
                className={`${
                    isMobile ? 'anime' : ''
                } content-grid space-y-10 mt-[60px] pb-10 lg:mt-20`}
            >
                {/* Section heading and link - DESKTOP */}
                <div className="hidden lg:flex justify-between items-center">
                    <h3 className="text-h3">{blok?.heading}</h3>
                    <a
                        href="/portfolio"
                        className="text-primary !font-semibold text-subheading2 font-secondary flex items-center gap-3"
                    >
                        <p>VIEW OUR PORTFOLIO</p>
                        <IconRightArrow width="17" height="12" />
                    </a>
                </div>

                {/* Section heading, desc, link - MOBILE */}
                <div className="lg:hidden space-y-6 !mt-0">
                    <div className="space-y-10">
                        <span className="text-h5">{blok?.heading}</span>
                        <p className="text-copy5">
                            {mobileContent.description}
                        </p>
                    </div>
                    <a
                        href={mobileContent.link.url}
                        className="text-subheading3 !font-semibold text-primary font-secondary w-fit flex items-center gap-3"
                    >
                        <p className="uppercase">{mobileContent.link_text}</p>
                        <IconRightArrow width="17" height="12" />
                    </a>
                </div>
            </section>

            {/* Carousel */}
            <div
                className="embla pb-[60px] lg:pb-20 content-grid"
                ref={emblaRef}
            >
                <div
                    data-y="10px"
                    data-anime-target=".portfolio-slide-animation"
                    className={`${
                        isMobile ? '' : 'anime'
                    } embla__container -ml-3 lg:-ml-5`}
                >
                    {carouselSlides.map((slide: any) => {
                        return (
                            <div
                                key={slide?._uid}
                                className={`portfolio-slide-animation [div.anime_&]:opacity-0 [div.anime_&]:translate-y-[10px] embla__slide group pl-3 lg:pl-5 max-w-[320px] lg:max-w-none lg:!w-1/3 flex flex-col`}
                            >
                                <div className="overflow-hidden h-auto w-full">
                                    <a href="/portfolio" className="bg-none">
                                        <Image
                                            src={slide?.image?.filename}
                                            alt={
                                                slide?.alt ??
                                                'Portfolio carousel image'
                                            }
                                            fill
                                            className="!relative object-cover aspect-[320/271] lg:aspect-[513/454] group-hover:scale-110 transition-transform duration-300"
                                            quality={100}
                                        />
                                    </a>
                                </div>
                                <div className="grow py-5 lg:py-10 mt-4 lg:mt-0 border-primary space-y-4 lg:space-y-6">
                                    <span className="text-h7 lg:text-h5 text-primary uppercase">
                                        {slide?.heading}
                                    </span>
                                    <div
                                        className="text-copy6 lg:text-copy4 text-primary"
                                        dangerouslySetInnerHTML={{
                                            __html: renderHtmlString(
                                                slide?.description ?? ''
                                            ) as string,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PortfolioCarouselHelper
