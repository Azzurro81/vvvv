import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { KIT_GUIDES, markGuideAsRead } from '../../constants/kit_guides';

export default function KitDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [guide, setGuide] = useState<any>(null);

    useEffect(() => {
        const found = KIT_GUIDES.find(g => g.id === id);
        if (found) {
            setGuide(found);
            markGuideAsRead(found.id);
        }
    }, [id]);

    if (!guide) {
        return (
            <View style={styles.center}>
                <Text>Guida non trovata</Text>
                <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
                    <Text style={{color: '#0f4c81'}}>Torna indietro</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
            {/* Header / Back */}
            <View style={styles.headerArea}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#0f4c81" />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Guida Compilazione</Text>
                <View style={{width: 40}}/>
            </View>

            {/* Video Player Placeholder */}
            <View style={styles.videoSection}>
                <View style={styles.videoContainer}>
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
                        style={styles.videoThumbnail} 
                    />
                    <View style={styles.videoOverlay}>
                        <TouchableOpacity style={styles.playButton}>
                            <Ionicons name="play" size={36} color="#fff" style={{marginLeft: 4}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.videoCaption}>Video Tutorial: {guide.title}</Text>
            </View>

            <View style={styles.contentSection}>
                <Text style={styles.title}>{guide.title}</Text>
                
                {/* PDF Download Button */}
                <TouchableOpacity style={styles.pdfButton}>
                    <View style={styles.pdfIconContainer}>
                        <Ionicons name="document-text" size={24} color="#ef4444" />
                    </View>
                    <View style={styles.pdfTextContainer}>
                        <Text style={styles.pdfTitle}>Scarica la Guida in PDF</Text>
                        <Text style={styles.pdfSubtitle}>Formato stampabile con esempi visivi</Text>
                    </View>
                    <Ionicons name="download-outline" size={24} color="#0f4c81" />
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.sectionHeading}>Istruzioni Passo-Passo</Text>
                <Text style={styles.descriptionText}>{guide.description}</Text>

                <View style={styles.instructionsBox}>
                    {guide.instructions.map((inst: string, index: number) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.bullet}>
                                <Text style={styles.bulletText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.listText}>{inst}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfdfd' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    
    headerArea: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
    headerLabel: { fontSize: 16, fontWeight: '700', color: '#64748b' },

    videoSection: { width: '100%', paddingHorizontal: 20, marginBottom: 24 },
    videoContainer: { 
        width: '100%', 
        height: 200, 
        backgroundColor: '#000', 
        borderRadius: 16, 
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5
    },
    videoThumbnail: { width: '100%', height: '100%', opacity: 0.7 },
    videoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
    playButton: { 
        width: 64, 
        height: 64, 
        backgroundColor: 'rgba(15, 76, 129, 0.85)', 
        borderRadius: 32, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff'
    },
    videoCaption: { marginTop: 10, fontSize: 13, fontWeight: '600', color: '#64748b', textAlign: 'center' },

    contentSection: { paddingHorizontal: 20 },
    title: { fontSize: 24, fontWeight: '900', color: '#0f4c81', marginBottom: 20, lineHeight: 28 },

    pdfButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#f1f5f9', 
        padding: 16, 
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 24
    },
    pdfIconContainer: { width: 44, height: 44, backgroundColor: '#fee2e2', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    pdfTextContainer: { flex: 1 },
    pdfTitle: { fontSize: 15, fontWeight: '800', color: '#1e293b', marginBottom: 2 },
    pdfSubtitle: { fontSize: 12, color: '#64748b', fontWeight: '500' },

    divider: { height: 1, backgroundColor: '#e2e8f0', marginBottom: 24 },

    sectionHeading: { fontSize: 18, fontWeight: '800', color: '#1e293b', marginBottom: 12 },
    descriptionText: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 20, backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    
    instructionsBox: { marginTop: 8 },
    listItem: { flexDirection: 'row', marginBottom: 16, paddingRight: 10 },
    bullet: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
    bulletText: { color: '#0284c7', fontSize: 13, fontWeight: '800' },
    listText: { flex: 1, fontSize: 15, color: '#334155', lineHeight: 22 }
});
