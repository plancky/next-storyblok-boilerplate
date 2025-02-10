import { fetchPortfolioItems } from '@/utils/fetchContent'
import PortfolioCarouselHelper from './PortfolioCarouselHelper'

const PortfolioCarousel = async ({
    blok,
}: {
    blok: any
}) => {
    const portfolioItems = await fetchPortfolioItems()
    return <PortfolioCarouselHelper blok={blok} items={portfolioItems} />
}

export { PortfolioCarousel }
