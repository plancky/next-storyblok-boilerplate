'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import { FooterSecondary } from './FooterSecondary'
import { richTextResolver } from '@storyblok/richtext'
import React from 'react'
import { useEffect, useState } from 'react'
import CoconutLogo from '@/assets/footer coconut logo.svg'
import DesktopCoconutLogo from '@/assets/coconut footer logo.svg'

const { render: renderHtmlString } = richTextResolver()
const secondaryFooterSlugs = ['/portfolio']
const Footer = ({ blok }: { blok: any }) => {
    const navbarBloks = blok.navbar
    const [solidFooter, setSolidFooter] = useState(false)

    useEffect(() => {
        if (
            secondaryFooterSlugs.filter((slugRegex) =>
                location.pathname.match(slugRegex)
            ).length > 0
        ) {
            setSolidFooter(true)
        }
    }, [])

    return (
        <>
            {blok?.secondary_variant ? (
                <FooterSecondary solidFooter={solidFooter} blok={blok} />
            ) : (
                <section
                    {...storyblokEditable(blok)}
                    className={`${
                        solidFooter
                            ? 'bg-primary border-coconut text-coconut'
                            : 'bg-coconut text-primary border-primary'
                    } content-grid border-t`}
                >
                    <div className="grid lg:grid-cols-[1fr_1fr_.5fr] xl:grid-cols-3 gap-5 lg:gap-0 grid-rows-auto grid-cols-1 place-items-center pt-16 lg:py-[18px]">
                        {blok.logo ? (
                            <>
                                <div className="h-6 lg:block justify-self-start hidden relative w-[400px]">
                                    {solidFooter ? (
                                        <Image
                                            src={DesktopCoconutLogo}
                                            alt="Footer Logo"
                                            fill
                                            className="h-auto w-auto object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={blok.logo.filename}
                                            alt={blok.logo.alt}
                                            fill
                                            className="h-auto w-auto object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex lg:hidden relative w-[176px] aspect-[176/120] h-auto">
                                    {solidFooter ? (
                                        <Image
                                            src={CoconutLogo}
                                            alt={'Coconut Logo'}
                                            fill
                                            className="h-auto w-auto object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={blok.mobile_logo.filename}
                                            alt={blok.mobile_logo.alt}
                                            fill
                                            className="h-auto w-auto object-cover"
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>{blok.title}</div>
                        )}
                        <div className="flex lg:flex-row flex-col justify-center items-center lg:pt-0 pt-[60px] gap-5 text-center lg:gap-2 xl:gap-10">
                            {navbarBloks.map((nestedBlok: any) => (
                                <a
                                    href={nestedBlok.link.url}
                                    key={nestedBlok._uid}
                                    target={
                                        nestedBlok.open_in_new_tab
                                            ? '_blank'
                                            : '_self'
                                    }
                                    className="text-subheading3 h-fit w-fit font-secondary"
                                    {...storyblokEditable(nestedBlok)}
                                >
                                    {nestedBlok.Name}
                                </a>
                            ))}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: renderHtmlString(
                                    blok.copyright_text
                                ) as string,
                            }}
                            className="[&_p]:mt-5 [&_div]:text-wrap [&_div]:2xl:text-nowrap [&_p:first-child]:!mt-0 [&_p]:last:mb-0 [&_p]:lg:mt-0 lg:hidden font-secondary flex-shrink lg:justify-end flex flex-col lg:flex-row max-w-full pb-[60px] w-1/2 lg:w-full text-center lg:pb-0 text-subheading3"
                        ></div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: renderHtmlString(
                                    blok.copyright_text
                                ) as string,
                            }}
                            className="text-end [&_div]:flex [&_div]:text-wrap [&_div]:2xl:text-nowrap [&_div]:flex-col [&_div]:2xl:flex-row whitespace-pre justify-self-end lg:block hidden font-secondary text-subheading3"
                        ></div>
                    </div>
                </section>
            )}
        </>
    )
}

export { Footer }
