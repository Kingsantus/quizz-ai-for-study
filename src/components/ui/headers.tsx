import { auth, signOut } from "@/auth"
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";


function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut()
        }}>
            <Button type="submit" variant="ghost">Sign Out</Button>
        </form>
    )
}

const Header = async () => {
    const session = await auth();
    // console.log(session)
    return (
        <header>
            <nav className="px-4 py-2.5">
                <div className="flex flex-wrap justify-between item-center mx-auto max-w-screen-xl">
                    <h1 className="text-3xl font-bold">Quizz AI</h1>
               
                <div>
                    {
                    session?.user ? (
                        <div className="flex gap-6 item-center">
                            {
                                session.user.name && session.user.image && 
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                <Image 
                                    src = { session.user.image }
                                    alt = {session.user.name}
                                    width = {32}
                                    height = {32}
                                    className="rounded-full"
                                    />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <NavMenu />
                                    </DropdownMenu>
                            }
                            <SignOut />
                        </div>
                    ) : (
                        <Link href="api/auth/signing">
                            <Button variant="link" className="rounded-xl border">Sign In</Button>
                        </Link>
                    )
                }
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header