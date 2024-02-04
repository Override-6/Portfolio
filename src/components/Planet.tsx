import '@react-three/fiber'
import {useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {Mesh, TextureLoader} from "three";
import moshellTexture from "../assets/moshell_2.png";

export default function Planet() {
    const meshRef = useRef<Mesh>()
    const [isHover, setHover] = useState(false)

    const texture = useLoader(TextureLoader, moshellTexture)
    texture.repeat.set(2, 1)

    

    return (
        <mesh ref={meshRef}
              scale={isHover ? 1.05 : 1}
              rotation={[0, 0, 0]}
              position={[0, 0, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
        >
            <sphereGeometry args={[2.5, 20, 20]}/>
            <meshStandardMaterial color={"red"}/>
            <meshPhongMaterial color={"white"} transparent map={texture}/>
        </mesh>)
}