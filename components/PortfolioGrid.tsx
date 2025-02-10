import { fetchPortfolioItems } from '@/utils/fetchContent'
import PortfolioGridHelper from './PortfolioGridHelper'

const PortfolioGrid = async ({ blok }: { blok: any }) => {
    const portfolioItems = await fetchPortfolioItems()

    return <PortfolioGridHelper blok={blok} items={portfolioItems} />
}

export { PortfolioGrid }
