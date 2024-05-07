export function criarNovaTarefa() {
  const tarefasAFazer = document.getElementById("a_fazer")
  const inputNovaTarefa = document.getElementById("nova_tarefa_input")
  const nome = inputNovaTarefa.value
  const id = document.getElementsByClassName("tarefa").length
  const estado = "a_fazer"

  const tarefa = document.createElement("p")
  tarefa.classList.add("tarefa")
  tarefa.id = id
  tarefa.draggable = true
  tarefa.dataset.estado = estado

  const data = JSON.parse(localStorage.getItem("tarefas")) || []

  localStorage.setItem(
    "tarefas",
    JSON.stringify([...data, { nome, id, estado: "a_fazer" }]),
  )

  tarefa.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/json", JSON.stringify({ nome, id, estado }))
    e.target.classList.add("drag")
  })

  tarefa.addEventListener("dragend", (e) => {
    e.target.classList.remove("drag")
  })

  tarefa.innerText = nome
  tarefasAFazer.appendChild(tarefa)
}

export function configurarAlvo(alvo) {
  alvo.addEventListener("dragover", (e) => {
    e.preventDefault()
    e.currentTarget.classList.add("drag")
  })

  alvo.addEventListener("dragleave", (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove("drag")
  })

  alvo.addEventListener("drop", (e) => {
    const data = JSON.parse(e.dataTransfer.getData("text/json"))
    const source = document.getElementById(data.id)
    source.dataset.estado = e.target.id
    e.currentTarget.appendChild(source)
    e.currentTarget.classList.remove("drag")

    atualizarStorage()
  })
}

export function exibirTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
  if (tarefas) {
    for (let { nome, id, estado } of tarefas) {
      const container = document.getElementById(estado)

      const tarefaP = document.createElement("p")
      tarefaP.classList.add("tarefa")
      tarefaP.id = id
      tarefaP.draggable = true
      tarefaP.dataset.estado = estado

      tarefaP.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/json", JSON.stringify({ nome, id, estado }))
        e.target.classList.add("drag")
      })

      tarefaP.addEventListener("dragend", (e) => {
        e.target.classList.remove("drag")
      })

      tarefaP.innerText = nome
      container.appendChild(tarefaP)
    }
  }
}

export function atualizarStorage() {
  const tarefas = document.getElementsByClassName("tarefa")
  let novasTarefas = []
  for (let tarefa of tarefas) {
    const nome = tarefa.innerText
    const id = tarefa.id
    const estado = tarefa.dataset.estado
    novasTarefas = novasTarefas.concat([{ nome, id, estado }])
  }
  localStorage.setItem("tarefas", JSON.stringify(novasTarefas))
}
