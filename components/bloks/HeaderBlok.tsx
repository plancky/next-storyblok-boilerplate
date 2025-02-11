import { storyblokEditable } from '@storyblok/react/rsc'

import { Header } from '@sections/Header'
import type { HeaderStoryblok } from '@sb/types'

type HeaderBlokProps = {
    blok: HeaderStoryblok
}

export function HeaderBlok({ blok }: HeaderBlokProps) {
    const { title, logo, show_icon_logo, icon_logo, mobile_logo, drawer } = blok

    const [{ links, copyright_text }, ...temp] = drawer
    return (
        <section {...storyblokEditable(blok)}>
            <Header
                title={title}
                logos={{ logo, show_icon_logo, icon_logo, mobile_logo }}
                header_drawer_props={{
                    links,
                    copyright_text,
                }}
            />
        </section>
    )
}
