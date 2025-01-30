import { quizzes, quizzSubmissions, questions, users } from "@/db/schema";
import { auth } from "@/auth";
import { db } from "@/db";
import { avg, count, eq } from "drizzle-orm";

const getUserMetrics = async() => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return;
    }

    // get total # of user quizzes
    const numQuizzes = await db
        .select({ value: count() })
        .from(quizzes)
        .where(eq(quizzes.userId, userId));

    // get total number of questions
    const numQuestions = await db
        .select({ value: count() })
        .from(questions)
        .innerJoin(quizzes, eq(questions.quizzId, quizzes.id))
        .innerJoin(users, eq(quizzes.userId, users.id))
        .where(eq(users.id, userId));
        

    // get the total number of submissions
    const numSubmissions = await db
        .select({ value: count() })
        .from(quizzSubmissions)
        .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
        .innerJoin(users, eq(quizzes.userId, users.id))
        .where(eq(users.id, userId));

    // Get the average score
    const avgScore = await db
      .select({ value: avg(quizzSubmissions.score)})
      .from(quizzSubmissions)
      .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
      .innerJoin(users, eq(quizzes.userId, users.id))
      .where(eq(users.id, userId));

    return [ 
        { label: 'No of Quizzes', value: numQuizzes[0].value},
        { label: 'No of Questions', value: numQuestions[0].value},
        { label: 'No of Submissions', value: numSubmissions[0].value},
        { label: 'Average Score', value: avgScore[0].value},
    ];
}

export default getUserMetrics;