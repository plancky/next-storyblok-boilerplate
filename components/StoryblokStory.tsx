import { StoryblokComponent } from '@storyblok/react/rsc'

export function StoryblokStoryServer({
    story,
    ...props
}: {
    story: any
    [key: string]: any
}) {
    return <StoryblokComponent blok={story.content} {...props} />
}
