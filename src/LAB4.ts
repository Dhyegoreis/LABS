// ============================================================
// Sistema de Gestão de Tarefas
// ============================================================

// --- CLASSE TAREFA ---
// Representa uma tarefa dentro de um projeto
class Tarefa {
  public id: number;
  public descricao: string;
  public status: string;
  public projeto: string;

  // Construtor: inicializa todas as propriedades da tarefa
  constructor(id: number, descricao: string, status: string, projeto: string) {
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
  private tarefas: Tarefa[] = [];

  // Adiciona uma nova tarefa ao sistema
  // Lança erro se já existir uma tarefa com o mesmo ID
  public adicionarTarefa(tarefa: Tarefa): void {
    const tarefaExistente: Tarefa | undefined = this.tarefas.find(
      t => t.id === tarefa.id
    );

    if (tarefaExistente) {
      throw new Error(` Erro: Já existe uma tarefa com o ID ${tarefa.id}.`);
    }

    this.tarefas.push(tarefa);
    console.log(` Tarefa adicionada: [${tarefa.id}] "${tarefa.descricao}" — Projeto: ${tarefa.projeto}`);
  }

  // Atualiza o status da tarefa com o ID especificado
  // Lança erro se a tarefa não existir ou o status for inválido
  public atualizarStatus(id: number, status: string): void {
    const statusValidos: string[] = ["Pendente", "Em Andamento", "Concluída"];

    if (!statusValidos.includes(status)) {
      throw new Error(`Erro: Status "${status}" inválido. Use: ${statusValidos.join(", ")}.`);
    }

    const tarefa: Tarefa | undefined = this.tarefas.find(t => t.id === id);

    if (!tarefa) {
      throw new Error(` Erro: Tarefa com ID ${id} não encontrada.`);
    }

    const statusAntigo: string = tarefa.status;
    tarefa.status = status;
    console.log(` Tarefa [${id}] atualizada: "${statusAntigo}" → "${status}"`);
  }

  // Retorna todas as tarefas pertencentes ao projeto especificado
  public consultarTarefasPorProjeto(projeto: string): Tarefa[] {
    const tarefasDoProjeto: Tarefa[] = this.tarefas.filter(
      t => t.projeto.toLowerCase() === projeto.toLowerCase()
    );

    return tarefasDoProjeto;
  }
}

// ============================================================
// FUNÇÕES DE TESTE
// ============================================================

// Função para adicionar tarefas ao gestor
function adicionarTarefas(gestor: GestorTarefas): void {
  console.log("\n --- Adicionando tarefas ---");

  const tarefa1: Tarefa = new Tarefa(1, "Criar banco de dados", "Pendente", "Sistema de Vendas");
  const tarefa2: Tarefa = new Tarefa(2, "Desenvolver tela de login", "Em Andamento", "Sistema de Vendas");
  const tarefa3: Tarefa = new Tarefa(3, "Configurar servidor", "Pendente", "Infraestrutura");
  const tarefa4: Tarefa = new Tarefa(4, "Escrever documentação", "Pendente", "Sistema de Vendas");

  gestor.adicionarTarefa(tarefa1);
  gestor.adicionarTarefa(tarefa2);
  gestor.adicionarTarefa(tarefa3);
  gestor.adicionarTarefa(tarefa4);
}

// Função para atualizar o status de uma tarefa pelo ID
function atualizarStatus(gestor: GestorTarefas, id: number, novoStatus: string): void {
  console.log("\n --- Atualizando status ---");
  try {
    gestor.atualizarStatus(id, novoStatus);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(erro.message);
    }
  }
}

// Função para consultar e exibir as tarefas de um projeto específico
function consultarTarefasPorProjeto(gestor: GestorTarefas, projeto: string): void {
  console.log(`\n --- Consultando tarefas do projeto "${projeto}" ---`);

  const tarefas: Tarefa[] = gestor.consultarTarefasPorProjeto(projeto);

  if (tarefas.length === 0) {
    console.log(` Nenhuma tarefa encontrada para o projeto "${projeto}".`);
    return;
  }

  console.log(` ${tarefas.length} tarefa(s) encontrada(s):`);
  tarefas.forEach((t: Tarefa) => {
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
  const tarefaDuplicada: Tarefa = new Tarefa(1, "Tarefa duplicada", "Pendente", "Sistema de Vendas");
  gestor.adicionarTarefa(tarefaDuplicada);
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(erro.message);
  }
}