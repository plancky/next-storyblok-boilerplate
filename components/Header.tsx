'use client'
import { storyblokEditable } from '@storyblok/react/rsc'

import Image from 'next/image'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import React, { useState } from 'react'
import { useMediaQuery } from './hooks/useMediaQuery'
import Hamburger from './icons/IconHamburger'
import IconClose from './icons/IconClose'
import CoconutPrimaryLogo from '@/assets/coconut_logo.svg'
import CoconutPrimaryLogoSymbol from '@/assets/coconut_logo_symbol.svg'

const secondaryHeaderSlugs = ['^/blog/']
const Header = ({ blok }: { blok: any }) => {
    const navbarBloks = blok.navbar
    const isMobile = useMediaQuery('(max-width: 1023px)')
    const headerRef = React.useRef<HTMLDivElement>(null)

    const [solidHeader, setSolidHeader] = useState(false)

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

    return (
        <section
            {...storyblokEditable(blok)}
            ref={headerRef}
            className={`${
                solidHeader
                    ? 'bg-primary border-coconut text-coconut'
                    : ' bg-coconut border-primary text-primary fade-logo'
            } content-grid fixed h-[60px] left-0 top-0 transition-transform duration-300 border-b w-full py-3 lg:py-[18px]`}
        >
            <div className="flex w-full justify-between">
                {blok.logo ? (
                    <div className="[section.fade-logo_&]:lg:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out">
                        <a
                            href="/"
                            aria-label="home"
                            className="hidden bg-none lg:flex gap-[14px]"
                        >
                            {/* Display small icon based on setting */}
                            {blok?.show_icon_logo && (
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
                                            src={blok?.icon_logo?.filename}
                                            alt={blok?.icon_logo?.alt}
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
                                        src={blok.logo.filename}
                                        alt={blok.logo.alt}
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
                                        : blok.mobile_logo.filename
                                }
                                alt={blok.mobile_logo.alt}
                                fill
                                className="h-auto w-auto object-cover"
                            />
                        </a>
                    </div>
                ) : (
                    <div>{blok.title}</div>
                )}
                <div className="lg:flex hidden items-center gap-9">
                    {navbarBloks.map((nestedBlok: any) => (
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
        </section>
    )
}

const HeaderDrawer = ({ blok }: { blok: any }) => {
    const [open, setOpen] = React.useState(false)
    const drawerConfig = blok.drawer[0]

    return (
        <Drawer
            disablePreventScroll
            noBodyStyles
            open={open}
            fixed
            direction="left"
            onOpenChange={setOpen}
        >
            <DrawerTrigger
                className="!outline-none active:outline-none"
                aria-label="hamburger"
            >
                <Hamburger height="34" />
            </DrawerTrigger>

            <DrawerContent className="h-full w-full">
                <DrawerHeader>
                    <DrawerTitle className="py-3 px-5 border-b border-primary">
                        <div className="w-full flex justify-between">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex bg-none lg:hidden relative w-[40px] aspect-[40/34] h-auto"
                            >
                                <Image
                                    src={blok.mobile_logo.filename}
                                    alt={blok.mobile_logo.alt}
                                    fill
                                    className="h-auto w-auto object-cover"
                                />
                            </a>
                            <DrawerClose>
                                <IconClose height="34" />
                            </DrawerClose>
                        </div>
                    </DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col h-full py-10 w-full justify-between">
                    <section className="flex-shrink flex flex-col justify-between w-full">
                        <div className="flex flex-col">
                            {blok.navbar.map((navlink: any) => {
                                return (
                                    <a
                                        href={navlink.link.url}
                                        key={navlink._uid}
                                        className="text-h7 block font-demi group cursor-pointer w-full bg-none py-[clamp(25px,6%,35px)] text-center border-b last:border-b-0 border-primary"
                                        {...storyblokEditable(navlink)}
                                    >
                                        <p className="group-hover:bg-[0_100%] animated-underline group-hover:bg-[length:100%_1px] w-fit mx-auto [&_svg]:transition-transform [&_svg]:duration-300">
                                            {navlink.Name}
                                        </p>
                                    </a>
                                )
                            })}
                        </div>
                    </section>

                    <DrawerFooter className="flex flex-col mt-0 justify-center items-center text-center gap-5">
                        {drawerConfig.links.map((linkBlok: any) => {
                            return (
                                <a
                                    href={linkBlok.link.url}
                                    key={linkBlok._uid}
                                    target={
                                        linkBlok.open_in_new_tab
                                            ? '_blank'
                                            : '_self'
                                    }
                                    className="text-subheading3 h-fit"
                                    {...storyblokEditable(linkBlok)}
                                >
                                    {linkBlok.Name}
                                </a>
                            )
                        })}
                        <span className="text-primary font-secondary prose max-w-full [&_p]:mb-5 text-center w-1/2 lg:pb-0 text-subheading3 text-wrap">
                            {drawerConfig.copyright_text.content.map(
                                (contentEntry: any, index: number) => {
                                    return contentEntry.content.map(
                                        (entry: any) => {
                                            return (
                                                <span key={index}>
                                                    {entry.text}
                                                </span>
                                            )
                                        }
                                    )
                                }
                            )}
                        </span>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export { Header }
