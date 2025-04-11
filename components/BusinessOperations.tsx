import { storyblokEditable } from '@storyblok/react/rsc'
import dynamic from 'next/dynamic'
const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
    ssr: false,
})
export function BusinessOperations({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="bg-primary">
            <div
                key={blok._uid}
                className="pt-10 lg:pt-20 content-grid text-coconut content-grid pb-20 lg:pb-[110px]"
            >
                {blok.heading && (
                    <h1 className="whitespace-pre-wrap lg:text-start text-center text-h5 lg:text-h2">
                        {blok.heading}
                    </h1>
                )}
                <div className="h-[650px] mt-20 lg:mt-0 full-width lg:breakout lg:px-[calc(22px-.2%)] xl:px-[calc(20px-.4%)] 2xl:px-[calc(20px-.7%)] lg:flex w-full lg:w-fit overflow-hidden lg:h-full relative aspect-square lg:aspect-auto">
                    {/*
                        <LottieAnimation
                            alt="Brand Diagram"
                            animationClass="justify-self-center lg:justify-self-end lottie-container h-[650px] w-[650px] lg:w-full lg:h-full aspect-square lg:aspect-auto"
                            AnimationData={BrandDiagram}
                            MobileAnimationData={MobileBrandDiagram}
                        />
                        */}
                </div>
            </div>
        </section>
    )
}
