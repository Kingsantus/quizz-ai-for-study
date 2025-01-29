import exp from "constants";
import React from "react";
import { clsx } from "clsx";
import { cn } from "@/lib/utils";

type Props = {
    isCorrect: boolean | null | undefined,
    correctAnswer: string
}

const ResultCard = (props: Props) => {
    const { isCorrect } = props;
    
    if (isCorrect === null || isCorrect === undefined){
        return null;
    }

    const text = isCorrect ? 'Correct!' : 'Incorrect! The correct answer is: ' + props.correctAnswer;

    const borderClasses = clsx({
        "border-green-500": isCorrect,
        "border-red-500": !isCorrect
    })
    // const borderClasses = isCorrect ? "border border-green-500" : "border border-red-500";
    return (
        <div className={cn(
            borderClasses,
            "border-2",
            "rounded-lg",
            "p-4",
            "text-center",
            "text-lg",
            "font-semibold",
            "my-4",
            "bg-secondary"
        )}>{text}</div>
    )
}

export default ResultCard;