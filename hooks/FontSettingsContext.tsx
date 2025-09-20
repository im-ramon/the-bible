import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type FontSettings = {
  size: number;
  weight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
};

const DEFAULT_FONT_SETTINGS: FontSettings = {
  size: 18,
  weight: "400",
};

type FontSettingsContextType = {
  fontSettings: FontSettings;
  setFontSettings: (settings: FontSettings) => void;
};

const FontSettingsContext = createContext<FontSettingsContextType | undefined>(undefined);

export function FontSettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontSettings, setFontSettingsState] = useState<FontSettings>(DEFAULT_FONT_SETTINGS);

  useEffect(() => {
    (async () => {
      const size = await AsyncStorage.getItem("font_size");
      const weight = await AsyncStorage.getItem("font_weight");
      setFontSettingsState({
        size: size ? Number(size) : DEFAULT_FONT_SETTINGS.size,
        weight: (weight as FontSettings["weight"]) || DEFAULT_FONT_SETTINGS.weight,
      });
    })();
  }, []);

  const setFontSettings = async (settings: FontSettings) => {
    setFontSettingsState(settings);
    await AsyncStorage.setItem("font_size", String(settings.size));
    await AsyncStorage.setItem("font_weight", settings.weight);
  };

  return (
    <FontSettingsContext.Provider value={{ fontSettings, setFontSettings }}>
      {children}
    </FontSettingsContext.Provider>
  );
}

export function useFontSettingsContext() {
  const ctx = useContext(FontSettingsContext);
  if (!ctx) throw new Error("useFontSettingsContext must be used within FontSettingsProvider");
  return ctx;
}