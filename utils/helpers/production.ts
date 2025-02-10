import StoryblokProvider from '@/components/StoryblokProvider'
import { StoryblokStoryServer } from '@/components/StoryblokStory'
import StoryblokStory from '@storyblok/react/story'

/**
 * isProduction flag used to decide whether to use production or development configuration
 */
export const isProduction =
    process.env.NODE_ENV === 'production' &&
    (process?.env?.VERCEL_ENV ? process.env.VERCEL_ENV != 'preview' : true)

/** value for dynamic: route segment config https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic */
export const dynamic = isProduction ? 'force-static' : 'force-dynamic'

/**
 * Storyblok data version
 *
 */
export const DATA_VERSION = isProduction ? 'published' : 'draft'

/**
 * StoryblokStory used to render the content-type Storyblok bloks as react Elements.
 * */
export const StoryblokStoryElement = isProduction
    ? StoryblokStoryServer
    : StoryblokStory

/** StoryblokProvider */
export const UniversalStoryblokProvider = isProduction
    ? ({ children }: { children: React.ReactNode }) => {
          return children
      }
    : StoryblokProvider
