import Sky from "./components/Sky.tsx"
import './style/main-content.css'


const BACKGROUND_SKY_TIME_MULTIPLIER = 2

function App() {

    return (
        <Sky layers={[
            {
                starsPer10000pxMin: 0,
                starsPer10000pxMax: 2,
                loopMilliseconds: 30000 * BACKGROUND_SKY_TIME_MULTIPLIER,
                starsRadius: 7
            },
            {
                starsPer10000pxMin: 2,
                starsPer10000pxMax: 3,
                loopMilliseconds: 75000 * BACKGROUND_SKY_TIME_MULTIPLIER,
                starsRadius: 5
            },
            {
                starsPer10000pxMin: 2,
                starsPer10000pxMax: 5,
                loopMilliseconds: 100000 * BACKGROUND_SKY_TIME_MULTIPLIER,
                starsRadius: 3
            },
            ]}>

            <div id={"main-content"} >
                {/*{Array(50).fill(<p>THIS IS A SCROLLABLE DIV</p>)}*/}
            </div>

        </Sky>
    )
}

export default App
