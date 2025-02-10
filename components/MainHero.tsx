import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'

export function MainHero({ blok }: { blok: any }) {
    return (
        <section
            id="main-hero-section"
            {...storyblokEditable(blok)}
            className="content-grid pt-20 lg:pb-10"
        >
            <div
                data-anime-target=".main-hero-animation"
                data-y="10px"
                className="anime mx-auto w-full h-fit"
            >
                {blok.logo.filename && (
                    <Image
                        src={blok?.logo?.filename}
                        alt={blok?.logo?.alt}
                        fill
                        loading="eager"
                        quality={100}
                        fetchPriority="high"
                        className="!relative [div.anime_&]:opacity-0 main-hero-animation [div.anime_&]:translate-y-[10px]"
                    />
                )}
            </div>
        </section>
    )
}
