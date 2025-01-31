"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";

const questions = [
    {
        questionText: "What is React",
        answers: [
            { answerText: "A library for building user interfaces", isCorrect: true, id: 1},
            { answerText: "A front-end framework", isCorrect: false, id: 2},
            { answerText: "A Back-end framework", isCorrect: false, id: 3},
            { answerText: "A datbase management system", isCorrect: false, id: 4}
        ]
    },
    {
        questionText: "What is JSX?",
        answers: [
            { answerText: "A database query language", isCorrect: false, id: 3 },
            { answerText: "A JavaScript framework", isCorrect: false, id: 1 },
            { answerText: "A new version of JSON", isCorrect: false, id: 2 },
            { answerText: "A syntax extension for JavaScript", isCorrect: true, id: 4 }
        ]
    },
    {
        questionText: "Which of these is a React lifecycle method?",
        answers: [
            { answerText: "initialize", isCorrect: false, id: 4 },
            { answerText: "onCreate", isCorrect: false, id: 1 },
            { answerText: "componentDidMount", isCorrect: true, id: 3 },
            { answerText: "onDestroy", isCorrect: false, id: 2 }
        ]
    },
    {
        questionText: "What is the purpose of `useState` in React?",
        answers: [
            { answerText: "To handle API calls", isCorrect: false, id: 1 },
            { answerText: "To manage state in functional components", isCorrect: true, id: 2 },
            { answerText: "To update the DOM directly", isCorrect: false, id: 3 },
            { answerText: "To define a class component", isCorrect: false, id: 4 }
        ]
    },
    {
        questionText: "Which of these hooks is used for side effects in React?",
        answers: [
            { answerText: "useState", isCorrect: false, id: 1 },
            { answerText: "useReducer", isCorrect: false, id: 4 },
            { answerText: "useContext", isCorrect: false, id: 3 },
            { answerText: "useEffect", isCorrect: true, id: 2 }
        ]
    },
    {
        questionText: "What is the default behavior of React props?",
        answers: [
            { answerText: "Editable", isCorrect: false, id: 4 },
            { answerText: "Global", isCorrect: false, id: 3 },
            { answerText: "Read-only", isCorrect: true, id: 1 },
            { answerText: "Dynamic", isCorrect: false, id: 2 }
        ]
    },
    {
        questionText: "Which of these is a correct way to pass data to a child component?",
        answers: [
            { answerText: "Using state", isCorrect: false, id: 3 },
            { answerText: "Using props", isCorrect: true, id: 1 },
            { answerText: "Using context", isCorrect: false, id: 2 },
            { answerText: "Using reducers", isCorrect: false, id: 4 }
        ]
    },
    {
        questionText: "What does `useContext` do in React?",
        answers: [
            { answerText: "Creates a new context", isCorrect: false, id: 4 },
            { answerText: "Manages component state", isCorrect: false, id: 1 },
            { answerText: "Handles DOM events", isCorrect: false, id: 2 },
            { answerText: "Provides access to context values", isCorrect: true, id: 3 }
        ]
    },
    {
        questionText: "Which company developed React?",
        answers: [
            { answerText: "Google", isCorrect: false, id: 4 },
            { answerText: "Microsoft", isCorrect: false, id: 2 },
            { answerText: "Facebook (now Meta)", isCorrect: true, id: 3 },
            { answerText: "Amazon", isCorrect: false, id: 1 }
        ]
    }
]

export default function Home() {
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleNext = () => {
        if(!started) {
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setSubmitted(true);
            return;
        }

        setSelectedAnswer(null);
        setIsCorrect(null);
    }

    const handleAnswer = (answer: any) => {
        setSelectedAnswer(answer.id);
        const isCurrentCorrect = answer.isCorrect;
        if (isCurrentCorrect) {
            setScore(score + 1);
        }
        setIsCorrect(isCurrentCorrect);
    }

    const scorePercentage: number = Math.round((score/questions.length)*100);

    if (submitted) {
        return (
            <QuizzSubmission score={score} scorePercentage={scorePercentage} totalQuestions={questions.length} />
        )
    }
  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
                <Button size="icon" variant="outline"><ChevronLeft /></Button>
                <ProgressBar value={(currentQuestion/questions.length) * 100} />
                <Button size="icon" variant="outline"><X /></Button>
            </header>
        </div>
        <main className="flex justify-center flex-1">
            {started ? <h1 className="text-6xl font-bold">Welcome to the quizz page👋</h1> : (
                <div>
                    <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        {
                            questions[currentQuestion].answers.map(answer => {
                                const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                                return (
                                    <Button size={'xl'} onClick={() => handleAnswer(answer)} variant={variant} key={answer.id}><p className="whitespace-normal">{answer.answerText}</p></Button>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </main>
        <footer className="footer pb-9 px-6 relative mb-0">
            <ResultCard isCorrect={isCorrect} correctAnswer={
                questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""
            }/>
        <Button variant={"neo"} onClick={handleNext}>{!started ? 'Start' : (currentQuestion === questions.length -1) ? 'Submit' : 'Next'}</Button>
        </footer>
    </div>
  )
}
