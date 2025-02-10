'use client'
import {
    storyblokEditable,
    StoryblokComponent,
    SbBlokData,
} from '@storyblok/react/rsc'
import Image from 'next/image'
import rightArrow from '@/assets/CTA_Right_Arrow_Primary.svg'
import { useRef } from 'react'

const HeadingWithMedia = ({ blok }: { blok: any }) => {
    const rootRef = useRef<HTMLDivElement>(null)

    return (
        <section
            {...storyblokEditable(blok)}
            className={
                (blok.order ? 'flex-col-reverse mb-10' : 'flex-col mt-10') +
                ' flex'
            }
        >
            {/* Media */}
            {blok.media.filename && (
                <div className="w-full h-[300px] lg:h-[575px]">
                    <Image
                        src={blok?.media?.filename}
                        alt={blok?.media.alt}
                        fill
                        className="object-cover h-auto w-auto !relative"
                    />
                </div>
            )}
            {blok.video.filename && (
                <div>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-[300px] lg:h-[600px] aspect-[2/3]"
                    >
                        <source
                            src={blok?.video?.filename}
                            type="video/mp4"
                        ></source>
                    </video>
                </div>
            )}

            {/* Heading and body text */}
            {blok?.heading && blok?.description && (
                <div
                    data-anime-target=".heading-media-text-animation"
                    className={`content-grid anime py-10 lg:py-[120px]`}
                >
                    <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-[150px] mx-auto">
                        <h2 className="text-h5 lg:w-1/3 heading-media-text-animation translate-y-[40%] opacity-0 lg:text-h2 text-primary">
                            {blok?.heading}
                        </h2>

                        <div className="lg:w-1/2 space-y-6 h-fit">
                            <p className="text-copy4 heading-media-text-animation translate-y-[40%] opacity-0 lg:text-copy2 text-fig">
                                {blok?.description}
                            </p>
                            {blok?.link_text && blok?.link && (
                                <a
                                    href={blok.link.url}
                                    className="w-fit text-fig text-subheading3 heading-media-text-animation translate-y-[40%] opacity-0 lg:text-subheading2 font-secondary uppercase flex gap-3 items-center"
                                >
                                    <p>{blok?.link_text}</p>
                                    <Image
                                        src={rightArrow}
                                        alt="Right Arrow Icon"
                                        width={17}
                                        height={12}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export { HeadingWithMedia }
