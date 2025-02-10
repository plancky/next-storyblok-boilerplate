import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'

export function TeamMembers({ blok }: { blok: any }) {
    const reference_slides = blok.reference_slide.map((referenceItem: any) => {
        const teamMembersSlides = referenceItem.reference
            .map((story: any) => story.content)
            .map((team_member: any) => team_member)
        return teamMembersSlides
    })[0]

    return (
        <section
            {...storyblokEditable(blok)}
            className="content-grid pb-[60px]"
        >
            <div className="flex flex-col gap-10 lg:gap-[60px]">
                {blok.heading && (
                    <h1 className="text-h5 lg:text-start text-center lg:text-h3">
                        {blok.heading}
                    </h1>
                )}
                <div
                    data-y="10px"
                    data-anime-target=".team-members-slide-animation"
                    className="grid anime grid-rows-1 w-full gap-10 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3"
                >
                    {blok.slides.map((slide: any) => {
                        if (!slide) return null
                        return (
                            <div
                                className={
                                    'team-members-slide-animation opacity-0 translate-y-[10px]'
                                }
                                key={slide._uid}
                            >
                                <a
                                    target="_blank"
                                    href={slide?.url?.url ?? ''}
                                    className="relative flex w-full h-auto aspect-[350/312] bg-gray-300 lg:aspect-[496/430]"
                                >
                                    {slide.image && (
                                        <Image
                                            src={slide.image?.filename}
                                            alt={slide.image?.alt}
                                            className="object-top object-cover"
                                            quality={100}
                                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                            fill
                                        />
                                    )}
                                </a>
                                <div className="flex flex-col gap-[30px] lg:gap-10 pt-[30px] lg:py-10">
                                    <div className="lg:text-subheading1 !font-semibold flex flex-col gap-1 text-subheading3 font-secondary">
                                        <p>{slide.name}</p>
                                        <p>{slide.profession}</p>
                                    </div>
                                    <span className="text-copy5 lg:text-copy4 font-primary text-primary">
                                        {slide.description}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                    {reference_slides.length > 0 &&
                        reference_slides?.map((slide: any) => {
                            if (!slide) return null
                            return (
                                <div
                                    className={
                                        'team-members-slide-animation opacity-0 translate-y-[10px]'
                                    }
                                    key={slide._uid}
                                >
                                    <a
                                        target="_blank"
                                        href={slide?.url?.url ?? ''}
                                        className="relative flex w-full h-auto aspect-[350/312] bg-gray-300 lg:aspect-[496/430]"
                                    >
                                        {slide.image && (
                                            <Image
                                                src={slide.image?.filename}
                                                alt={slide.image?.alt}
                                                className="object-top object-cover"
                                                quality={100}
                                                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                fill
                                            />
                                        )}
                                    </a>
                                    <div className="flex flex-col gap-[30px] lg:gap-10 pt-[30px] lg:py-10">
                                        <div className="lg:text-subheading1 !font-semibold flex flex-col gap-1 text-subheading3 font-secondary">
                                            <p>{slide.name}</p>
                                            <p>{slide.profession}</p>
                                        </div>
                                        <span className="text-copy5 lg:text-copy4 font-primary text-primary">
                                            {slide.description}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}
