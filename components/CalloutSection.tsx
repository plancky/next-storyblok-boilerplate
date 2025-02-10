'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import IconRightArrow from './icons/IconRightArrow'

export function CalloutSection({ blok }: { blok: any }) {
    return (
        <section
            data-anime-target=".callout-text-animation"
            {...storyblokEditable(blok)}
            className="content-grid anime place-items-center"
        >
            <div
                className={`flex w-full lg:items-center text-start lg:text-center lg:my-[120px] my-[60px] flex-col`}
            >
                {blok.heading && (
                    <h1 className="text-h5 text-wrap callout-text-animation translate-y-[40%] opacity-0 lg:whitespace-pre lg:text-h3">
                        {blok.heading}
                    </h1>
                )}
                {blok.subheading && (
                    <p className="text-copy5 lg:whitespace-pre callout-text-animation translate-y-[40%] opacity-0 text-wrap text-primary lg:text-copy3 mt-10">
                        {blok.subheading}
                    </p>
                )}

                {blok.link && blok.link_label && (
                    <a
                        href={blok.link.url}
                        className="lg:mt-10 flex w-fit callout-text-animation translate-y-[40%] opacity-0 gap-3 text-primary items-center text-subheading3 lg:text-subheading2 font-secondary mt-6"
                    >
                        {blok.link_label}
                        <IconRightArrow />
                    </a>
                )}
            </div>
        </section>
    )
}
