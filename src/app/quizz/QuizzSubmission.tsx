import Bar from "@/components/Bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useReward } from "react-rewards";
import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";


type Props = {
    scorePercentage: number,
    score: number,
    totalQuestions: number
}

const QuizzSubmission = (props: Props) => {
    const { scorePercentage, score, totalQuestions } = props;
    const percentageTotal: number = Math.round((totalQuestions/totalQuestions)*100);
    const { reward } = useReward('rewardId', 'confetti');
    const router = useRouter();
    useEffect(() => {
        if (scorePercentage === 100) {
            reward();
        }
    }, [scorePercentage, reward])

    const onHandleBack = () => {
        router.back();
    }
    return (
        <div className="flex flex-col flex-1">
            <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="flex  items-center justify-end py-2 gap-2">
                <Button size="icon" variant="outline" onClick={onHandleBack}><X /></Button>
            </header>
        </div>
            <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24">
                <h2 className="text-3xl font-bold">Quizz Complete!</h2>
                <p>You scored: {scorePercentage}%</p>
                { scorePercentage === 100 ? 
                    <div className="flex flex-col items-center">
                        <p>Congratulations! 🎉</p>
                        <div className="flex justify-center">
                            <Image src="/images/owl-smiling.png" alt="Smiling Owl Image" width={400} height={400} />
                        </div>
                        <span id='rewardId' />
                    </div>
                :
                <>
                <div className="flex flex-row gap-8 mt-6">
                    <Bar percentage={scorePercentage} color="green" />
                    <Bar percentage={100 - scorePercentage} color="red" />
                    <Bar percentage={percentageTotal} color="blue" />
                </div>
                <div className="flex flex-row gap-8">
                    <p>You answered {score} Correct</p>
                    <p>You answered {totalQuestions - score} Incorrect</p>
                    <p>You answered {totalQuestions} in total.</p>
                </div>
                </>}
            </main>
        </div>
    )
}

export default QuizzSubmission;