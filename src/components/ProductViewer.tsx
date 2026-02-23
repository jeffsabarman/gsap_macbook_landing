// import React from 'react'

import useMacbookStore from "../store";
import {colorMacbook, scaleMacbook} from "../constants";
import clsx from "clsx";
import {Canvas} from "@react-three/fiber";
import StudioLights from "./three/StudioLights.tsx";
import ModelSwitcher from "./three/ModelSwitcher.tsx"
import {useMediaQuery} from "react-responsive";

const ProductViewer = () => {
    const {color, scale, setColor, setScale} = useMacbookStore()

    const isMobile = useMediaQuery({query: "(max-width: 1024px)"});

    return (
        <section id="product-viewer">
            <h2>Take a closer look.</h2>

            <div className="controls">
                <p className="info">Macbook Pro | Available in 14" & 16" in Space Gray & Dark colors</p>

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
                <ModelSwitcher scale={scale} isMobile={isMobile}  />
            </Canvas>
        </section>
    )
}
export default ProductViewer
