import { storyblokEditable } from '@storyblok/react/rsc'

const SecondaryHero = ({ blok }: { blok: any }) => {
    const { heading, subheading, heading_alignment, subheading_alignment } =
        blok
    const margins = {
        top_spacing: blok?.top_spacing,
        bottom_spacing: blok?.bottom_spacing,
        mobile_top_spacing: blok?.mobile_top_spacing,
        mobile_bottom_spacing: blok?.mobile_bottom_spacing,
    }
    return (
        <section {...storyblokEditable(blok)}>
            <SecondaryHeroSection
                heading={heading}
                subheading={subheading}
                heading_alignment={heading_alignment}
                subheading_alignment={subheading_alignment}
                margins={margins}
                uid={blok._uid}
            />
        </section>
    )
}

export const SecondaryHeroSection = ({
    heading,
    heading_alignment,
    subheading,
    subheading_alignment,
    margins,
    uid,
}: {
    heading: string
    subheading: string
    heading_alignment: string
    subheading_alignment: string
    uid: string
    margins: {
        top_spacing: number
        bottom_spacing: number
        mobile_top_spacing: number
        mobile_bottom_spacing: number
    }
}) => {
    const {
        top_spacing,
        bottom_spacing,
        mobile_top_spacing,
        mobile_bottom_spacing,
    } = margins ?? {}
    return (
        <div
            data-anime-target={`.secondary-hero-text-animation-${uid}`}
            style={
                {
                    '--top-spacing': `${top_spacing}px`,
                    '--bottom-spacing': `${bottom_spacing}px`,
                    '--mobile-top-spacing': `${mobile_top_spacing}px`,
                    '--mobile-bottom-spacing': `${mobile_bottom_spacing}px`,
                } as React.CSSProperties
            }
            className="anime content-grid"
        >
            <div className="mb-[--mobile-bottom-spacing] mt-[--mobile-top-spacing] lg:mt-[--top-spacing] lg:mb-[--bottom-spacing] flex flex-col gap-16 lg:gap-11 ">
                <div className={`flex w-full justify-${heading_alignment}`}>
                    {heading && (
                        <h1
                            className={`secondary-hero-text-animation-${uid} text-wrap whitespace-pre opacity-0 translate-y-[40%] w-full text-h4 lg:text-h1`}
                        >
                            {heading}
                        </h1>
                    )}
                </div>
                <div className={`flex w-full justify-${subheading_alignment}`}>
                    <div className="flex flex-col gap-10">
                        {subheading && (
                            <p
                                className={`secondary-hero-text-animation-${uid} opacity-0 translate-y-[40%] w-full lg:w-fit lg:max-w-[520px] lg:whitespace-pre-wrap text-copy4 text-wrap lg:text-copy2`}
                            >
                                {subheading}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SecondaryHero }
