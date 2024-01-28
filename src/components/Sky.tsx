import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import '../style/sky.css';
import Rand from "rand-seed";
import {Pos} from "../geo/Pos";

const LAYOUTS_PER_SKY = 10

export interface SkyStarsLayerConfig {
    starsPer10000pxMin: number
    starsPer10000pxMax: number
    loopMilliseconds: number
    starsRadius: number
}

export interface SkyProps {
    children?: ReactNode | ReactNode[]
    layers: SkyStarsLayerConfig[]
}

interface StarsBar {
    stars: Pos[]
    starsRadius: number
    animationStartTime: number
}

export default function Sky({children, layers}: SkyProps) {
    return <div className={"sky"}>
        {layers.map((config, i) => <StarsLayer key={i} {...config}/>)}
        <div className="sky-children">{children}</div>
    </div>
}

function StarsLayer({starsPer10000pxMin, starsPer10000pxMax, loopMilliseconds, starsRadius}: SkyStarsLayerConfig) {
    const divRef = useRef<HTMLDivElement>(null)
    const [bars, setBars] = useState<StarsBar[]>([])

    useEffect(() => {
        const div = divRef.current!

        div.style.setProperty('--sky-loop-time', `${loopMilliseconds}ms`)

        const handleResize = () => {
            const {width, height} = div.getBoundingClientRect()
            const layouts_demi = LAYOUTS_PER_SKY / 2


            const barsCommonSeed = `${starsPer10000pxMin}-${starsPer10000pxMax}-${loopMilliseconds}-${starsRadius}`

            const totalWidth = width + (width / layouts_demi) * 1.5
            const totalHeight = height + (height / layouts_demi) * 1.5
            div.style.setProperty('--sky-direction-x', totalWidth + "px")
            div.style.setProperty('--sky-direction-y', -totalHeight + "px")
            const bars: StarsBar[] = []

            // horizontal bars
            for (let i = 0; i < layouts_demi; i++) {
                const layoutWidth = totalWidth
                const layoutHeight = (totalHeight / layouts_demi)
                const stars = generateRandomPositions(`${i}h-${barsCommonSeed}`, 0, totalHeight, layoutWidth, layoutHeight, starsPer10000pxMin, starsPer10000pxMax)
                bars.push({
                    stars,
                    animationStartTime: (loopMilliseconds / layouts_demi) * i,
                    starsRadius
                })
            }
            // vertical bars
            for (let i = 0; i < layouts_demi; i++) {
                const layoutWidth = (totalWidth / layouts_demi)
                const layoutHeight = totalHeight + (totalHeight / layouts_demi)
                const stars = generateRandomPositions(`${i}v-${barsCommonSeed}`, -layoutWidth, 0, layoutWidth, layoutHeight, starsPer10000pxMin, starsPer10000pxMax)
                bars.push({
                    stars,
                    animationStartTime: (loopMilliseconds / layouts_demi) * i,
                    starsRadius
                })
            }
            setBars(bars)
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(div)

        return () => observer.disconnect()
    }, [divRef, loopMilliseconds, starsPer10000pxMax, starsPer10000pxMin, starsRadius]);

    return (
        <div ref={divRef} className={"stars-layer"}>
            {
                bars.map((bar, i) => <StarsLayerBar
                    key={i}
                    bar={bar}
                />)
            }
        </div>
    )
}

function generateRandomPositions(seed: string, startX: number, startY: number, width: number, height: number, countPer10000pxMin: number, countPer10000pxMax: number): Pos[] {

    let stars: Pos[] = []

    //the amount of stars to generate
    const random = new Rand(seed)
    const amountOfStarsPer10000 = countPer10000pxMin + random.next() * (countPer10000pxMax - countPer10000pxMin)
    const amountOfStars = ((width * height) / 10000) * amountOfStarsPer10000


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
    bar: StarsBar,
}

function StarsLayerBar({
                           bar,
                       }: StarsLayoutProps) {

    const divRef = useRef<HTMLDivElement>(null)
    const boxShadow = useMemo(() =>
            bar.stars.map(({x, y}) => `${x}px ${y}px white`).join(','),
        [bar])

    useEffect(() => {
        divRef.current!.style.setProperty('--box-shadow', boxShadow)
    }, [boxShadow]);

    useEffect(() => {
        const div = divRef.current!
        const slide = div.getAnimations()[0]
        slide.currentTime = bar.animationStartTime
    }, [divRef, bar.animationStartTime]);


    return <div
        ref={divRef}
        style={{boxShadow, width: bar.starsRadius, height: bar.starsRadius}}
        className={"stars-layer-bar"}>
    </div>
}
