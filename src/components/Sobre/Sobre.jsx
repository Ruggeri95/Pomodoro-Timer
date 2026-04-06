import { useNavigate } from "react-router-dom"
import './index.css'

const beneficios = [
  { icon: "🎯", titulo: "Foco mais profundo", texto: "Blocos curtos tornam o foco alcançável, mesmo nos dias mais difíceis." },
  { icon: "😤", titulo: "Menos procrastinação", texto: '"Só 25 minutos" é muito menos intimidador do que "trabalhar o dia todo".' },
  { icon: "📊", titulo: "Visibilidade do progresso", texto: "Cada pomodoro concluído é uma pequena vitória tangível." },
  { icon: "🔋", titulo: "Energia sustentada", texto: "Pausas regulares evitam o esgotamento mental ao longo do dia." },
  { icon: "📈", titulo: "Estimativa de tarefas", texto: "Com o tempo você aprende quantos pomodoros cada tipo de tarefa exige." },
  { icon: "🧘", titulo: "Menos ansiedade", texto: "Saber que há uma pausa próxima reduz a resistência ao trabalho." },
]

const passos = [
  { num: "01", titulo: "Escolha uma tarefa", texto: "Defina exatamente o que você vai fazer nesse bloco. Quanto mais específico, melhor." },
  { num: "02", titulo: "Inicie o timer por 25 minutos", texto: "Mergulhe na tarefa com total dedicação. Sem redes sociais, sem notificações, sem interrupções." },
  { num: "03", titulo: "Trabalhe até o timer tocar", texto: "Se surgir uma ideia ou distração, anote em um papel e continue. Não quebre o ciclo." },
  { num: "04", titulo: "Faça uma pausa de 5 minutos", texto: "Levante, estique o corpo, respire. Esse descanso é parte do método, não preguiça." },
  { num: "05", titulo: "Repita 4 vezes", texto: "Após 4 pomodoros, faça uma pausa mais longa de 15 a 30 minutos. Você merece!" },
]

const tempos = [
  { label: "Foco", valor: "25 min", desc: "Trabalho sem interrupções" },
  { label: "Pausa curta", valor: "5 min", desc: "Descanso leve entre ciclos" },
  { label: "Pausa longa", valor: "15–30 min", desc: "Após 4 pomodoros seguidos" },
  { label: "Ciclo completo", valor: "4×", desc: "Antes da pausa longa" },
]

export default function Sobre() {
  const navigate = useNavigate()

  return (
    <div className="sobre-page">
      <div className="sobre-hero">
        <span className="sobre-tomato">🍅</span>
        <h1>A técnica Pomodoro</h1>
        <p>O método simples que transformou a forma como o mundo trabalha e estuda</p>
      </div>

      <div className="sobre-section">
        <h2>📖 Como tudo começou</h2>
        <p>
          No final dos anos 1980, um estudante universitário italiano chamado Francesco Cirillo estava
          tendo dificuldades para se concentrar nos estudos. Frustrado com a própria falta de foco,
          ele pegou um timer de cozinha em formato de tomate — <em>pomodoro</em> em italiano — e fez
          uma aposta consigo mesmo: se concentrar por apenas 10 minutos seguidos.
        </p>
        <p>
          Funcionou. E o que começou como um experimento pessoal se tornou um dos métodos de
          produtividade mais populares do planeta. Cirillo documentou a técnica em um livro publicado
          em 2006 e hoje ela é usada por milhões de pessoas ao redor do mundo.
        </p>
        <div className="sobre-quote">
          <p>
            "A ideia por trás da técnica é simples: o cérebro humano não foi feito para se concentrar
            indefinidamente. Ele precisa de pausas regulares para consolidar o aprendizado e recarregar
            a energia mental."
          </p>
        </div>
      </div>

      <div className="sobre-divider" />

      <div className="sobre-section">
        <h2>⚙️ Como funciona na prática</h2>
        <p>
          A técnica divide o trabalho em blocos de tempo chamados <strong>pomodoros</strong>, separados
          por pausas curtas. A estrutura padrão é esta:
        </p>
        <div className="sobre-cards">
          {tempos.map((t) => (
            <div className="sobre-card" key={t.label}>
              <p className="sobre-card-label">{t.label}</p>
              <p className="sobre-card-valor">{t.valor}</p>
              <p className="sobre-card-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sobre-section">
        <h2>📋 O passo a passo do ciclo</h2>
        <ul className="sobre-steps">
          {passos.map((p) => (
            <li key={p.num}>
              <span className="sobre-step-num">{p.num}</span>
              <span className="sobre-step-txt">
                <strong>{p.titulo}</strong> — {p.texto}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sobre-divider" />

      <div className="sobre-section">
        <h2>🧠 Por que funciona? A ciência por trás</h2>
        <p>
          Não é só disciplina — tem neurociência envolvida. O cérebro humano opera em ciclos de atenção
          que variam entre 20 e 45 minutos. Forçar concentração além desse limite sem pausa reduz a
          eficiência e aumenta o estresse.
        </p>
        <p>
          As pausas regulares permitem que o cérebro consolide informações na memória de longo prazo,
          processo conhecido como <strong>consolidação da memória offline</strong>. É por isso que muitas
          vezes uma solução aparece durante uma pausa, e não durante o esforço intenso.
        </p>
        <p>
          Além disso, o timer cria um senso de urgência saudável — conhecido como{" "}
          <strong>Lei de Parkinson</strong>, que diz que o trabalho se expande para preencher o tempo
          disponível. Limitar o tempo força o cérebro a focar no que realmente importa.
        </p>
      </div>

      <div className="sobre-section">
        <h2>✨ Benefícios comprovados</h2>
        <div className="sobre-benefits">
          {beneficios.map((b) => (
            <div className="sobre-benefit" key={b.titulo}>
              <span className="sobre-benefit-icon">{b.icon}</span>
              <div>
                <p className="sobre-benefit-titulo">{b.titulo}</p>
                <p className="sobre-benefit-texto">{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sobre-divider" />

      <div className="sobre-section">
        <h2>💡 Dicas para aproveitar ao máximo</h2>
        <p>
          <strong>Proteja o seu pomodoro.</strong> Se uma interrupção inevitável acontecer, reinicie o
          timer. Um pomodoro quebrado não conta.
        </p>
        <p>
          <strong>Use a pausa de verdade.</strong> Ficar no computador durante a pausa anula o benefício.
          Levante, olhe para longe, tome água.
        </p>
        <p>
          <strong>Adapte os tempos.</strong> Os 25 minutos são um ponto de partida, não uma lei. Algumas
          pessoas preferem ciclos de 50/10. Encontre o ritmo que funciona para você.
        </p>
        <p>
          <strong>Registre suas tarefas.</strong> Anotar o que foi feito em cada pomodoro cria um
          histórico valioso e aumenta a sensação de realização.
        </p>
      </div>

      <div className="sobre-section">
        <h2>🌍 Quem usa a técnica Pomodoro</h2>
        <p>
          A técnica é usada por estudantes, desenvolvedores, escritores, designers, pesquisadores e
          profissionais de todas as áreas. Empresas como Adobe, Microsoft e diversas startups de
          tecnologia recomendam o método para suas equipes.
        </p>
        <p>
          No mundo do desenvolvimento de software, o Pomodoro se tornou especialmente popular por
          combinar bem com ciclos ágeis e a necessidade de manter o foco em tarefas complexas sem
          acumular fadiga mental.
        </p>
      </div>

      <div className="sobre-divider" />

      <div className="sobre-footer">
        <span>🍅</span>
        <p>
          A beleza do Pomodoro está na sua simplicidade. Você não precisa de nenhum aplicativo especial,
          nenhum treinamento longo — apenas a decisão de se concentrar por 25 minutos de cada vez.
        </p>
      </div>

      <div className="sobre-voltar">
        <button onClick={() => navigate("/")}>← Voltar ao timer</button>
      </div>
    </div>
  )
}
