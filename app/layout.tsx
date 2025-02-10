import './globals.css'
import { initStoryblokClient } from '@/utils/initStoryBlokClient'
import { fetchGlobal } from '@/utils/fetchContent'
import {
    StoryblokStoryElement,
    UniversalStoryblokProvider,
} from '@/utils/helpers/production'
import { AnimeJsWrapper } from '@/components/AnimeJsWrapper'

// Initiate Storyblok JS SDK for api client conf and react component regestering
initStoryblokClient()

export { dynamic } from '@/utils/helpers/production'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {
        data: { stories: globalStories },
    } = await fetchGlobal()

    if (!globalStories) return null
    const headerGroup = globalStories?.find(
        (story: any) => story.slug === 'header-group'
    )
    const footerGroup = globalStories?.find(
        (story: any) => story.slug === 'footer-group'
    )

    return (
        <html lang="en" className="[&_main]:mt-[60px]">
            <link rel="icon" href="/public/blueprint icon.jpg" sizes="any" />
            <UniversalStoryblokProvider>
                <body className="font-primary bg-coconut text-primary">
                    <div className="grid relative min-h-screen grid-rows-[auto_1fr_auto] grid-cols-1">
                        {headerGroup && (
                            <header className="relative row-span-1 row-start-1 z-[50] w-full">
                                <StoryblokStoryElement story={headerGroup} />
                            </header>
                        )}
                        <AnimeJsWrapper />
                        {children}
                        {footerGroup && (
                            <footer className="z-[50]">
                                <StoryblokStoryElement story={footerGroup} />
                            </footer>
                        )}
                    </div>
                </body>
            </UniversalStoryblokProvider>
        </html>
    )
}
