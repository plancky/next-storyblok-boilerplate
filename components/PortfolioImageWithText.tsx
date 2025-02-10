import {
    storyblokEditable,
    StoryblokComponent,
    SbBlokData,
} from '@storyblok/react/rsc'
import Image from 'next/image'
import IconRightArrow from './icons/IconRightArrow'

const PortfolioImageWithText = ({ blok }: { blok: any }) => {
    const items = blok?.items

    return (
        <section {...storyblokEditable(blok)} className="content-grid">
            {items.map((item: any) => {
                return (
                    <div
                        key={item?._uid}
                        className={
                            (item?.order
                                ? 'flex-col-reverse lg:flex-row-reverse'
                                : 'flex-col lg:flex-row') +
                            ' w-full flex justify-between items-center gap-5 lg:gap-0 py-10 lg:py-20'
                        }
                    >
                        {/* Description and brand logo */}
                        <div className="space-y-5 lg:space-y-10 max-w-[650px]">
                            <div className="w-fit h-fit max-w-[200px]">
                                <Image
                                    src={item?.brand_logo?.filename}
                                    alt={item?.brand_logo?.alt}
                                    fill
                                    className="!relative w-auto h-auto"
                                />
                            </div>
                            <p className="lg:text-copy3">{item?.description}</p>
                            <a
                                href={item?.link?.url}
                                className="flex items-center gap-3 uppercase font-secondary text-subheading2"
                            >
                                <p>{item?.link_text}</p>
                                <IconRightArrow />
                            </a>
                        </div>

                        {/* Image */}
                        <div className="h-auto w-full lg:max-w-[500px]">
                            <Image
                                src={item?.image?.filename}
                                alt={item?.image?.alt}
                                fill
                                className="!relative w-auto h-auto"
                            />
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export { PortfolioImageWithText }
