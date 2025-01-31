import { auth } from "@/auth"
import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import QuizzesTable, { Quizz } from "./quizzesTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import MetricCard from "./metricCard";
import getHeatMapData from "@/app/actions/getHeatMapData";
import SubmissionsHeatMap from "./heatMap";
import SubscribeBtn from "../billing/SubscribeBtn";
import { PRICE_ID } from "@/lib/utils";

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    // const HeatMap = Demo();

    if (!userId) {
        return (<p>User not found</p>)
    }

    const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
        where: eq(quizzes.userId, userId)
    });
    const userData = await getUserMetrics();
    const heatMapData = await getHeatMapData();

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
            <div>
                {
                    heatMapData ? <SubmissionsHeatMap data={heatMapData.data} /> : null
                }
            </div>
            {/* <SubscribeBtn userId={userId} price={PRICE_ID} /> */}
            <QuizzesTable quizzes={userQuizzes} />
        </div>
    )
}

export default page;