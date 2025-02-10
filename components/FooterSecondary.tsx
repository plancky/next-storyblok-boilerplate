import Image from 'next/image'
import CoconutLogoSymbol from '@/assets/coconut_logo_symbol.svg'
import CoconutLogo from '@/assets/coconut_logo_wordmark.svg'
import { richTextResolver } from '@storyblok/richtext'

const { render: renderHtmlString } = richTextResolver()
const FooterSecondary = ({
    blok,
    solidFooter,
}: {
    blok: any
    solidFooter: boolean
}) => {
    return (
        <section
            className={`${
                solidFooter
                    ? 'bg-primary text-coconut'
                    : 'bg-coconut text-primary'
            } content-grid h-[900px] lg:h-[877px] pb-5 pt-[60px] lg:py-20 border-t`}
        >
            {/* Top Section */}
            <section className="flex flex-col lg:flex-row justify-between items-start px-5 lg:px-0">
                {/* Left logo and desc */}
                <div className="space-y-10 lg:space-y-[50px]">
                    <div className="max-w-[95px] aspect-[95/80] w-[95px] lg:aspect-[122/104] relative lg:w-[122px] h-fit mx-auto lg:mx-0">
                        {solidFooter ? (
                            <Image
                                src={CoconutLogoSymbol}
                                alt={'Coconut Logo Symbol'}
                                fill
                                className="h-auto w-full"
                            />
                        ) : (
                            <Image
                                src={blok?.secondary_symbol?.filename}
                                alt={blok?.secondary_symbol?.alt}
                                fill
                                className="!relative h-auto w-auto"
                            />
                        )}
                    </div>
                    <p className="text-copy5 lg:max-w-[383px]">
                        {blok?.description}
                    </p>
                </div>

                {/* Right socials */}
                <div className="w-full lg:w-[650px] lg:text-copy5">
                    <p
                        className={`py-[12px] lg:py-[15px] lg:border-b ${
                            solidFooter
                                ? 'border-coconut text-primary'
                                : 'text-coconut border-primary'
                        }`}
                    >
                        Let&apos;s work together on your next big idea
                    </p>
                    <div
                        className={`flex justify-between text-copy6 lg:text-copy5 border-b ${
                            solidFooter ? 'border-coconut' : 'border-primary'
                        } lg:mt-[10px] py-[12px] lg:py-[15px]`}
                    >
                        <p className="">Email</p>
                        <p className="w-[123px] lg:w-[135px]">
                            info@blueprint.vc
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex justify-between text-copy6 lg:text-copy5">
                        <p className="hidden lg:block lg:py-[25px]">Socials</p>
                        <div className="w-full lg:w-[383px]">
                            <div
                                className={`flex justify-between border-b ${
                                    solidFooter
                                        ? 'border-coconut'
                                        : 'border-primary'
                                }  py-[12px] lg:py-[15px] mt-4 lg:mt-[10px]`}
                            >
                                <p>Instagram</p>
                                <a href="" className="w-[123px] lg:w-[135px]">
                                    @blueprint.vc
                                </a>
                            </div>
                            <div
                                className={`flex justify-between border-b ${
                                    solidFooter
                                        ? 'border-coconut'
                                        : 'border-primary'
                                } py-[12px] lg:py-[15px] mt-4 lg:mt-[10px]`}
                            >
                                <p>LinkedIn</p>
                                <p className="w-[123px] lg:w-[135px]">
                                    blueprintventures
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Section */}
            <section className="flex flex-col-reverse lg:flex-row justify-start lg:justify-between items-center lg:items-end gap-5">
                {/* copyright text */}
                <div className="w-full lg:w-fit">
                    <span
                        className="font-secondary lg:text-copy6"
                        dangerouslySetInnerHTML={{
                            __html: renderHtmlString(
                                blok?.copyright_text ?? ''
                            ) as string,
                        }}
                    ></span>
                </div>

                {/* Big text logo */}
                <div className="h-fit w-fit">
                    {solidFooter ? (
                        <Image
                            src={CoconutLogo}
                            alt={'Coconut Logo'}
                            fill
                            className="!relative h-auto w-auto"
                        />
                    ) : (
                        <Image
                            src={blok?.secondary_logo?.filename}
                            alt={blok?.secondary_logo?.alt}
                            fill
                            className="!relative h-auto w-auto"
                        />
                    )}
                </div>
            </section>
        </section>
    )
}

export { FooterSecondary }
