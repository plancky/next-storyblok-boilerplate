'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from '@/utils/emblaCarouselProgressDots'
import { useEffect } from 'react'

const TextCardsCarousel = ({ blok }: { blok: any }) => {
    const carouselSlides = blok?.slides.map((slide: any) => {
        return {
            _uid: slide?._uid,
            heading: slide?.heading,
            description: slide?.description,
        }
    })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            duration: 100,
            watchDrag: false,
            skipSnaps: true,
            containScroll: 'trimSnaps',
        },
        [
            Autoplay({
                delay: 20000,
                stopOnInteraction: false,
                stopOnFocusIn: false,
                jump: true,
            }),
        ]
    )

    useEffect(() => {
        if (emblaApi) {
            const slides = emblaApi.slideNodes()
            emblaApi.on('select', () => {
                const selectedSlide = slides[emblaApi.selectedScrollSnap()]
                const previousSlide = slides[emblaApi.previousScrollSnap()]
                if (previousSlide) {
                    previousSlide.style.opacity = '0'
                }
                selectedSlide.style.opacity = '1'
            })
        }

        return () => {
            if (emblaApi) {
                emblaApi.destroy()
            }
        }
    }, [emblaApi])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        true
    )

    return (
        <>
            <section
                {...storyblokEditable(blok)}
                className="content-grid pt-[20px] pb-[25px] lg:py-[108px] lg:mb-[60px]"
            >
                {/* Carousel */}
                <div
                    className="embla select-none cursor-pointer"
                    ref={emblaRef}
                >
                    <div className="embla__container">
                        {carouselSlides?.map((slide: any) => {
                            return (
                                <div
                                    key={slide?._uid}
                                    className="embla__slide first:opacity-100 opacity-0 transition-opacity duration-1000 ease-in-out w-full"
                                >
                                    <div className="max-w-[800px] h-full flex flex-col justify-start items-center gap-10 lg:gap-[60px] text-center mx-auto">
                                        <h2 className="uppercase whitespace-pre text-wrap text-h3 font-demi lg:text-[82px] text-primary leading-none lg:leading-[1.1]">
                                            {slide?.heading}
                                        </h2>
                                        <p className="text-copy5 lg:text-copy3">
                                            {slide?.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Carousel dots */}
                    <div className="h-10 lg:h-fit mt-20 lg:mt-[60px] flex justify-center items-center gap-3 lg:gap-5">
                        {scrollSnaps.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className="py-2 cursor-pointer"
                            >
                                <DotButton
                                    className={'w-7 lg:w-[38px] h-[2px] bg-jade '.concat(
                                        index === selectedIndex
                                            ? ' !bg-primary opacity-100'
                                            : ' opacity-50'
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export { TextCardsCarousel }
