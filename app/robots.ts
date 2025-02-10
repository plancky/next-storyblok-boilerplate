import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'dotbot',
                crawlDelay: 10,
            },
            {
                userAgent: 'AhrefsBot',
                crawlDelay: 10,
            },
        ],
        sitemap: 'https://www.blueprint.vc/sitemap.xml',
    }
}