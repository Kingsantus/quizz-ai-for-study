import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex_col flex-1">
    <main className="flex justify-center flex-1">
      <div className="items-center flex flex-col sm:flex-row gap-20 justify-center mx-auto py-10 sm:width-[1000px] w-full sm:py-10">
        <div >
          <Image src="/images/owl-landing-no-bg.png" width="400" height="400" alt="owl" />
        </div>
        <div className="text-center flex gap-6 flex-col">
          <h1 className="text-3xl font-bold">Generate Your Study Quiz with Ease</h1>
          <h3 className="text-sm">Upload any PDF document and let AI help you create customized quizzes in seconds!</h3>
          <Link href={"/quizz"}>
          <Button variant={"neo"} className="mt-4 h-14 text-white">Get Started</Button>
          </Link>
          
        </div>
      </div>
    </main>
    </div>
  )
}
