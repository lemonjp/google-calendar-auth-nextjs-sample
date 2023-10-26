"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { getCalendarEvents } from "@/utils/calendar";
import { CalendarEvent } from "@/types";

const EventItem = ({ event }: { event: CalendarEvent }) => {
  const title =
    event.summary.length < 30
      ? event.summary
      : event.summary.slice(0, 30) + '...'
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
      {`${title} (${event.start} - ${event.end})`}
      </h3>
    </div>
  )
}

export default function CallBack() {

  const [tokens, setTokens] = useState<any>({})
  const [events, setEvents] = useState<any>([])
  const [hasTokens, setHasTokens] = useState(false)
  const searchParams = useSearchParams()

  const hasCode = searchParams.has('code')

  useEffect(() => {

    if(!hasCode) return

    // コールバックで戻されたURLのパラメータから認可コードを取得
    const authCode = searchParams.get('code')

    const getToken = async () => {

      if(!authCode) return

      const headers = {
        "Content-Type": "application/json",
      }
      const data = {
        authorizationCode: authCode
      }
      const formResponse = await fetch("/api/google", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      const jsonData = await formResponse.json();
      const { tokens } = jsonData
      setHasTokens(true)
      setTokens(tokens)
    }

    if (!hasTokens) {
      getToken()
    }

    /* FIXME: Module not found: Can't resolve 'fs'
    const getEvents = async () => {
      const events = await getCalendarEvents(tokens.access_token);
      console.log("events: ", events);
      setEvents(events)
    }

    if (hasTokens) {
      getEvents()
    }
    */

  }, [tokens])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
              Google Calendar API Auth Info
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Your google calendar api auth infomation.
            </p>

            <div className="flex flex-col w-fit">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">項目</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">値</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            Access Token
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {tokens.access_token}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            Token Scope
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {tokens.scope}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            Token Type
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {tokens.token_type}
                          </td>
                        </tr>

                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            Expiry Date
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {tokens.expiry_date} - ( {new Date(tokens.expiry_date).toLocaleString()} )
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* FIXME: Module not found: Can't resolve 'fs'
            <ul className="space-y-3 text-sm">
            {events &&
            events.map((event: CalendarEvent) => (
              <li className="flex space-x-3">
                <svg className="flex-shrink-0 h-6 w-6 text-blue-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5219 4.0949C11.7604 3.81436 12.181 3.78025 12.4617 4.01871C12.7422 4.25717 12.7763 4.6779 12.5378 4.95844L6.87116 11.6251C6.62896 11.91 6.1998 11.94 5.9203 11.6916L2.9203 9.02494C2.64511 8.78033 2.62032 8.35894 2.86493 8.08375C3.10955 7.80856 3.53092 7.78378 3.80611 8.02839L6.29667 10.2423L11.5219 4.0949Z" fill="currentColor"/>
                </svg>
                <span className="text-gray-800 dark:text-gray-400">
                  <EventItem event={event} />
                </span>
              </li>
            ))}
            </ul>
            */}

          </div>
        </div>
      </div>
     </main>
    )
}
