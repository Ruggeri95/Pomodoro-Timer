import { useNavigate } from "react-router-dom"
import { usePomodoro } from "../../context/PomodoroContext"
import { useState } from "react"
import { Trash } from 'lucide-react';
import './index.css'

export default function Historico() {
    const { removeHistory, historyCycle } = usePomodoro()
    const [deletar, setDeletar] = useState(false)
    const navigate = useNavigate()

    return (
        <div id="historico">
            <div className="main">
                <h1>Histórico</h1>
                <button className="btn-delete" onClick={() => setDeletar(prev => !prev)}><Trash size={20} /></button>
            </div>
            <div className="historico">
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duração (min)</th>
                            <th>Data</th>
                            <th>Tipo</th>
                            {deletar&&<th>Deletar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {historyCycle.map((ciclo) => (
                            <tr key={ciclo.id}>

                                <td>{ciclo.tarefa}</td>
                                <td>{ciclo.duracao / 60}</td>
                                <td>{ciclo.data}</td>
                                <td>{ciclo.tipo}</td>
                                {deletar == true ?
                                    <td><button className="btn-deletar" onClick={() => removeHistory(ciclo.id)}><Trash size={18} /></button></td> : null
                                }
                            </tr>))}
                    </tbody>
                </table>
            </div>
            <button className="btn-voltar" onClick={() => navigate("/")}>Voltar</button>
        </div >
    )
}

