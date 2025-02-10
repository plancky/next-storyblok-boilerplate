'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import IconRightArrow from './icons/IconRightArrow'
import { richTextResolver } from '@storyblok/richtext'

const { render: renderHtmlString } = richTextResolver()
const HeadingCarousel = ({ blok }: { blok: any }) => {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: blok.loop ?? true,
            dragFree: true,
            startIndex: 0,
            align: 'start',
        },
        [
            Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnFocusIn: false,
            }),
        ]
    )

    return (
        <section
            {...storyblokEditable(blok)}
            className={
                (blok.order ? 'flex-col-reverse mb-10' : 'flex-col mt-10') +
                ' flex'
            }
        >
            {/* Carousel */}
            <div
                data-anime-target=".heading-carousel-slide"
                data-y="10px"
                className="embla anime full-width-gridless"
                ref={emblaRef}
            >
                <div
                    className={
                        (blok?.carousel_height
                            ? `lg:h-[${blok?.carousel_height}px]`
                            : 'lg:h-[500px]') +
                        ' embla__container full-width h-[300px] -ml-3 lg:-ml-4'
                    }
                >
                    {blok.Images.map((item: any, index: number) => {
                        return (
                            <div
                                key={item.id}
                                className={
                                    (blok?.carousel_width
                                        ? `lg:min-w-[${blok?.carousel_width}px]`
                                        : 'lg:min-w-[350px]') +
                                    ' embla__slide heading-carousel-slide [div.anime_&]:opacity-0 [div.anime_&]:translate-y-[10%] pl-3 lg:pl-4 w-[250px] lg:w-auto'
                                }
                            >
                                {item.filename && (
                                    <Image
                                        src={item.filename}
                                        alt={item.alt}
                                        fill
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        fetchPriority={
                                            index === 0 ? 'high' : 'auto'
                                        }
                                        className="!relative h-[500px] w-auto aspect-[420/500] object-cover"
                                    />
                                )}
                            </div>
                        )
                    })}
                    {blok.Images.map((item: any, index: number) => {
                        return (
                            <div
                                key={item.id}
                                className={
                                    (blok?.carousel_width
                                        ? `lg:min-w-[${blok?.carousel_width}px]`
                                        : 'lg:min-w-[350px]') +
                                    ' embla__slide heading-carousel-slide [div.anime_&]:opacity-0 [div.anime_&]:translate-y-[10%] pl-3 lg:pl-4 w-[250px] lg:w-auto'
                                }
                            >
                                {item.filename && (
                                    <Image
                                        src={item.filename}
                                        alt={item.alt}
                                        fill
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                        fetchPriority={
                                            index === 0 ? 'high' : 'auto'
                                        }
                                        className="!relative aspect-[240/305] lg:aspect-[420/500] object-cover"
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Heading and body text */}
            {blok?.heading && blok?.description && (
                <div
                    data-anime-target=".heading-carousel-text-animation"
                    className={`content-grid anime py-[60px] lg:py-[120px]`}
                >
                    <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 w-full">
                        <h2 className="text-h5 lg:w-3/5 min-[1600px]:whitespace-pre heading-carousel-text-animation [div.anime_&]:translate-y-[40%] [div.anime_&]:opacity-0 lg:text-h2 text-primary">
                            {blok?.heading}
                        </h2>

                        <div className="lg:w-2/5 space-y-6 lg:pt-[13px] max-w-[515px] h-fit">
                            <p className="text-copy4 heading-carousel-text-animation translate-y-[40%] opacity-0 lg:text-copy3 text-primary">
                                {blok?.description}
                            </p>
                            {blok?.link_text && blok?.link && (
                                <a
                                    href={blok.link.url}
                                    className="w-fit text-primary !font-semibold heading-carousel-text-animation translate-y-[40%] opacity-0 text-subheading3 lg:text-subheading2 font-secondary uppercase flex gap-3 items-center"
                                >
                                    <p>{blok?.link_text}</p>
                                    <IconRightArrow width="17" height="12" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export { HeadingCarousel }
