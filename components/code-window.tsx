/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/1vKkqiMLIc7
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export function CodeWindow() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="text-2xl font-bold">Coding Practice</div>
          <Button variant="outline">
            <PlusIcon className="w-5 h-5" />
            New Problem
          </Button>
        </header>
        <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 overflow-auto dark:border-gray-800">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Two Sum</CardTitle>
                <CardDescription>
                  Given an array of integers nums and an integer target, return indices of the two numbers such that
                  they add up to target.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="code">Your Code</Label>
                    <Textarea className="font-mono" id="code" rows={10} />
                  </div>
                  <div className="flex justify-end">
                    <Button>Submit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reverse Linked List</CardTitle>
                <CardDescription>
                  Given the head of a singly linked list, reverse the list and return the reversed list.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="code">Your Code</Label>
                    <Textarea className="font-mono" id="code" rows={10} />
                  </div>
                  <div className="flex justify-end">
                    <Button>Submit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-80 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-8 flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="text-2xl font-bold">AI Assistant</div>
          <Button variant="outline">
            <SettingsIcon className="w-5 h-5" />
          </Button>
        </header>
        <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 overflow-auto dark:border-gray-800">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm">
                <p>
                  Hi there! I'm an AI assistant created by Anthropic to help you with your coding practice. How can I
                  assist you today?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-sm">
                <p>I'm working on the Two Sum problem. Can you help me with the algorithm?</p>
              </div>
              <Avatar>
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm">
                <p>Sure, let's think through the Two Sum problem step-by-step:</p>
                <ol className="list-decimal list-inside mt-2">
                  <li>We need to find two numbers in the array that add up to the target.</li>
                  <li>We can use a hash map to store the complement of each number (target - num) and its index.</li>
                  <li>
                    As we iterate through the array, we check if the current number's complement is in the hash map.
                  </li>
                  <li>If it is, we return the indices of the current number and the complement.</li>
                  <li>If not, we add the current number and its index to the hash map.</li>
                </ol>
                <p className="mt-2">Let me know if you need any clarification or have additional questions!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 dark:border-gray-800">
          <Textarea className="font-mono" placeholder="Type your message..." />
          <div className="flex justify-end mt-2">
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}