'use client'
import { initStoryblokClient } from '@/utils/initStoryBlokClient'

/** 3. Initialize it as usual */
initStoryblokClient()

export default function StoryblokProviderClient({ children }) {
    return children
}
