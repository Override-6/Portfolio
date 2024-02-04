import {Canvas} from "@react-three/fiber";
import Planet from "./Planet.tsx";
import "../style/project.css"

export default function Project() {
    return <div className="project">
        <Canvas>
            <ambientLight intensity={Math.PI / 6}/>
            <spotLight position={[-20, 20, 20]} angle={Math.PI} penumbra={1} decay={0} intensity={Math.PI}/>
            <Planet/>
        </Canvas>
    </div>
}