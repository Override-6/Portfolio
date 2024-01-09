import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import '../style/sky.css'
import Rand from "rand-seed";
import {Pos} from "../geo/Pos";

const LAYOUTS_PER_SKY = 10
const SKY_LOOP_MILLISECONDS = 10000

export interface SkyProps {
    children?: ReactNode | ReactNode[]
}

interface StarLayout {
    stars: Pos[]
    animationStartTime: number

}

export default function Sky({children}: SkyProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const [starsLayouts, setStarsLayouts] = useState<StarLayout[]>([])

    useEffect(() => {
        const div = divRef.current!

        div.style.setProperty('--sky-loop-time', `${SKY_LOOP_MILLISECONDS}ms`)

        const handleResize = () => {
            const {width, height} = div.getBoundingClientRect()
            div.style.setProperty('--sky-direction-x', width + "px")
            div.style.setProperty('--sky-direction-y', -height + "px")
            const layouts: StarLayout[] = []

            // horizontal bars
            const layouts_demi = LAYOUTS_PER_SKY / 2
            for (let i = 0; i < layouts_demi; i++) {
                const layoutWidth = width
                const layoutHeight = (height / layouts_demi)
                const stars = generateRandomPositions(`${i}h`, 0, height, layoutWidth, layoutHeight, 2, 4)
                layouts.push({
                    stars,
                    animationStartTime: (SKY_LOOP_MILLISECONDS / layouts_demi) * i
                })
            }
            // vertical bars
            for (let i = 0; i < layouts_demi; i++) {
                const layoutWidth = (width / layouts_demi)
                const layoutHeight = height
                const stars = generateRandomPositions(`${i}v`, -layoutWidth, (height / layouts_demi), layoutWidth, layoutHeight, 2, 4)
                layouts.push({
                    stars,
                    animationStartTime: (SKY_LOOP_MILLISECONDS / layouts_demi) * i
                })
            }
            setStarsLayouts(layouts)
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(div)

        return () => observer.disconnect()
    }, [divRef]);

    return (
        <div ref={divRef} className={"sky"}>
            {
                starsLayouts.map((layout, i) => <StarsLayout
                    key={i}
                    layout={layout}
                    starsRadius={3}
                />)
            }

            <div className={"sky-children"}>
                {children}
            </div>
        </div>
    )
}

function generateRandomPositions(seed: string, startX: number, startY: number, width: number, height: number, countPer10000pxMin: number, countPer10000pxMax: number) {

    let stars: Pos[] = []

    //the amount of stars to generate
    const random = new Rand(seed)
    const amountOfStarsPer10000 = countPer10000pxMin + random.next() * (countPer10000pxMax - countPer10000pxMin)
    const amountOfStars = (width * height) / 10000 * amountOfStarsPer10000


    for (let i = 0; i < amountOfStars; i++) {
        // generate random coordinates between x, y, xMax and yMax
        const starX = startX + random.next() * width
        const starY = startY + random.next() * height

        stars = [...stars, {
            x: starX,
            y: starY
        }]
    }

    console.log(stars.length + " stars generated")

    return stars
}


interface StarsLayoutProps {
    layout: StarLayout,
    starsRadius: number
}

function StarsLayout({
                         layout,
                         starsRadius,
                     }: StarsLayoutProps) {

    const divRef = useRef<HTMLDivElement>(null)
    const boxShadow = useMemo(() =>
            layout.stars.map(({x, y}) => `${x}px ${y}px white`).join(','),
        [layout])

    useEffect(() => {
        divRef.current!.style.setProperty('--box-shadow', boxShadow)
    }, [boxShadow]);

    useEffect(() => {
        const div = divRef.current!
        const slide = div.getAnimations()[0]
        console.log(layout.animationStartTime)
        slide.currentTime = layout.animationStartTime
    }, [divRef, layout.animationStartTime]);

    return <div
        ref={divRef}
        style={{boxShadow, width: starsRadius, height: starsRadius}}
        className={"stars-layout"}>
    </div>
}
