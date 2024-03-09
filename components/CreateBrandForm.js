import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/core';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useRoute } from '@react-navigation/native';

const CreateBrandForm = () => {
    const route = useRoute();
    const brand_id = route.params?.brand_id;
    const navigation = useNavigation();
    const scrollViewRef = React.useRef();

    const insets = useSafeAreaInsets();

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [brandId, setBrandId] = useState(brand_id || null);
    const [brandName, setBrandName] = useState('');
    const [brandTagline, setBrandTagline] = useState('');
    const [brandLink, setBrandLink] = useState('');
    const [industry, setIndustry] = useState('');
    const [keyTopics, setKeyTopics] = useState('');
    const [customKnowledge, setCustomKnowledge] = useState('');



    useEffect(() => {
        if (brand_id) {
            fetch(`http://192.168.40.60:4000/api/brands/unfilled-data/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: FIREBASE_AUTH.currentUser.uid,
                    brandId: brand_id,
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setBrandName(data.brandName);
                    setBrandTagline(data.brandTagline);
                    setBrandLink(data.brandLink);
                    setIndustry(data.industry);
                    setKeyTopics(data.keyTopics);
                    setCustomKnowledge(data.customKnowledge);
                    setCurrentQuestionIndex(`${data.questionIndex + 1}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [brandId, brand_id, currentQuestionIndex]);

    const questions = [
        { question: 'What is the name of your brand or company?', example: 'e.g. iSpeak AI' },
        { question: 'What is your brand tagline?', example: 'e.g. We do AI for you!' },
        { question: 'What is your business website?', example: 'e.g. www.ispeak.ai' },
        { question: 'What is your brand industry?', example: 'e.g. AI Automations, Marketing, ...' },
        { question: 'What are your key topics?', example: 'e.g. Custom AI Solutions, Social Media Automation, etc. Seperate each key topic with a comma.' },
        { question: 'Additional Information?', example: 'e.g. Any additional information you would like to provide.' }
    ];

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        let payload = {
            "userId": FIREBASE_AUTH.currentUser.uid,
            "brandId": brand_id || brandId,
            "questionIndex": currentQuestionIndex,
        };

        switch (currentQuestionIndex) {
            case 0:
                payload.brandName = inputValue;
                break;
            case 1:
                payload.brandTagline = inputValue;
                break;
            case 2:
                payload.brandLink = inputValue;
                break;
            case 3:
                payload.industry = inputValue;
                break;
            case 4:
                payload.keyTopics = inputValue;
                break;
            case 5:
                payload.customKnowledge = inputValue;
                break;
            default:
                break;
        }


        try {
            const response = await fetch(`http://192.168.40.60:4000/api/brands/${brand_id || brandId ? 'update' : 'create'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const json = await response.json();
                console.log(json);
                setBrandId(json._id)

                let newMessages = [
                    ...messages,
                    { from: 'bot', text: questions[currentQuestionIndex].question },
                    { from: 'user', text: inputValue },
                ];

                setMessages(newMessages);
                setInputValue('');

                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);

                if (currentQuestionIndex < questions.length - 1) {
                    const index = parseInt(currentQuestionIndex) + 1;
                    console.log('Index:', index);
                    setCurrentQuestionIndex(index);
                } else {
                    // All questions answered
                }
            } else {
                console.error('Server responded with an error:', response.status);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSkip = () => {
        console.log("Skip was clicked");
        // Perform any action here, for example, navigate to another screen
        // navigation.navigate("NextScreen");
        // If you want to process the skipping as answering the question, you can move to the next question or end the questionnaire
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>&#x2190;</Text>
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{brandName.length > 0 ? brandName + ' Onboarding' : 'Create Brand'}</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingTop: 20 }} ref={scrollViewRef}>
                    {messages.map((message, index) => (
                        <View key={index} style={[
                            styles.messageBubble,
                            message.from === 'bot' ? styles.botMessage : styles.userMessage,
                        ]}>
                            <Text style={message.from === 'bot' ? styles.messageText : styles.userTextMessage}>{message.text}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.suggestions}>
                    {parseInt(currentQuestionIndex) === questions.length - 1 && (
                        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                            <Text style={styles.skipButtonText}>Skip</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.question}>
                    {currentQuestionIndex < questions.length && (
                        <View style={styles.questionBubble}>
                            <Text style={styles.questionText}>{questions[currentQuestionIndex]?.question}</Text>
                            {questions[currentQuestionIndex]?.example && (
                                <Text style={styles.exampleText}>{questions[currentQuestionIndex]?.example}</Text>
                            )}
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setInputValue(text)}
                    value={inputValue}
                    placeholder={currentQuestionIndex < questions.length ? 'Type here...' : ''}
                    placeholderTextColor="gray"
                    multiline={true}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>➤</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
    },
    messagesContainer: {
        flex: 1,
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginVertical: 4,
        alignSelf: 'flex-start',
    },
    botMessage: {
        backgroundColor: '#E0E0E0',
        marginLeft: 10,
    },
    userMessage: {
        backgroundColor: '#4fd216',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    messageText: {
        color: 'black',
    },
    userTextMessage: {
        color: 'white',
    },
    questionBubble: {
        marginTop: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    questionText: {
        fontWeight: 'bold',
        color: 'black',
        // Ensure text wraps
        flexWrap: 'wrap',
    },
    exampleText: {
        fontStyle: 'italic',
        color: 'grey',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#4fd216',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 24,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        marginRight: 10,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#000',
        marginLeft: -24
    },
    backButtonText: {
        fontSize: 24,
        color: '#4fd216',
    },
    skipButton: {
        marginTop: 10,
        alignSelf: 'center', // Center the button
        backgroundColor: '#4fd216', // Use a color that matches your design
        padding: 10,
        borderRadius: 20, // Rounded corners
    },
    skipButtonText: {
        color: '#FFF', // White text color
        fontWeight: 'bold',
    },
    suggestions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingHorizontal: 10,
    }
});

export default CreateBrandForm;