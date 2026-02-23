import {useRef} from "react";
import {PresentationControls} from "@react-three/drei";
import MacbookModel16 from "../models/Macbook-16.jsx"
import MacbookModel14 from "../models/Macbook-14.jsx"
import gsap from "gsap"
import {useGSAP} from "@gsap/react";
import {Group, type Object3DEventMap} from "three";

const ANIMATION_DURATION = 1
const OFFSET_DISTANCE = 5

const fadeMeshes = (group:Group<Object3DEventMap>, opacity:number) => {
    if (!group) return;

    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: ANIMATION_DURATION});
        }
    })
}

const moveGroup = (group: Group<Object3DEventMap>, x: number) => {
    if (!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION})
}

const ModelSwitcher = ({scale, isMobile}: {scale: number, isMobile: boolean}) => {
    // isMobile ? scale - 0.03 : scale
    const SCALE_LARGE_DESKTOP = 0.08
    const SCALE_LARGE_MOBILE = 0.05
    const smallMacbookRef = useRef<any>(null)
    const largemacbookRef = useRef<any>(null)

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE

    useGSAP(() => {
       if (showLargeMacbook) {
           moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE)
           moveGroup(largemacbookRef.current, 0)

           fadeMeshes(smallMacbookRef.current, 0)
           fadeMeshes(largemacbookRef.current, 1)
       } else {
           moveGroup(smallMacbookRef.current, 0)
           moveGroup(largemacbookRef.current, OFFSET_DISTANCE)

           fadeMeshes(smallMacbookRef.current, 1)
           fadeMeshes(largemacbookRef.current, 0)
       }
    }, [scale])

    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        // polar: [-Math.PI, Math.PI] as [number, number],
        azimuth: [-Infinity, Infinity] as [number, number],
        config: {mass: 1, tension: 0, friction: 26}
    }

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largemacbookRef}>
                    <MacbookModel16
                        scale={isMobile ? 0.05 : 0.06}
                    />
                </group>
            </PresentationControls>
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14
                        scale={isMobile ? 0.04 : 0.05}
                    />
                </group>
            </PresentationControls>
        </>
    )
}
export default ModelSwitcher
