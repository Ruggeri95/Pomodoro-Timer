import { useNavigate } from "react-router-dom";
import { STATUS_POMODORO } from "./constants/pomodoro";
import { usePomodoro } from "./context/PomodoroContext";
import { Settings, History, Info, RotateCcw, Play, Pause } from "lucide-react"


export default function App() {
  const { iniciar, resetar, formatarTempo, tempo, status,
    tarefa, setTarefa, novoCiclo, historyCycle, ativo } = usePomodoro()
  const navigate = useNavigate()

  return (
    <div id="app">
      <div className="btn-infos">
        <button onClick={() => navigate("/sobre")} className="lucide-icons" title="Sobre"><Info size={20} /></button>
        <button onClick={() => navigate("/historico")} className="lucide-icons" title="Histórico"><History size={20} /></button>
        <button onClick={() => navigate("/config")} className="lucide-icons" title="Configuração"><Settings size={20} /></button>
      </div>
      <h1>Pomodoro Timer</h1>
      <div className="relogio"><h1>{formatarTempo(tempo)}</h1></div>
      <div className="task_inputs">
        {status === STATUS_POMODORO.ESTUDAR && novoCiclo ? (
          <input
            className="ipt-task"
            type="text"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            placeholder="Nome da tarefa"
          />) : null}

        <div className="btn-update">
          {ativo == true ? (
            <button onClick={iniciar} className="btn-play"><Pause size={20}/></button>) 
            : (<button onClick={iniciar} className="btn-pause"><Play size={20} /></button>)}
          <button onClick={resetar} className="btn-reset"><RotateCcw size={20}/></button>
        </div>
      </div>
      <div className="ciclos-container">
        {historyCycle.map((ciclo) =>
          <div
            key={ciclo.id}
            className="ciclo-bolinha"
            style={{ backgroundColor: ciclo.cor }}
            title={ciclo.tarefa}
          />
        )}
        <div>
        </div>
      </div>

    </div>
  )
}