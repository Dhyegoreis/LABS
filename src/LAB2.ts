// ============================================================
// Sistema de Gerenciamento de Funcionários
// ============================================================

// --- CLASSE FUNCIONARIO ---
// Representa um funcionário da empresa
class Funcionario {
  public matricula: number;
  public nome: string;
  public cargo: string;
  public salario: number;

  // Construtor: inicializa todas as propriedades do funcionário
  constructor(matricula: number, nome: string, cargo: string, salario: number) {
    this.matricula = matricula;
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }
}

// --- CLASSE EMPRESA ---
// Gerencia a lista de funcionários e as operações de RH
class Empresa {
  // Propriedade privada: só pode ser acessada dentro desta classe
  private funcionarios: Funcionario[] = [];

  // Adiciona um novo funcionário à empresa
  public adicionarFuncionario(funcionario: Funcionario): void {
    this.funcionarios.push(funcionario);
    console.log(` Funcionário "${funcionario.nome}" cadastrado com sucesso.`);
  }

  // Atualiza o salário do funcionário com a matrícula especificada
  // Lança um erro se o funcionário não existir ou se o salário for inválido
  public atualizarSalario(matricula: number, salario: number): void {
    const funcionario: Funcionario | undefined = this.funcionarios.find(
      f => f.matricula === matricula
    );

    if (!funcionario) {
      throw new Error(` Erro: Funcionário com matrícula ${matricula} não encontrado.`);
    }

    if (salario <= 0) {
      throw new Error(` Erro: O salário deve ser um valor positivo.`);
    }

    const salarioAntigo: number = funcionario.salario;
    funcionario.salario = salario;
    console.log(` Salário de "${funcionario.nome}" atualizado: R$ ${salarioAntigo.toFixed(2)} → R$ ${salario.toFixed(2)}`);
  }

  // Retorna o funcionário com a matrícula especificada, ou undefined se não encontrado
  public consultarFuncionario(matricula: number): Funcionario | undefined {
    const funcionario: Funcionario | undefined = this.funcionarios.find(
      f => f.matricula === matricula
    );

    return funcionario;
  }
}

// ============================================================
// FUNÇÕES DE TESTE
// ============================================================

// Função para cadastrar funcionários na empresa
function cadastrarFuncionarios(empresa: Empresa): void {
  console.log("\n --- Cadastrando funcionários ---");

  const func1: Funcionario = new Funcionario(101, "Ana Souza", "Desenvolvedora", 7500.00);
  const func2: Funcionario = new Funcionario(102, "Carlos Lima", "Designer", 5800.00);
  const func3: Funcionario = new Funcionario(103, "Mariana Costa", "Gerente de Projetos", 9200.00);

  empresa.adicionarFuncionario(func1);
  empresa.adicionarFuncionario(func2);
  empresa.adicionarFuncionario(func3);
}

// Função para atualizar o salário de um funcionário pela matrícula
function atualizarSalario(empresa: Empresa, matricula: number, novoSalario: number): void {
  console.log("\n --- Atualizando salário ---");
  try {
    empresa.atualizarSalario(matricula, novoSalario);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(erro.message);
    }
  }
}

// Função para consultar e exibir as informações de um funcionário
function consultarFuncionario(empresa: Empresa, matricula: number): void {
  console.log("\n --- Consultando funcionário ---");
  const funcionario: Funcionario | undefined = empresa.consultarFuncionario(matricula);

  if (funcionario) {
    console.log(`📋 Informações do funcionário:`);
    console.log(`   Matrícula : ${funcionario.matricula}`);
    console.log(`   Nome      : ${funcionario.nome}`);
    console.log(`   Cargo     : ${funcionario.cargo}`);
    console.log(`   Salário   : R$ ${funcionario.salario.toFixed(2)}`);
  } else {
    console.log(` Erro: Funcionário com matrícula ${matricula} não encontrado.`);
  }
}

// ============================================================
// EXECUÇÃO DOS TESTES
// ============================================================

const empresa = new Empresa();

// 1. Cadastra os funcionários
cadastrarFuncionarios(empresa);

// 2. Consulta um funcionário antes da atualização
consultarFuncionario(empresa, 101);

// 3. Atualiza o salário do funcionário 101
atualizarSalario(empresa, 101, 8500.00);

// 4. Consulta o funcionário após a atualização para confirmar a mudança
consultarFuncionario(empresa, 101);

// 5. Testa erro: tenta atualizar salário com valor inválido
atualizarSalario(empresa, 102, -500);

// 6. Testa erro: tenta consultar funcionário inexistente
consultarFuncionario(empresa, 999);

// 7. Testa erro: tenta atualizar funcionário inexistente
atualizarSalario(empresa, 999, 5000);