"use client";

import { Flame, Lock } from "lucide-react";
import { getStripe } from "@/lib/stripe-client";
import { PRICE_ID } from "@/lib/utils";

const UpgradePlan = () => {
    const onNavigateToUpgrade = async (price: string) => {
        try {
            const { sessionId } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price })
            }).then((res) => res.json());

            console.log({...sessionId});

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch(error) {
            console.log('Subscribe Button Error', error);
        }
    }
    return (
    <button onClick={() => onNavigateToUpgrade(PRICE_ID)} className="rounded-md bg-primary hover:bg-primary-shadow p-10 sm:h-80 sm:w-80">
            <div className="flex items-center flex-col cursor-pointer w-full h-full">
                <div className="flex-1 flex items-center flex-col">
                    <h2 className="text-xl font-bold mb-4">Subscribe to Upload Documents and Generate Quizzes.</h2>
                    <Lock className="w-12 h-12" />
                </div>
                <div className="flex flex-row items-end justify-end w-full">
                    <div className="bg-white p-3 rounded-full text-black gap-2 flex flex-row items-end justify-end">
                        <Flame />
                        <p>Upgrade</p>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default UpgradePlan;