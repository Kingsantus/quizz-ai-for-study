import { createSubscription, deleteSubscription } from "@/app/actions/userSubscriptions";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
require('dotenv').config();

const relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "customer.subscription.created",
]);

export async function POST(req:Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")as string;

    const webHookSecret = process.env.NODE_ENV === "production" 
        ? process.env.NEXT_STRIPE_WEBHOOK_SECRET 
        : "whsec_5a2418cb401b9486b03b21cc9353dbc6c48ec3cce7a2ed22d0a1892e3c6de312";

    if (!webHookSecret){
        throw new Error(
            "STRIPE_WEBHOOK_SECRET is not set"
        );
    }

    if (!sig) return;

    const event = stripe.webhooks.constructEvent(
        body,
        sig,
        webHookSecret
    );

    const data = event.data.object as Stripe.Subscription;

    if (relevantEvents.has(event.type)) {
        switch(event.type) {
            case "customer.subscription.created": {
                await createSubscription({
                    stripeCustomerId: data.customer as string
                })
                break;
            }
            case "customer.subscription.deleted": {
                await deleteSubscription({
                    stripeCustomerId: data.customer as string
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    return new Response(
        JSON.stringify({
            receive: true
        }), { status: 200 }
    )
}