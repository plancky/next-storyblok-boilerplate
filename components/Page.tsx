import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'

const Page = ({ blok }: { blok: any }) => (
    <main {...storyblokEditable(blok)} className="">
        {blok.body?.map((nestedBlok: any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </main>
)

export { Page }
