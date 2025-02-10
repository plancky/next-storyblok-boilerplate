import { storyblokEditable } from '@storyblok/react/rsc'
import { richTextResolver } from '@storyblok/richtext'
import Image from 'next/image'

const { render: renderHtmlString } = richTextResolver()
export function VenturePartners({ blok }: { blok: any }) {
    const referenceSlides = blok.reference_slides.map((referenceItem: any) => {
        const venturePartnerSlides = referenceItem.reference
            .map((story: any) => story.content)
            .map((venture_partner: any) => venture_partner)
        return venturePartnerSlides
    })

    return (
        <section
            data-y="10px"
            data-anime-target=".venture-partners-slide-animation"
            {...storyblokEditable(blok)}
            className="anime content-grid py-[60px] lg:py-[120px]"
        >
            <div className="flex flex-col gap-10 lg:gap-[60px]">
                {blok.heading && (
                    <h1 className="text-h5 lg:text-start text-center lg:text-h3">
                        {blok.heading}
                    </h1>
                )}
                <div className="grid grid-rows-1 w-full gap-10 sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 md:grid-cols-3">
                    {referenceSlides.length > 0 &&
                        referenceSlides[0].map((slide: any) => {
                            if (!slide) return null
                            return (
                                <div
                                    className="venture-partners-slide-animation opacity-0 translate-y-[10px]"
                                    key={slide._uid}
                                >
                                    <a
                                        target="_blank"
                                        href={slide?.url.url}
                                        className="relative bg-none flex w-full h-auto aspect-[350/312] bg-gray-300 lg:aspect-[360/346]"
                                    >
                                        {slide.image && (
                                            <Image
                                                src={slide.image?.filename}
                                                alt={slide.image?.alt}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </a>
                                    <div className="flex flex-col gap-4 lg:gap-10 pt-5 lg:pb-10">
                                        <div className="lg:text-copy4 !font-semibold text-figtree-copy1 font-secondary">
                                            <p>{slide.name}</p>
                                            <p>{slide.profession}</p>
                                        </div>
                                        <span
                                            className="text-copy6 lg:text-copy5 font-primary text-primary"
                                            dangerouslySetInnerHTML={{
                                                __html: renderHtmlString(
                                                    slide.about ?? ''
                                                ) as string,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            )
                        })}
                    {blok.slides.map((slide: any) => {
                        return (
                            <div
                                className="venture-partners-slide-animation opacity-0 translate-y-[10px]"
                                key={slide._uid}
                            >
                                <a
                                    target="_blank"
                                    href={slide.url?.url}
                                    className="relative w-full flex h-auto aspect-[350/312] bg-gray-300 lg:aspect-[360/346]"
                                >
                                    {slide.image && (
                                        <Image
                                            src={slide.image.filename}
                                            alt={slide.image?.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </a>
                                <div className="flex flex-col gap-4 lg:gap-10 pt-5 lg:pb-10">
                                    <div className="lg:text-copy4 !font-semibold text-figtree-copy1 font-secondary">
                                        <p>{slide.name}</p>
                                        <p>{slide.profession}</p>
                                    </div>
                                    <span
                                        className="text-copy6 lg:text-copy5 font-primary text-primary"
                                        dangerouslySetInnerHTML={{
                                            __html: renderHtmlString(
                                                slide.about ?? ''
                                            ) as string,
                                        }}
                                    ></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
