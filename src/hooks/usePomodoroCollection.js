import { useState, useEffect } from "react";
import { STATUS_POMODORO, CORES_STATUS, TIPO_POMODORO } from "../constants/pomodoro";

let intervaloGlobal = null

export default function usePomodoroCollection() {

    const [tempoTrabalho, setTempoTrabalho] = useState(() => {
        return Number(localStorage.getItem("obc-tempo-trabalho")) || 1500
    })

    const [tempo, setTempo] = useState(() => {
        return Number(localStorage.getItem("obc-tempo")) || tempoTrabalho
    })

    const [tempoDescanso, setTempoDescanso] = useState(() => {
        return Number(localStorage.getItem("obc-tempo-descanso")) || 600
    })

    const [tempoDescansoXL, setTempoDescansoXL] = useState(() => {
        return Number(localStorage.getItem("obc-tempo-descanso-XL")) || 300
    })

    const [ativo, setAtivo] = useState(() => {
        return localStorage.getItem("obc-ativo") === "true"
    })
    const [ciclo, setCiclo] = useState(() => {
        return Number(localStorage.getItem("obc-ciclo")) || 1
    })
    const [tarefa, setTarefa] = useState("")
    const [novoCiclo, setNovoCiclo] = useState(() => {
        return localStorage.getItem("obc-novo-ciclo") !== "false"
    })
    const [status, setStatus] = useState(() => {
        return localStorage.getItem("obc-status") || STATUS_POMODORO.ESTUDAR
    })


    const [historyCycle, setHistoryCycle] = useState(() => {
        const saved = localStorage.getItem("obc-history-cycle")
        return saved ? JSON.parse(saved) : []
    })

    const addHistory = (statusAtual, tarefa, tempo) => {
        const id = Math.floor(Math.random() * 1000000)
        const date = new Date().toLocaleString("pt-PT")
        const novoItem = {
            id,
            status: statusAtual,
            cor: CORES_STATUS[statusAtual],
            tarefa: tarefa || "Trabalho",
            data: date,
            tipo: TIPO_POMODORO[statusAtual],
            duracao: tempo
        }
        setHistoryCycle(state => {
            const newState = [...state, novoItem]
            localStorage.setItem("obc-history-cycle", JSON.stringify(newState))
            return newState
        })
    }

    const removeHistory = (id) => {
        setHistoryCycle(state => {
            const newState = state.filter(game => game.id !== id)
            localStorage.setItem("obc-history-cycle", JSON.stringify(newState))
            return newState
        })
    }

    function tocarAlarme() {
    const contexto = new AudioContext()
    const oscilador = contexto.createOscillator()
    const ganho = contexto.createGain()

    oscilador.connect(ganho)
    ganho.connect(contexto.destination)

    oscilador.type = "sine"
    oscilador.frequency.setValueAtTime(880, contexto.currentTime)

    ganho.gain.setValueAtTime(1, contexto.currentTime)
    ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 1.5)

    oscilador.start(contexto.currentTime)
    oscilador.stop(contexto.currentTime + 1.5)
}

    function iniciar() {
        if (intervaloGlobal){
            clearInterval(intervaloGlobal)
                intervaloGlobal = null
                setAtivo(false)
                localStorage.setItem("obc-ativo", "false")
                return
        }

        if (novoCiclo) {
            addHistory(status, tarefa, tempo)
            setNovoCiclo(false)
            localStorage.setItem("obc-novo-ciclo", "false")
            setTarefa("")
        }

        setAtivo(true)
        localStorage.setItem("obc-ativo", "true")
        intervaloGlobal = setInterval(() => {
            setTempo(state => {
                if (state <= 0) {
                    clearInterval(intervaloGlobal)
                    intervaloGlobal = null
                    tocarAlarme()
                    return 0
                }
                const novoTempo = state - 1
                localStorage.setItem("obc-tempo", novoTempo)
                return novoTempo
            })
        }, 1000);
    }

    function resetar() {
        clearInterval(intervaloGlobal)
        intervaloGlobal = null
        setAtivo(false)
        localStorage.setItem("obc-ativo", "false")
        setNovoCiclo(true)
        localStorage.setItem("obc-novo-ciclo", "true")
        setTarefa("")
        if (status == STATUS_POMODORO.ESTUDAR) {
            if (ciclo == 4) {
                setStatus(STATUS_POMODORO.DESCANSAR_DOBRO)
                setCiclo(1)
                setTempo(tempoDescansoXL)
                setTarefa(`Descansar ${tempoDescansoXL / 60} minutos`)
                localStorage.setItem("obc-status", STATUS_POMODORO.DESCANSAR_DOBRO)
                localStorage.setItem("obc-ciclo", 1)
                localStorage.setItem("obc-tempo", tempoDescansoXL)
            } else {
                setStatus(STATUS_POMODORO.DESCANSAR)
                setCiclo(ciclo + 1)
                setTempo(tempoDescanso)
                setTarefa(`Descansar ${tempoDescanso / 60} minutos`)
                localStorage.setItem("obc-status", STATUS_POMODORO.DESCANSAR)
                localStorage.setItem("obc-ciclo", ciclo + 1)
                localStorage.setItem("obc-tempo", tempoDescanso)
            }
        } else {
            setStatus(STATUS_POMODORO.ESTUDAR)
            setTempo(tempoTrabalho)
            localStorage.setItem("obc-status", STATUS_POMODORO.ESTUDAR)
            localStorage.setItem("obc-tempo", tempoTrabalho)
        }
    }

    useEffect(() => {
        if (ativo && !intervaloGlobal) {
            intervaloGlobal = setInterval(() => {
                setTempo(state => {
                    if (state <= 0) {
                        clearInterval(intervaloGlobal)
                        intervaloGlobal = null
                        return 0
                    }
                    const novoTempo = state - 1
                    localStorage.setItem("obc-tempo", novoTempo)
                    return novoTempo
                })
            }, 1000)
        }
        return () => {

        }
    }, [])

    function formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60)
        const segs = segundos % 60
        return `${String(minutos).padStart(2, "0")}:${String(segs).padStart(2, "0")}`
    }

    return {
        addHistory, removeHistory, iniciar, resetar, setTempo,
        formatarTempo, tempo, status, tarefa, setTarefa, setNovoCiclo,
        novoCiclo, historyCycle, ativo, tempoTrabalho, setTempoTrabalho,
        tempoDescanso, setTempoDescanso, tempoDescansoXL, setTempoDescansoXL, ciclo
    }
}