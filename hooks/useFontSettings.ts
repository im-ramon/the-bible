import { usePersistedState } from "./usePersistedState";

export type FontSettings = {
    size: number;
    weight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
};

const DEFAULT_FONT_SETTINGS: FontSettings = {
    size: 20,
    weight: "bold",
};

export function useFontSettings() {
    const [size, setSize] = usePersistedState("font_size", String(DEFAULT_FONT_SETTINGS.size));
    const [weight, setWeight] = usePersistedState("font_weight", DEFAULT_FONT_SETTINGS.weight);

    return {
        fontSettings: {
            size: Number(size),
            weight: weight as FontSettings["weight"],
        },
        setSize: (val: number) => setSize(String(val)),
        setWeight: (val: FontSettings["weight"]) => setWeight(val),
    };
}