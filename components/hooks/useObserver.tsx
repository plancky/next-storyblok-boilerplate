import { RefObject, useEffect, useState } from 'react'

const useObserver = (
    ref: RefObject<HTMLElement>,
    options: IntersectionObserverInit
) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const elementRef = ref.current
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
            if (entry.isIntersecting) {
                observer.disconnect()
            }
        }, options)

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (elementRef) {
                observer.unobserve(elementRef)
            }
        }
    }, [ref, options])

    return isVisible
}

export { useObserver }
