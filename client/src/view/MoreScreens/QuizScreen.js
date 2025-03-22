import React, {useEffect, useState} from "react";
import { StyleSheet, Button, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const QuizScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const quizRef = collection(db, "Quiz");

    useEffect(() => {
        getQuiz();
    }, []);

    const getQuiz = async () => {
        const q = query(quizRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setQuiz(mapData);
    };

    const currentQuestion = quiz[currentQuestionIndex];

    const handleSelectAnswer = (option) => {
        setSelectedAnswer(option);
    }

    const handleNextQuestion = () => {
        if (selectedAnswer === currentQuestion.Answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex + 1 < quiz.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizFinished(true);
        }
    }

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizFinished(false);
      };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {!quizFinished ? (
                    <View style={styles.viewContainer}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.questionText}>{currentQuestion?.Question}</Text>
                        </View>
                        {currentQuestion?.Options.map((option, index) => (
                            <Pressable key={index}
                                       style={[
                                        styles.optionButton,
                                        selectedAnswer === option && styles.selectedOption,
                                       ]}
                                       onPress={() => handleSelectAnswer(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </Pressable>
                        ))}
                        <Pressable onPress={handleNextQuestion} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>Next Question</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.viewContainer}>
                        <Text style={styles.resultText}>Quiz Completed!</Text>
                        <Text style={styles.scoreText}>Score: {score}/{quiz.length}</Text>
                        <Button title="Restart Quiz" onPress={restartQuiz} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    questionContainer: {
        height: 140,
        width: '100%'
    },
    questionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    optionButton: {
        padding: 15,
        backgroundColor: 'salmon', // You can change background for contrast
        marginBottom: 10,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        color: 'white',  // All option text in white
    },
    selectedOption: {
        backgroundColor: '#4CAF50',
    },
    nextButton: {
        marginTop: 140,
        padding: 15,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        marginLeft: 'auto'
    },
    nextButtonText: {
        color: 'white',  // White text on the "Next Question" button
        fontSize: 18,
    },
    resultContainer: {
        alignItems: 'center',
    },
    resultText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',  // White text for result message
    },
    scoreText: {
        fontSize: 24,
        marginVertical: 10,
        color: 'white',  // White text for score display
    },
});

export default QuizScreen;