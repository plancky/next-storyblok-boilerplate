import Image from 'next/image'
import type {
    HeaderStoryblok,
    AssetStoryblok,
    HeaderDrawerStoryblok,
} from '@sb/types'

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
import { useMediaQuery } from '../hooks/useMediaQuery'
import Hamburger from '../icons/IconHamburger'
import IconClose from '../icons/IconClose'
import { storyblokEditable } from '@storyblok/react/rsc'

export function HeaderDrawer({ blok }: { blok: HeaderStoryblok }) {
    const [open, setOpen] = React.useState(false)
    const drawerConfig = blok.drawer![0]

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
                                    src={blok?.mobile_logo?.filename!}
                                    alt={blok?.mobile_logo?.alt!}
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
                            {blok?.navbar?.map((navlink: any) => {
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
                        {drawerConfig?.links.map((linkBlok: any) => {
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
                            {drawerConfig?.copyright_text?.content.map(
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
