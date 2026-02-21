import {create, type StoreApi, type UseBoundStore} from "zustand";
import {colorMacbook, scaleMacbook} from "../constants";

const basedColor = colorMacbook.black
const basedScale = scaleMacbook.sixteen

interface MacbookStore {
    color: string,
    scale: number,
    setColor: (color: string) => void,
    setScale: (scale: number) => void
}

const useMacbookStore: UseBoundStore<StoreApi<MacbookStore>> = create((set) => ({
    color: basedColor,
    setColor: (color: string) => set({color}),

    scale: basedScale,
    setScale: (scale: number) => set({scale}),

    reset: () => set({color: basedColor, scale: basedScale}),
}))

export default useMacbookStore;