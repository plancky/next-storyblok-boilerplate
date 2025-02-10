'use client'
import anime from 'animejs'
import React from 'react'
import { useEffect } from 'react'
const AnimeJsWrapper = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entires) => {
                entires.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const animeSelector =
                            entry.target.getAttribute('data-anime-target') || ''
                        if (!animeSelector) return
                        const initialY =
                            entry.target.getAttribute('data-y') || '40%'
                        const initialOpacity =
                            entry.target.getAttribute('data-opacity') || 0
                        const stagger =
                            entry.target.getAttribute('data-stagger') || 150
                        anime({
                            targets:
                                entry.target.querySelectorAll(animeSelector),
                            translateY: [initialY, '0%'],
                            opacity: [initialOpacity, 1],
                            duration: 1000,
                            delay: anime.stagger(stagger),
                            easing: 'cubicBezier(.17, .17, 0, 1)',
                        })

                        entry.target.classList.remove('anime')

                        observer.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.2,
            }
        )

        document.querySelectorAll('.anime').forEach((el) => {
            observer.observe(el)
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    return <></>
}

export { AnimeJsWrapper }
