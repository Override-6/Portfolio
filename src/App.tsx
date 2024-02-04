import Sky from "./components/Sky.tsx"
import './style/main-content.css'
import Project from "./components/Project.tsx";


const BACKGROUND_SKY_TIME_MULTIPLIER = 2

function App() {

    return (
        <Sky layers={[
            {
                starsPer10000pxMin: 0,
                starsPer10000pxMax: 2,
                loopMilliseconds: 50000 * BACKGROUND_SKY_TIME_MULTIPLIER,
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

            <div id={"main"}>
                <header id={"content-header"}>
                    HEADER
                </header>
                <div id="content">
                    <div id="titles">
                        <h1>BATISTA Maxime's Portfolio</h1>
                        <h2>Lorem Ipsum.</h2>
                        <h3>Dolor sit amet</h3>
                    </div>
                    <div id="projects">
                        <Project/>
                    </div>
                </div>
            </div>

        </Sky>
    )
}

export default App
