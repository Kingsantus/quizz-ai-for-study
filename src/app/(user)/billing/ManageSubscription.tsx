"use client";

import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const ManageSubscription = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const redirectToCustomerPortal = async() => {
         setLoading(true);

        try {
            const { url } = await fetch('api/stripe/create-portal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json());

            router.push(url.url);
        } catch(error) {
            setLoading(false);
            console.log('Subscribe Button Error', error);
        }
        
    }
    return (
        <Button disabled={loading} onClick={redirectToCustomerPortal}>{
            loading ? <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
            </> : "Change Your Subscription" }</Button>
    )
}

export default ManageSubscription;