// import React from 'react'

import useMacbookStore from "../store";
import {colorMacbook, scaleMacbook} from "../constants";
import clsx from "clsx";
import {Canvas} from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import MacbookModel14 from "./models/Macbook-14.jsx"
import StudioLights from "./StudioLights.tsx";

const ProductViewer = () => {
    const {color, scale, setColor, setScale} = useMacbookStore()

    return (
        <section id="product-viewer">
            <h2>Take a closer look.</h2>

            <div className="controls">
                <p className="info">MacbookPro {scale} in {color}</p>

                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div
                            onClick={() => setColor(colorMacbook.gray)}
                            className={clsx('bg-neutral-300', color === colorMacbook.gray && "active")}
                        />
                        <div
                            onClick={() => setColor(colorMacbook.black)}
                            className={clsx('bg-neutral-900', color === colorMacbook.black && "active")}
                        />
                    </div>

                    <div className="size-control">
                        <div
                            onClick={() => setScale(scaleMacbook.fourteen)}
                            className={clsx(scale === scaleMacbook.fourteen ? "bg-white text-black" : "bg-transparent text-white")}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            onClick={() => setScale(scaleMacbook.sixteen)}
                            className={clsx(scale === scaleMacbook.sixteen ? "bg-white text-black" : "bg-transparent text-white")}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>

            <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100  }}>
                <StudioLights />
                <MacbookModel14 scale ={0.06} position={[0,0,0]} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </section>
    )
}
export default ProductViewer
