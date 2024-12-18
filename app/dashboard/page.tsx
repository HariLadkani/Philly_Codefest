/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/A2AAlQPfYE0
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Cormorant_Garamond } from 'next/font/google'

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-4">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
          <LayoutGridIcon className="w-6 h-6" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <nav className="flex flex-col gap-2">
          <Button className="justify-start gap-2" size="sm" variant="ghost">
            <BookIcon className="w-4 h-4" />
            Lessons
          </Button>
          <Link href="/code-window">
          <Button className="justify-start gap-2" size="sm" variant="ghost">
            <CodeIcon className="w-4 h-4" />
            Code Practice
          </Button>
          </Link>
          <Link href="/simulator">
          <Button className="justify-start gap-2" size="sm" variant="ghost">
            <PlayIcon className="w-4 h-4" />
            Simulator
          </Button>
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <LayoutGridIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button className="rounded-full" size="icon" variant="ghost">
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder-user.jpg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-gray-500 dark:text-gray-400">Let's continue your learning journey.</p>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Your Progress</h3>
          <Progress value={75} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button className="bg-[#FFF3E0] text-[#FF9800] hover:bg-[#FFE0B2]" variant="primary">
            <Link href="/lessons">
              Lessons
            </Link>
          </Button>
          
          <Button className="bg-[#E3F2FD] text-[#1E88E5] hover:bg-[#BBDEFB]" variant="primary">
            <Link href="/code-window">
              Code Practice
            </Link>
          </Button>


          <Button className="bg-[#F3E5F5] text-[#9C27B0] hover:bg-[#E1BEE7]" variant="primary">
            <Link href="/simulator">
            Simulator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export default Dashboard;