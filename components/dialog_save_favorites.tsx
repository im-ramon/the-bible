import { THEME } from '@/styles/styles';
import { Verse } from '@/types/types';
import { saveFavoriteVerse } from '@/utils/local_storage';
import * as React from 'react';
import { Modal, Share, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface DialogSaveFavoritesProps {
    visible: boolean;
    hideDialog: () => void;
    verse: Verse | null;
    bookName?: string;
}

export default function DialogSaveFavorites({ visible, verse, bookName, hideDialog }: DialogSaveFavoritesProps) {
    const handleShare = () => {
        if (verse && bookName) {
            Share.share({
                message: `${bookName} ${verse.chapter}:${verse.verse}\n${verse.text}`,
            });
        }
    };

    const handleSave = async () => {
        if (verse) {
            await saveFavoriteVerse(verse, bookName);
            hideDialog();
            Toast.show({
                type: 'success',
                text1: 'Versículo salvo nos favoritos!',
                text2: 'Você pode acessá-lo a qualquer momento na aba "Favoritos".'
            });
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={hideDialog}
        >
            <TouchableWithoutFeedback onPress={hideDialog}>
                <View style={styles.overlay}>
                    {verse && (
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>
                                    {bookName} {verse.chapter}:{verse.verse}
                                </Text>
                                <Text style={styles.verseText}>
                                    {verse.text}
                                </Text>
                                <View style={styles.shareRow}>
                                    <Button
                                        mode="text"
                                        icon="share-variant"
                                        onPress={handleShare}
                                        style={styles.shareButton}
                                        labelStyle={styles.shareButtonText}
                                    >
                                        Compartilhar
                                    </Button>
                                </View>
                                <View style={styles.actions}>
                                    <Button
                                        mode="outlined"
                                        onPress={hideDialog}
                                        style={styles.actionButton}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        mode="contained"
                                        icon="bookmark"
                                        onPress={handleSave}
                                        style={[styles.actionButton, styles.saveButton]}
                                        labelStyle={styles.saveButtonText}
                                    >
                                        Salvar
                                    </Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '85%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    verseText: {
        marginBottom: 8,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    reference: {
        textAlign: 'center',
        marginBottom: 16,
        color: '#666',
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shareRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 6,
    },
    saveButton: {
        backgroundColor: THEME.COLORS.SUCCESS,
    },
    shareButton: {
        backgroundColor: 'transparent',
        elevation: 0,
        marginTop: 16,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#333',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    shareButtonText: {
        color: THEME.COLORS.PRIMARY,
        fontWeight: 'bold',
    },
});