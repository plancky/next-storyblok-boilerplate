'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import IconRightArrow from './icons/IconRightArrow'

const BannerLink = ({ blok }: { blok: any }) => {
    return (
        <section
            {...storyblokEditable(blok)}
            className="w-full bg-desktop-banner grid bg-primary bg-[length:cover] place-content-center py-[60px] lg:py-[120px] p-[var(--mobile-page-padding)] lg:p-[var(--page-padding)]"
        >
            <div
                data-anime-target=".banner-link-text-animation"
                className={`anime max-w-[770px] text-coconut text-center flex flex-col justify-center items-center space-y-10`}
            >
                <h2 className="text-h5 banner-link-text-animation translate-y-[40%] opacity-0 lg:text-h2">
                    {blok?.heading}
                </h2>
                <p className="text-copy5 banner-link-text-animation whitespace-pre text-wrap translate-y-[40%] opacity-0 lg:text-copy3">
                    {blok?.description}
                </p>
                <a
                    href={blok?.link?.url}
                    className="flex items-center banner-link-text-animation translate-y-[40%] opacity-0 gap-3"
                >
                    <p className="uppercase text-subheading3 lg:text-subheading2 font-secondary">
                        {blok?.link_text}
                    </p>
                    <IconRightArrow width="17" height="12" />
                </a>
            </div>
        </section>
    )
}

export { BannerLink }
