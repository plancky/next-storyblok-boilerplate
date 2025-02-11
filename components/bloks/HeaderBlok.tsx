import { storyblokEditable } from '@storyblok/react/rsc'

import { Header } from '@sections/Header'
import type { HeaderStoryblok } from '@sb/types'

type HeaderBlokProps = {
    blok: HeaderStoryblok
}

export function HeaderBlok({ blok }: HeaderBlokProps) {
    const {
        title,
        logo,
        small_logo_icon,
        show_small_icon,
        mobile_logo,
        drawer,
    } = blok

    const [{ links, copyright_text }, ...temp] = drawer
    return (
        <section {...storyblokEditable(blok)}>
            <Header
                title={title}
                logo={logo}
                small_logo_icon={small_logo_icon}
                show_small_icon={show_small_icon}
                mobile_logo={mobile_logo}
                header_drawer_props={{
                    links,
                    copyright_text,
                }}
            />
        </section>
    )
}
