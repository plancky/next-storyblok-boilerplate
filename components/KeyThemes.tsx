import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'

export function KeyThemes({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="content-grid">
            <div className="mt-5 mb-[60px] content lg:breakout xl:content flex flex-col gap-5 lg:gap-10 lg:mt-10 lg:mb-[100px]">
                {blok.heading && (
                    <h1
                        className={`w-full text-center text-copy5 lg:text-subheading0 font-secondary lg:text-${blok.heading_alignment}`}
                    >
                        {blok.heading}
                    </h1>
                )}

                <div
                    data-anime-target=".key-theme-animation"
                    data-y="10px"
                    className="grid anime md:grid-cols-3 grid-cols-2 xl:grid-cols-6 gap-3 justify-center xl:justify-start lg:gap-5"
                >
                    {blok.slides.map((slide: any) => {
                        return (
                            <div
                                key={slide._uid}
                                style={{
                                    backgroundColor: slide.background_color,
                                }}
                                className={`key-theme-animation w-full opacity-0 translate-y-[10px] py-5 flex flex-col lg:aspect-auto aspect-[169/240] lg:h-auto h-full items-center lg:gap-10 justify-between px-[18px] lg:pb-10`}
                            >
                                <div className="lg:px-[60px] p-5 lg:py-[70px]">
                                    <Image
                                        src={slide.image.filename}
                                        height={92}
                                        width={92}
                                        className="aspect-square min-w-[92px] h-auto"
                                        alt={slide.image.alt}
                                    />
                                </div>

                                <div className="text-copy6 text-wrap font-medium text-center font-secondary text-pepper">
                                    {slide.heading}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
