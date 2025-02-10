'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from '@/utils/emblaCarouselProgressDots'
import Image from 'next/image'
import { useMediaQuery } from './hooks/useMediaQuery'
const TestimonialsCardCarousel = ({ blok }: { blok: any }) => {
    const carouselSlides = blok?.slides.map((slide: any) => {
        return {
            _uid: slide?._uid,
            author_title: slide?.author_title,
            author_subtitle: slide?.author_subtitle,
            content: slide?.content,
            image: slide?.author_image?.filename,
            image_alt: slide?.author_image?.alt,
        }
    })

    const isMobile = useMediaQuery('(max-width: 1023px)')

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            dragFree: false,
            slidesToScroll: isMobile ? 1 : 2,
        },
        [
            // Autoplay({
            //     delay: 4000,
            //     stopOnInteraction: false,
            //     stopOnFocusIn: false,
            // }),
        ]
    )

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    return (
        <>
            <section
                {...storyblokEditable(blok)}
                className="content-grid space-y-5 place-items-center lg:space-y-20 py-20 lg:pt-24"
            >
                {/* Section heading */}
                <h2 className="text-h5 lg:text-h2 text-primary text-left lg:text-center">
                    {blok.heading}
                </h2>
                {/* Carousel */}
                <div
                    className="embla w-full mt-[60px] sm:w-3/4 lg:w-4/5"
                    ref={emblaRef}
                >
                    <div className="embla__container lg:gap-10">
                        {carouselSlides?.map((slide: any) => {
                            return (
                                <div
                                    key={slide?._uid}
                                    className="embla__slide justify-between first:lg:ml-10 ml-5 lg:ml-0 flex flex-col gap-8 text-primary p-5 lg:py-10 lg:px-6 bg-jasmine lg:flex-[0_0_46%] flex-[0_0_98%] transition-opacity duration-1000 ease-in-out w-full"
                                >
                                    <p className="w-full lg:text-copy5 font-secondary text-fig text-pretty">
                                        {slide.content}
                                    </p>
                                    <div className="flex gap-[10px] items-center">
                                        <div className="w-[54px] rounded-full overflow-hidden relative aspect-square">
                                            <Image
                                                fill
                                                className="object-cover"
                                                src={slide.image}
                                                alt={slide.image_alt}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="lg:text-h7 !leading-[14px] text-primary">
                                                {slide.author_title}
                                            </p>
                                            <p className="lg:text-copy5 !leading-[13px] font-secondary text-[#100E0E] opacity-50">
                                                {slide.author_subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Carousel dots */}
                    <div className="mt-10 lg:mt-[60px] flex justify-center items-center gap-3 lg:gap-5">
                        {scrollSnaps.map((_: any, index: number) => (
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

export default TestimonialsCardCarousel
