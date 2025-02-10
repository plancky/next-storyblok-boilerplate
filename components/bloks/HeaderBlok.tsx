import { storyblokEditable } from '@storyblok/react/rsc'

import { Header } from '@sections/Header'

type HeaderBlokProps = {
    blok: any
}

export function HeaderBlok({ blok }: HeaderBlokProps) {
    return (
        <section {...storyblokEditable(blok)}>
            <Header title={'Sozo'} logo={'logo'} navbar={[]} />
        </section>
    )
}
