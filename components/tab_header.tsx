import { useAppContext } from "@/contexts/app.context";
import { THEME } from "@/styles/styles";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { ALargeSmall, BetweenHorizontalEnd, Bookmark, BookMarked, FileType, Home, Minus, Plus, Search, Settings } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

interface TabHeaderProps {
    props: BottomTabHeaderProps;
    pageIcons?: { [key: string]: React.ReactNode };
}


export default function TabHeader({ props }: TabHeaderProps) {
    const { fontSize, setFontSize, hasBreakLine, toggleHasBreakLine } = useAppContext();

    const [showMenu, setShowMenu] = useState(false);

    const pageIcons = {
        configuration: <Settings color={THEME.COLORS.BLACK} />,
        bible: <BookMarked color={THEME.COLORS.BLACK} />,
        index: <Home color={THEME.COLORS.BLACK} />,
        explore: <Search color={THEME.COLORS.BLACK} />,
        bookmarks: <Bookmark color={THEME.COLORS.BLACK} />,
    };

    function handleChangeFontSize(value: number) {
        if (fontSize >= 10 && fontSize <= 34)
            setFontSize(fontSize + value);
    }

    return (
        <View style={styles.headerContainer}>
            {props.route.name in pageIcons ? pageIcons[props.route.name as keyof typeof pageIcons] : null}
            <Text style={styles.headerTitle}>
                {props.options.title}
            </Text>
            <View style={styles.floatButtonArea}>
                <TouchableOpacity style={styles.floatButton} onPress={() => { setShowMenu(prev => !prev) }}>
                    <ALargeSmall color={THEME.COLORS.BLACK} size={20} />
                </TouchableOpacity>
                {showMenu && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutRight} style={styles.menuArea}>
                        <View style={styles.configurationArea}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center'}}>
                                Configurações do texto
                            </Text>
                            <ConfigurationItem icon={<FileType size={16} />} title="Tamanho da fonte">
                                <View style={styles.fontSizeControl}>
                                    <Plus
                                        onPress={() => handleChangeFontSize(1)}
                                        style={styles.fontSizeControlButtonPlus}
                                    />
                                    <View style={styles.fontSizeControlText}>
                                        <Text>
                                            {fontSize}
                                        </Text>
                                    </View>
                                    <Minus
                                        onPress={() => handleChangeFontSize(-1)}
                                        style={styles.fontSizeControlButtonMinus}
                                    />
                                </View>
                            </ConfigurationItem>
                            <ConfigurationItem icon={<BetweenHorizontalEnd size={16} />} title="Quebra de linha">
                                <Button buttonColor={hasBreakLine === "1" ? THEME.COLORS.DANGER : THEME.COLORS.SUCCESS} onPress={toggleHasBreakLine}>
                                    <Text style={{color: 'white'}}>{hasBreakLine === "1" ? "Desativar quebra de linha" : "Ativar quebra de linha"}</Text>
                                </Button>
                            </ConfigurationItem>
                        </View>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

function ConfigurationItem({ icon, title, children }: { icon?: React.ReactNode, title: string, children?: React.ReactNode }) {
    return (
        <View style={styles.configurationItem}>
            <View style={styles.configurationItemHeader}>
                {icon}
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        backgroundColor: THEME.COLORS.BACKGROUND,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderBottomColor: THEME.COLORS.GRAY,
        borderBottomWidth: THEME.SIZE.BORDER_WIDTH,
        paddingLeft: 24,
        gap: 8,
    },
    headerTitle: {
        color: THEME.COLORS.BLACK,
        fontSize: 18,
        fontWeight: "bold",
    },
    floatButtonArea: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        justifyContent: "center",
        marginRight: 24,
    },
    floatButton: {
        backgroundColor: THEME.COLORS.GRAY,
        padding: 6,
        borderRadius: THEME.SIZE.BORDER_RADIUS,
    },
    menuArea: {
        backgroundColor: THEME.COLORS.WHITE,
        position: "absolute",
        top: 50,
        right: 0,
        padding: 12,
        width: 260,
        borderRadius: THEME.SIZE.BORDER_RADIUS,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    configurationArea: {
        gap: 16,
    },
    configurationItem: {
        gap: 8,
    },
    configurationItemHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 4,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    fontSizeControl: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    fontSizeControlText: {
        borderTopColor: THEME.COLORS.GRAY + "80",
        borderBottomColor: THEME.COLORS.GRAY + "80",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingVertical: 4,
    },
    fontSizeControlButtonPlus: {
        backgroundColor: THEME.COLORS.GRAY + "80",
        padding: 14,
        borderTopLeftRadius: THEME.SIZE.BORDER_RADIUS,
        borderBottomLeftRadius: THEME.SIZE.BORDER_RADIUS,
    },
    fontSizeControlButtonMinus: {
        backgroundColor: THEME.COLORS.GRAY + "80",
        padding: 14,
        borderTopRightRadius: THEME.SIZE.BORDER_RADIUS,
        borderBottomRightRadius: THEME.SIZE.BORDER_RADIUS,
    }
});