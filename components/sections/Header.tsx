'use client'
/* Contains the React component for Header Section */
import Image from 'next/image'
import type {
    HeaderStoryblok,
    AssetStoryblok,
    HeaderDrawerStoryblok,
} from '@sb/types'

import { HeaderDrawer } from './HeaderDrawer'
import React, { useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import CoconutPrimaryLogo from '@/assets/coconut_logo.svg'
import CoconutPrimaryLogoSymbol from '@/assets/coconut_logo_symbol.svg'
import { storyblokEditable } from '@storyblok/react/rsc'

type Props = React.AllHTMLAttributes<Element>

interface HeaderProps extends Props {
    title?: string
    logo?: AssetStoryblok

    small_logo_icon?: any
    show_small_icon?: boolean

    mobile_logo?: any
    blok: HeaderStoryblok
    navbar?: HeaderStoryblok['navbar']
}

export const Header = ({
    title,
    logo,
    navbar,
    small_logo_icon,
    show_small_icon = true,
    mobile_logo,
    blok,
    ...props
}: HeaderProps) => {
    const navLinks = navbar ?? blok.navbar
    const isMobile = useMediaQuery('(max-width: 1023px)')
    const headerRef = React.useRef<HTMLDivElement>(null)

    const [solidHeader, setSolidHeader] = useState(false)

    /*
    React.useEffect(() => {
        const slug = location.pathname
        const mainHero = document.getElementById('main-hero-section')
        const MainHeroBottom = mainHero?.getBoundingClientRect().bottom ?? 0
        let scrollPosition = window.scrollY
        if (slug !== '/') {
            headerRef && headerRef.current?.classList.remove('fade-logo')
        }
        if (
            secondaryHeaderSlugs.filter((slugRegex) =>
                location.pathname.match(slugRegex)
            ).length > 0
        ) {
            setSolidHeader(true)
        }

        if (headerRef.current) {
            const header = headerRef.current
            if (slug !== '/') {
                header.classList.remove('fade-logo')
            }
            if (window.scrollY - MainHeroBottom <= 0 && slug === '/') {
                header.classList.add('fade-logo')
            } else if (window.scrollY > MainHeroBottom && slug === '/') {
                header.classList.remove('fade-logo')
            }

            const handleScroll = () => {
                if (window.scrollY - MainHeroBottom <= 0 && slug === '/') {
                    header.classList.add('fade-logo')
                } else if (window.scrollY > MainHeroBottom && slug === '/') {
                    header.classList.remove('fade-logo')
                }
                if (window.scrollY - MainHeroBottom <= 500) {
                    header.classList.remove('-translate-y-full')
                    return
                }
                if (slug === '/') {
                    header.classList.remove('fade-logo')
                }
                if (window.scrollY > scrollPosition) {
                    header.classList.add('-translate-y-full')
                } else {
                    header.classList.remove('-translate-y-full')
                }
                scrollPosition = window.scrollY
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    */

    return (
        <div
            ref={headerRef}
            className={`${
                solidHeader
                    ? 'bg-primary border-coconut text-coconut'
                    : ' bg-coconut border-primary text-primary fade-logo'
            } content-grid fixed h-[60px] left-0 top-0 transition-transform duration-300 border-b w-full py-3 lg:py-[18px]`}
            {...props}
        >
            <div className="flex w-full justify-between">
                {logo ? (
                    <div className="[section.fade-logo_&]:lg:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out">
                        <a
                            href="/"
                            aria-label="home"
                            className="hidden bg-none lg:flex gap-[14px]"
                        >
                            {/* Display small icon based on setting */}
                            {show_small_icon && (
                                <div className="h-6 w-7 my-auto">
                                    {solidHeader ? (
                                        <Image
                                            src={CoconutPrimaryLogoSymbol}
                                            alt="Coconut Logo"
                                            fill
                                            className="h-auto w-auto object-cover !relative"
                                        />
                                    ) : (
                                        <Image
                                            src={small_logo_icon?.filename}
                                            alt={small_logo_icon?.alt}
                                            fill
                                            className="h-auto w-auto object-cover !relative"
                                        />
                                    )}
                                </div>
                            )}

                            <div className="h-6 lg:block hidden relative w-[360px] my-auto">
                                {solidHeader ? (
                                    <Image
                                        src={CoconutPrimaryLogo}
                                        alt="Coconut Logo"
                                        fill
                                        className="h-auto w-auto object-cover !relative"
                                    />
                                ) : (
                                    <Image
                                        src={logo.filename!}
                                        alt={logo.alt!}
                                        fill
                                        className="h-auto w-auto object-cover"
                                    />
                                )}
                            </div>
                        </a>
                        <a
                            href="/"
                            aria-label="home"
                            className="flex bg-none lg:hidden relative w-[40px] aspect-[40/34] h-auto"
                        >
                            <Image
                                src={
                                    solidHeader
                                        ? CoconutPrimaryLogoSymbol
                                        : mobile_logo.filename
                                }
                                alt={blok.mobile_logo.alt!}
                                fill
                                className="h-auto w-auto object-cover"
                            />
                        </a>
                    </div>
                ) : (
                    <div>{title}</div>
                )}
                <div className="lg:flex hidden items-center gap-9">
                    {navLinks?.map((nestedBlok) => (
                        <div
                            key={nestedBlok._uid}
                            className="px-2 lg:px-0 xl:px-4 first:pl-0 last:pr-0 "
                        >
                            <a
                                href={nestedBlok.link.url}
                                className="lg:text-subheading3 h-fit font-secondary"
                                {...storyblokEditable(nestedBlok)}
                            >
                                {nestedBlok.Name}
                            </a>
                        </div>
                    ))}
                </div>

                {isMobile && <HeaderDrawer blok={blok} />}
            </div>
        </div>
    )
}
