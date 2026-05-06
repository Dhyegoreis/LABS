"use strict";
// ============================================================
// Sistema de Gestão de Tarefas
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
// --- CLASSE TAREFA ---
// Representa uma tarefa dentro de um projeto
class Tarefa {
    id;
    descricao;
    status;
    projeto;
    // Construtor: inicializa todas as propriedades da tarefa
    constructor(id, descricao, status, projeto) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
        this.projeto = projeto;
    }
}
// --- CLASSE GESTORTAREFAS ---
// Gerencia a lista de tarefas da equipe
class GestorTarefas {
    // Propriedade privada: só pode ser acessada dentro desta classe
    tarefas = [];
    // Adiciona uma nova tarefa ao sistema
    // Lança erro se já existir uma tarefa com o mesmo ID
    adicionarTarefa(tarefa) {
        const tarefaExistente = this.tarefas.find(t => t.id === tarefa.id);
        if (tarefaExistente) {
            throw new Error(` Erro: Já existe uma tarefa com o ID ${tarefa.id}.`);
        }
        this.tarefas.push(tarefa);
        console.log(` Tarefa adicionada: [${tarefa.id}] "${tarefa.descricao}" — Projeto: ${tarefa.projeto}`);
    }
    // Atualiza o status da tarefa com o ID especificado
    // Lança erro se a tarefa não existir ou o status for inválido
    atualizarStatus(id, status) {
        const statusValidos = ["Pendente", "Em Andamento", "Concluída"];
        if (!statusValidos.includes(status)) {
            throw new Error(`Erro: Status "${status}" inválido. Use: ${statusValidos.join(", ")}.`);
        }
        const tarefa = this.tarefas.find(t => t.id === id);
        if (!tarefa) {
            throw new Error(` Erro: Tarefa com ID ${id} não encontrada.`);
        }
        const statusAntigo = tarefa.status;
        tarefa.status = status;
        console.log(` Tarefa [${id}] atualizada: "${statusAntigo}" → "${status}"`);
    }
    // Retorna todas as tarefas pertencentes ao projeto especificado
    consultarTarefasPorProjeto(projeto) {
        const tarefasDoProjeto = this.tarefas.filter(t => t.projeto.toLowerCase() === projeto.toLowerCase());
        return tarefasDoProjeto;
    }
}
// ============================================================
// FUNÇÕES DE TESTE
// ============================================================
// Função para adicionar tarefas ao gestor
function adicionarTarefas(gestor) {
    console.log("\n --- Adicionando tarefas ---");
    const tarefa1 = new Tarefa(1, "Criar banco de dados", "Pendente", "Sistema de Vendas");
    const tarefa2 = new Tarefa(2, "Desenvolver tela de login", "Em Andamento", "Sistema de Vendas");
    const tarefa3 = new Tarefa(3, "Configurar servidor", "Pendente", "Infraestrutura");
    const tarefa4 = new Tarefa(4, "Escrever documentação", "Pendente", "Sistema de Vendas");
    gestor.adicionarTarefa(tarefa1);
    gestor.adicionarTarefa(tarefa2);
    gestor.adicionarTarefa(tarefa3);
    gestor.adicionarTarefa(tarefa4);
}
// Função para atualizar o status de uma tarefa pelo ID
function atualizarStatus(gestor, id, novoStatus) {
    console.log("\n --- Atualizando status ---");
    try {
        gestor.atualizarStatus(id, novoStatus);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.log(erro.message);
        }
    }
}
// Função para consultar e exibir as tarefas de um projeto específico
function consultarTarefasPorProjeto(gestor, projeto) {
    console.log(`\n --- Consultando tarefas do projeto "${projeto}" ---`);
    const tarefas = gestor.consultarTarefasPorProjeto(projeto);
    if (tarefas.length === 0) {
        console.log(` Nenhuma tarefa encontrada para o projeto "${projeto}".`);
        return;
    }
    console.log(` ${tarefas.length} tarefa(s) encontrada(s):`);
    tarefas.forEach((t) => {
        console.log(`   [ID: ${t.id}] ${t.descricao} — Status: ${t.status}`);
    });
}
// ============================================================
// EXECUÇÃO DOS TESTES
// ============================================================
const gestor = new GestorTarefas();
// 1. Adiciona as tarefas
adicionarTarefas(gestor);
// 2. Consulta tarefas do projeto "Sistema de Vendas" antes das atualizações
consultarTarefasPorProjeto(gestor, "Sistema de Vendas");
// 3. Atualiza o status de algumas tarefas
atualizarStatus(gestor, 1, "Em Andamento");
atualizarStatus(gestor, 2, "Concluída");
// 4. Consulta novamente para ver as mudanças
consultarTarefasPorProjeto(gestor, "Sistema de Vendas");
// 5. Testa erro: status inválido
atualizarStatus(gestor, 3, "Pausada");
// 6. Testa erro: tarefa inexistente
atualizarStatus(gestor, 99, "Concluída");
// 7. Testa erro: projeto sem tarefas
consultarTarefasPorProjeto(gestor, "Projeto Inexistente");
// 8. Testa erro: ID duplicado
console.log("\n📋 --- Adicionando tarefas ---");
try {
    const tarefaDuplicada = new Tarefa(1, "Tarefa duplicada", "Pendente", "Sistema de Vendas");
    gestor.adicionarTarefa(tarefaDuplicada);
}
catch (erro) {
    if (erro instanceof Error) {
        console.log(erro.message);
    }
}
//# sourceMappingURL=LAB4.js.map