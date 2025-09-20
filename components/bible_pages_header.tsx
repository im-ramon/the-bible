import { THEME } from "@/styles/styles";
import type { Route } from '@react-navigation/native';
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
interface BiblePagesHeaderProps {
    props: NativeStackHeaderProps;
}

export default function BiblePagesHeader({ props }: BiblePagesHeaderProps) {
    const router = useRouter();

    function goToBackChapters(route: Route<string>) {
        const { bookId, bookName } = route.params as { bookId: number; bookName: string };
        router.navigate({
            pathname: "/(tabs)/bible/chapters",
            params: {
                bookId,
                bookName,
            },
        });
    }

    function goBackToBooks() {
        router.push({
            pathname: '/(tabs)/bible/books',
            params: {
                title: 'Novo Testamento'
            }
        });
    }

    function handleGoBack(route: Route<string>) {
        if (route.name === "verses") {
            goToBackChapters(route);
        }
        else {
            goBackToBooks();
        }
    }

    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                height: props.options.title === "Bíblia" ? 0 : 50,
                justifyContent: "flex-start",
                paddingHorizontal: 16,
            }}
        >
            {props.options.title === "Bíblia" ? null : (
                <>
                    <TouchableOpacity onPress={() => handleGoBack(props.route)} style={{ marginRight: 16 }}>
                        <ArrowLeft color={THEME.COLORS.BLACK} size={24} />
                    </TouchableOpacity>

                    <Text style={{
                        color: THEME.COLORS.BLACK,
                        fontSize: 20,
                        fontWeight: "bold",
                    }}>
                        {props.options.title}
                    </Text>
                </>
            )}
        </View>
    );
}