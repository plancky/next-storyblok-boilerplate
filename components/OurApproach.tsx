'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'
import { useMediaQuery } from './hooks/useMediaQuery'
import Image from 'next/image'

const OurApproach = ({ blok }: { blok: any }) => {
    const isMobile = useMediaQuery('(max-width: 1023px)')

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
            id={'our-core-beliefs'}
            className="content-grid pt-[--mobile-top-spacing] bg-[--bg-color] text-[--fg-color] pb-[--mobile-bottom-spacing] lg:pt-[--top-spacing] lg:pb-[--bottom-spacing] md:pt-[--mobile-top-spacing] md:pb-[--mobile-bottom-spacing]"
        >
            <div
                data-anime-target=".accordion-item"
                className="flex anime lg:flex-row flex-col w-full justify-between gap-16 lg:gap-36"
            >
                <div className="h-full flex lg:flex-col flex-row justify-between lg:basis-[35%] basis-full">
                    {blok.heading && (
                        <h1 className="lg:whitespace-pre w-full text-h5 lg:text-h2">
                            {blok.heading}
                        </h1>
                    )}
                    {blok.image && (
                        <div className="w-[43px] aspect-[43/33] lg:w-[325px] relative lg:aspect-[325/191] h-auto">
                            <Image
                                src={blok.image.filename}
                                alt={blok.image.alt}
                                fill
                            />
                        </div>
                    )}
                </div>

                {isMobile ? (
                    <ApproachAccordion blok={blok} accordion={blok.accordion} />
                ) : (
                    <div className="basis-[65%]">
                        {blok.accordion.map((accordion: any, index: number) => {
                            return (
                                <div
                                    className="w-full accordion-item [div.anime_&]:opacity-0 [div.anime_&]:translate-y-[40%]"
                                    key={accordion._uid}
                                >
                                    <div className="flex items-start justify-between gap-14">
                                        <p className="text-h1 min-w-10">
                                            {index + 1}
                                        </p>

                                        <div className="flex gap-6 flex-col">
                                            <h4 className="text-h4">
                                                {accordion.title}
                                            </h4>
                                            <p className="text-copy3 leading-[1.15]">
                                                {accordion.content}
                                            </p>
                                        </div>
                                    </div>
                                    {index < blok.accordion.length - 1 && (
                                        <div className="border-t-[0.5px] border-[--fg-color] w-full my-[60px]" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

const ApproachAccordion = ({
    accordion,
    blok,
}: {
    accordion: any
    blok: any
}) => {
    return (
        <Accordion type="single" collapsible>
            {accordion.map((item: any, index: number) => {
                return (
                    <AccordionItem
                        key={item._uid}
                        value={item.title}
                        className={`w-full ${
                            blok.hide_last_border ? 'last:border-b-0' : ''
                        } first:border-t border-[--fg-color]`}
                    >
                        <AccordionTrigger className="py-[30px] bg-none">
                            <div
                                className={`flex text-h7 font-primary lg:font-demi tracking-[0.07em] w-full gap-4 justify-start`}
                            >
                                <p>{index + 1}</p>
                                <p className="text-start">{item.title}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent
                            className={`${
                                blok.content_padding ? 'px-[30px]' : ''
                            } text-copy6`}
                        >
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export { OurApproach }
