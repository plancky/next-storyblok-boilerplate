'use client'
import { useEffect, useRef } from 'react'
import LottiePlayer, { type LottieRefCurrentProps } from 'lottie-react'
import { useMediaQuery } from './hooks/useMediaQuery'
const LottieAnimation = ({
    AnimationData,
    MobileAnimationData,
    alt,
    animationClass,
}: {
    AnimationData: any
    MobileAnimationData?: any
    alt: string
    animationClass: string
}) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    const isMobile = useMediaQuery('(max-width: 1023px)')

    useEffect(() => {
        if (lottieRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        lottieRef.current?.play()
                    } else {
                        lottieRef.current?.pause()
                    }
                },
                { threshold: 0.3 }
            )
            const animationContainer = lottieRef?.current?.animationContainerRef
                ?.current as Element
            observer.observe(animationContainer)

            return () => {
                observer.unobserve(animationContainer)
            }
        }
    }, [isMobile])

    return (
        <LottiePlayer
            lottieRef={lottieRef}
            animationData={
                MobileAnimationData && isMobile
                    ? MobileAnimationData
                    : AnimationData
            }
            loop={false}
            alt={alt}
            className={animationClass}
        />
    )
}

export default LottieAnimation
