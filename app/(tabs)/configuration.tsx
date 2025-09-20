import { useFontSettingsContext } from "@/hooks/FontSettingsContext";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

const FONT_SIZES = [16, 18, 20, 22, 24, 28, 32];
const FONT_WEIGHTS = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export default function Configuration() {
    const { fontSettings, setFontSettings } = useFontSettingsContext();

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>Configurações</Text>

            <Text style={{ marginBottom: 8 }}>Tamanho da fonte:</Text>
            <Picker
                selectedValue={fontSettings.size}
                onValueChange={(val: number) => setFontSettings({ ...fontSettings, size: Number(val) })}
                style={{ marginBottom: 16, color: 'black' }}
            >
                {FONT_SIZES.map(size => (
                    <Picker.Item key={size} label={String(size)} value={size} />
                ))}
            </Picker>

            <Text style={{ marginBottom: 8 }}>Peso da fonte:</Text>
            <Picker
                selectedValue={fontSettings.weight}
                onValueChange={(val: string) => setFontSettings({ ...fontSettings, weight: val as any })}
                style={{ marginBottom: 16, color: 'black' }}
            >
                {FONT_WEIGHTS.map(weight => (
                    <Picker.Item
                        key={weight}
                        label={weight === '400' ? '400 [Padrão]' : weight}
                        value={weight}
                    />
                ))}
            </Picker>
        </View>
    );
}