'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import React from 'react'

const ZigzagApproach = ({ blok }: { blok: any }) => {
    return (
        <section
            {...storyblokEditable(blok)}
            style={
                {
                    '--top-spacing': `${blok.top_spacing}px`,
                    '--bottom-spacing': `${blok.bottom_spacing}px`,
                    '--mobile-top-spacing': `${blok.mobile_top_spacing}px`,
                    '--mobile-bottom-spacing': `${blok.mobile_bottom_spacing}px`,
                    '--bg-color': blok.background_color,
                    '--fg-color': blok.foreground_color,
                } as React.CSSProperties
            }
            className="content-grid pt-[--mobile-top-spacing] bg-[--bg-color] text-[--fg-color] pb-[--mobile-bottom-spacing] lg:pt-[--top-spacing] lg:pb-[--bottom-spacing] md:pt-[--mobile-top-spacing] md:pb-[--mobile-bottom-spacing]"
        >
            <div className="flex anime flex-col w-full justify-between gap-[60px] lg:gap-[110px]">
                <div className="h-full flex lg:flex-col flex-row justify-between lg:basis-[35%] basis-full">
                    {blok.heading && (
                        <h1 className="lg:whitespace-pre w-full text-h5 lg:text-h2">
                            {blok.heading}
                        </h1>
                    )}
                </div>

                <div className="space-y-[30px] lg:space-y-[84px]">
                    {blok.accordion.map((accordion: any, index: number) => {
                        return (
                            <div
                                key={accordion._uid}
                                data-anime-target={`.accordion-item-${index}`}
                                className="anime"
                            >
                                <div
                                    className={`${
                                        index % 2 === 0
                                            ? 'lg:justify-end'
                                            : 'lg:justify-start'
                                    } w-full accordion-item-${index} flex accordion-item [div.anime_&]:opacity-0 [div.anime_&]:translate-y-[40%]`}
                                >
                                    <div
                                        className={`flex ${
                                            index % 2 === 0
                                                ? 'lg:pl-3'
                                                : 'lg:pr-5'
                                        } lg:w-1/2 max-w-[780px] w-full`}
                                    >
                                        <div
                                            className={`flex ${
                                                index % 2 === 0
                                                    ? 'lg:items-end'
                                                    : 'lg:items-start'
                                            } gap-6 flex-col items-start`}
                                        >
                                            <h4 className="text-h7 lg:whitespace-normal whitespace-pre w-fit lg:w-full lg:text-h4 font-demi">
                                                {accordion.title}
                                            </h4>
                                            <p className="text-copy6 lg:text-copy3">
                                                {accordion.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export { ZigzagApproach }
