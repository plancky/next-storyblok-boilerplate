'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import { richTextResolver } from '@storyblok/richtext'

const { render: renderHtmlString } = richTextResolver()

const PortfolioGridHelper = ({ blok, items }: any) => {
    const gridItems = items.data.stories.map((item: any) => item.content)

    return (
        <section
            {...storyblokEditable(blok)}
            className="content-grid pb-[60px] lg:pb-[120px]"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-y-5 lg:gap-x-5">
                {gridItems.map((item: any) => {
                    return (
                        <SlideComponent
                            uid={item?._uid}
                            key={item?._uid}
                            brandImage={item?.brand_logo?.filename}
                            logoHeight={item?.logo_height}
                            mobilelogoHeight={item?.mobile_logo_height}
                            description={item.company_description}
                            brandAlt={item?.brand_logo?.alt}
                            link={item?.company_link?.url}
                            image={item?.featured_image?.filename}
                            alt={item?.featured_image?.alt}
                        />
                    )
                })}
            </div>
        </section>
    )
}

const SlideComponent = ({
    uid,
    link,
    image,
    logoHeight,
    mobilelogoHeight,
    alt,
    brandImage,
    brandAlt,
    description,
}: {
    uid: string
    link: string
    image: string
    logoHeight: number
    mobilelogoHeight: number
    alt: string
    brandImage: string
    brandAlt: string
    description: any
}) => {
    return (
        <a
            href={link}
            target="_blank"
            className="bg-none anime"
            data-anime-target={`.portfolio-grid-slide`}
            data-y="10px"
            key={uid}
        >
            <section className="group portfolio-grid-slide opacity-0 translate-y-[10px] relative grid h-full anime space-y-5 lg:space-y-0">
                {/* Image */}
                <div className="w-full h-fit">
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        className="!relative object-cover aspect-[350/312] xl:aspect-[512/454]"
                    />
                </div>
                <div className="py-5 lg:py-0 lg:absolute px-5 flex flex-col justify-center h-full lg:px-0 xl:px-12 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 bg-coconut border-y border-primary">
                    {/* Brand logo */}
                    <div className="gap-y-5 grid grid-rows-[.2fr_.8fr] xl:grid-rows-[.5fr_.8fr] 2xl:grid-rows-2 lg:gap-y-6 h-full">
                        <Image
                            style={
                                {
                                    '--logo-height': `${logoHeight}px`,
                                    '--mobile-logo-height': `${mobilelogoHeight}px`,
                                } as React.CSSProperties
                            }
                            src={brandImage}
                            alt={brandAlt}
                            fill
                            className="!relative aspect-[350/80] self-end !h-[--mobile-logo-height] xl:!h-[--logo-height] w-auto object-contain"
                        />
                        {/* Description Text/Link - MOBILE */}
                        <span
                            dangerouslySetInnerHTML={{
                                __html:
                                    (renderHtmlString(
                                        description ?? ''
                                    ) as string) ?? '',
                            }}
                            className="text-center text-pretty self-start text-copy5"
                        ></span>
                    </div>
                </div>
            </section>
        </a>
    )
}

export default PortfolioGridHelper
