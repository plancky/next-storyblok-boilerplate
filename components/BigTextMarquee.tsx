import {
    storyblokEditable,
} from '@storyblok/react/rsc'

const BigTextMarquee = ({ blok }: { blok: any }) => {
    return (
        <section
            {...storyblokEditable(blok)}
            className="h-fit bg-primary space-y-5 lg:space-y-10 py-5 lg:py-10"
        >
            {blok.marquee_blocks.map((item: any, index: number) => {
                return (
                    <div key={item._uid} className="marquee">
                        <ul
                            className={
                                ((index + 1) % 2 == 0
                                    ? '!direction-reverse'
                                    : 'direction-normal') +
                                ' marquee__content text-coconut uppercase'
                            }
                        >
                            <li className="text-bigmarquee2 lg:text-bigmarquee">
                                {item.marquee_text}
                            </li>
                        </ul>
                        <ul
                            className={
                                ((index + 1) % 2 == 0
                                    ? '!direction-reverse'
                                    : 'direction-normal') +
                                ' marquee__content text-coconut uppercase'
                            }
                        >
                            <li className="text-bigmarquee2 lg:text-bigmarquee">
                                {item.marquee_text}
                            </li>
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}

export { BigTextMarquee }
