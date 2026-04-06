import { createContext, useContext } from "react"
import usePomodoroCollection from "../hooks/usePomodoroCollection"

export const PomodoroContext = createContext(null)

export function PomodoroProvider({ children }) {
    const pomodoro = usePomodoroCollection()
    return (
        <PomodoroContext.Provider value={pomodoro}>
            {children}
        </PomodoroContext.Provider>
    )
}

export function usePomodoro() {
    return useContext(PomodoroContext)
}