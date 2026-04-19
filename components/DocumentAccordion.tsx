import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDocumentDetails } from '../constants/document_dictionary';
import { useLanguage } from '../context/LanguageContext';
import { translateText } from '../services/translationService';

export default function DocumentAccordion({ documentName }: { documentName: string }) {
    const [expanded, setExpanded] = useState(false);
    const { language } = useLanguage();
    const [translatedName, setTranslatedName] = useState(documentName);
    const [translatedDetails, setTranslatedDetails] = useState(getDocumentDetails(documentName));

    useEffect(() => {
        async function translate() {
            if (language === 'it') {
                setTranslatedName(documentName);
                setTranslatedDetails(getDocumentDetails(documentName));
                return;
            }
            const name = await translateText(documentName, language);
            const details = await translateText(getDocumentDetails(documentName), language);
            setTranslatedName(name);
            setTranslatedDetails(details);
        }
        translate();
    }, [language, documentName]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.header, expanded ? styles.headerExpanded : null]} 
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name={expanded ? "book-outline" : "document-text-outline"} size={20} color="#0ea5e9" />
                </View>
                
                <Text style={[styles.title, expanded && styles.titleExpanded]}>
                    {translatedName}
                </Text>

                <Ionicons 
                    name={expanded ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#94a3b8" 
                    style={styles.chevron}
                />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{translatedDetails}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#f8fafc',
    },
    headerExpanded: {
        backgroundColor: '#eff6ff',
        borderBottomWidth: 1,
        borderBottomColor: '#dbeafe',
    },
    iconContainer: {
        marginRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 15,
        color: '#334155',
        fontWeight: '500',
        lineHeight: 22,
    },
    titleExpanded: {
        color: '#0369a1',
        fontWeight: '700',
    },
    chevron: {
        marginLeft: 6,
    },
    body: {
        padding: 16,
        backgroundColor: '#fff',
    },
    bodyText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    }
});
