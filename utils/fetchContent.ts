import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc'
import { isProduction } from './helpers/production'

export const PAGES_FOLDER_ID = 'e2815488-fc40-4f47-b7bc-66aa887d2de3'
export const RELATIONS_TO_BE_RESOLVED = [
    'post.author',
    'global_reference.reference',
    'portfolio-items.reference',
]

export async function fetchPages() {
    return await fetchContent(``, !isProduction, { starts_with: 'pages' })
}

export async function fetchPosts() {
    return await fetchContent(``, !isProduction, {
        starts_with: 'blog/posts',
        sort_by: 'content.published_at:desc',
    })
}

export async function fetchPortfolioItems() {
    return await fetchContent(``, !isProduction, {
        starts_with: 'portfolio-items/',
    })
}

export async function fetchPostsTags() {
    return await fetchContent(`/tags`, !isProduction, {
        starts_with: 'blog/posts',
    })
}

export async function fetchPost(slug: string) {
    return await fetchContent(`blog/posts/${slug}`, !isProduction)
}

export async function fetchPage(slug: string) {
    return await fetchContent(`pages/${slug}`, !isProduction)
}

export async function fetchGlobal() {
    return await fetchContent(``, !isProduction, { starts_with: 'global' })
}

export async function fetchContent(
    slug: string,
    draft: boolean = true,
    options: ISbStoriesParams = {}
) {
    let sbParams: ISbStoriesParams
    sbParams = {
        version: draft || true ? 'draft' : 'published',
        resolve_relations: RELATIONS_TO_BE_RESOLVED,
        ...options,
    }

    /* Grabs the content delivery api from the initated storyblok client */
    const storyblokApi = getStoryblokApi()
    try {
        const { data } = await storyblokApi.get(
            slug.startsWith('/') ? `cdn${slug}` : `cdn/stories/${slug}`,
            sbParams,
            {
                cache: 'no-store',
            }
        )

        return { data }
    } catch (error) {
        console.error(error)
        return { error }
    }
}
