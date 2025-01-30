import { auth } from "@/auth"
import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import QuizzesTable, { Quizz } from "./quizzesTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import MetricCard from "./metricCard";

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return (<p>User not found</p>)
    }

    const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
        where: eq(quizzes.userId, userId)
    });
    const userData = await getUserMetrics();
    // console.log(userData);

    // console.log(userQuizzes);
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {userData && userData.length > 0 ? (
            <>
                {userData.map((metric) => (
                <MetricCard 
                    key={metric.label} // Use a unique identifier if available, or fallback to index
                    label={metric.label} 
                    value={metric.value} 
                />
                ))}
            </>
            ) : null}
            </div>
            <QuizzesTable quizzes={userQuizzes} />
        </div>
    )
}

export default page;