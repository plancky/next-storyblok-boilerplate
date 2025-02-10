import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'

export function Global({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="">
            {blok.global?.map((nestedBlok: any) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </section>
    )
}
