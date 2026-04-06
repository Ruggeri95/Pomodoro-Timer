import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePomodoro } from "../../context/PomodoroContext"
import { STATUS_POMODORO } from "../../constants/pomodoro"
import './index.css'

export default function Config() {
    const navigate = useNavigate()

    const { setTempo, tempoTrabalho, setTempoTrabalho,
        tempoDescanso, setTempoDescanso, tempoDescansoXL, setTempoDescansoXL,
        status, ativo, setNovoCiclo } = usePomodoro()

    const [inputTrabalho, setInputTrabalho] = useState(tempoTrabalho / 60)
    const [inputDescanso, setInputDescanso] = useState(tempoDescanso / 60)
    const [inputDescansoXL, setInputDescansoXL] = useState(tempoDescansoXL / 60)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (ativo) return

        const trabalho = Number(inputTrabalho) * 60
        const descanso = Number(inputDescanso) * 60
        const descansoXL = Number(inputDescansoXL) * 60

        if (!trabalho || !descanso || !descansoXL) return

        setTempoTrabalho(trabalho)
        setTempoDescanso(descanso)
        setTempoDescansoXL(descansoXL)
        localStorage.setItem("obc-tempo-trabalho", trabalho)
        localStorage.setItem("obc-tempo-descanso", descanso)
        localStorage.setItem("obc-tempo-descanso-XL", descansoXL)

        if (status === STATUS_POMODORO.ESTUDAR) {
            setTempo(trabalho)
            localStorage.setItem("obc-tempo", trabalho)
        } else if (status === STATUS_POMODORO.DESCANSAR) {
            setTempo(descanso)
            localStorage.setItem("obc-tempo", descanso)
        } else {
            setTempo(descansoXL)
            localStorage.setItem("obc-tempo", descansoXL)
        }

        setNovoCiclo(true)
        localStorage.setItem("obc-novo-ciclo", "true")

        navigate("/")
    }

    return (
        <div id="config">
            <h1>Configuração</h1>
            <h2>Configure os minutos para as etapas do Pomodoro</h2>

            <form onSubmit={handleSubmit}>
                {ativo && (
                    <p style={{color:"red", fontSize: "13px"}}>Para o cronômetro antes de alterar as configurações.</p>
                )}
                <label htmlFor="foco">Foco (min)</label>
                <input type="number" name="foco" id="foco"
                    min={1} max={60}
                    value={inputTrabalho}
                    onChange={(e) => setInputTrabalho(e.target.value)} 
                />
                <label htmlFor="descanso">Descanso (min)</label>
                <input type="number" name="descanso" id="descanso"
                    min={1} max={25}
                    value={inputDescanso}
                    onChange={(e) => setInputDescanso(e.target.value)}
                />
                <label htmlFor="descansoXL">Descanso longo (min)</label>
                <input type="number" name="descansoXL" id="descansoXL"
                    min={1} max={45}
                    value={inputDescansoXL}
                    onChange={(e) => setInputDescansoXL(e.target.value)}
                />
                <button type="submit">Alterar</button>
            </form>
            <button className="btn-voltar" onClick={() => navigate("/")}>Voltar</button>
        </div>
    )
}