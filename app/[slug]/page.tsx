import { fetchPage, fetchPages } from '@/utils/fetchContent'
import { StoryblokStoryElement, isProduction } from '@/utils/helpers/production'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export { dynamic } from '@/utils/helpers/production'

const exceptions = ['404', 'blog']

type Props = {
    params: { slug: string }
}

function titleCase(word: string) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

const descriptionMap: { [key: string]: string } = {
    team: 'Uncommon people with a singular vision. Creating the change we want to see while having fun!',
    portfolio:
        'We invest in the disruptors and game-changers that consumers love, want to share with their friends and tell the world about. We are an early-stage, consumer-driven Venture Capital Fund based in Singapore. We invest across Southeast Asia, between Pre-seed and Pre-Series A.',
    perspectives:
        'Get our perspective and insights on industry trends, investment theses, portfolio updates and more!',
    approach: '',
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const slug = params.slug

    return {
        title: `${titleCase(slug)} | Blueprint Ventures`,
        description: descriptionMap[slug] || '',
    }
}

async function productionStaticParams() {
    const { data, error } = await fetchPages()
    if (error) return { props: { slug: [] } }
    return data.stories?.map((story: any) => ({ slug: story.slug }))
}

export const generateStaticParams = isProduction
    ? productionStaticParams
    : undefined

export default async function Page({ params }: { params: { slug: string } }) {
    if (exceptions.includes(params.slug)) redirect(`/${params.slug}`)
    const { data, error } = await fetchPage(params.slug)
    if (error) redirect('/404')

    return (
        <>
            <StoryblokStoryElement story={data.story} />
        </>
    )
}
