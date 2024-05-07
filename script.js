import { configurarAlvo, criarNovaTarefa, exibirTarefas } from "./functions.js"

exibirTarefas()

const botaoNovaTarefa = document.getElementById("nova_tarefa_botao")
botaoNovaTarefa.addEventListener("click", criarNovaTarefa)

const alvos = document.getElementsByClassName("tarefas")
for (let alvo of alvos) {
  configurarAlvo(alvo)
}
