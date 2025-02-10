'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from '@/utils/emblaCarouselProgressDots'
import Image from 'next/image'
import { useEffect } from 'react'

const TestimonialsCarousel = ({ blok }: { blok: any }) => {
    const carouselSlides = blok?.slides.map((slide: any) => {
        return {
            _uid: slide?._uid,
            heading1: slide?.heading_line_1,
            heading2: slide?.heading_line_2,
            description: slide?.description,
            image: slide?.image?.filename,
            image_alt: slide?.imageg?.alt,
        }
    })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            dragFree: false,
            watchDrag: false,
            skipSnaps: true,
            containScroll: 'trimSnaps',
        },
        [
            Autoplay({
                delay: 4000,
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
                className="content-grid space-y-5 lg:space-y-20 py-5 pb-20 lg:pb-[120px]"
            >
                {/* Section heading */}
                <h2 className="text-h5 lg:text-h2 lg:w-full w-2/3 text-primary text-left lg:text-center">
                    What founders say about us
                </h2>
                {/* Carousel */}
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {carouselSlides?.map((slide: any) => {
                            return (
                                <div
                                    key={slide?._uid}
                                    className="embla__slide first:opacity-100 opacity-0 transition-opacity duration-1000 ease-in-out w-full"
                                >
                                    <div className="max-w-[1090px] flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 mx-auto">
                                        {/* Text */}
                                        <div className="max-w-1/2 my-auto space-y-4 lg:space-y-10">
                                            <div className="text-subheading1 font-secondary text-primary uppercase font-medium space-y-1">
                                                <p>{slide.heading1}</p>
                                                <p>{slide.heading2}</p>
                                            </div>
                                            <p className="lg:text-copy4 text-fig">
                                                {slide.description}
                                            </p>
                                        </div>

                                        {/* Image */}
                                        <div className="w-full relative aspect-square lg:aspect-[510/460] lg:h-[460px] lg:w-auto lg:shrink-0 mx-auto">
                                            <Image
                                                src={slide.image}
                                                alt={
                                                    slide.image_alt ??
                                                    'Testimonials slide image'
                                                }
                                                fill
                                                className="w-auto h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Carousel dots */}
                    <div className="mt-10 lg:mt-[60px] flex justify-center items-center gap-3 lg:gap-5">
                        {scrollSnaps.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className="py-2 cursor-pointer"
                            >
                                <DotButton
                                    className={'w-[28px] lg:w-[38px] h-[1px] bg-fig'.concat(
                                        index === selectedIndex
                                            ? ' !bg-primary h-[2px] opacity-100'
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

export { TestimonialsCarousel }
