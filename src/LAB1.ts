// ============================================================
// Sistema de Gerenciamento de Biblioteca
// ============================================================

// --- CLASSE LIVRO ---
// Representa um livro do acervo da biblioteca
class Livro {
  public codigo: number;
  public titulo: string;
  public autor: string;
  public disponivel: boolean;

  // Construtor: inicializa todas as propriedades do livro
  constructor(codigo: number, titulo: string, autor: string, disponivel: boolean = true) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = disponivel;
  }
}

// --- CLASSE BIBLIOTECA ---
// Gerencia o acervo de livros e operações de empréstimo
class Biblioteca {
  // Propriedade privada: só pode ser acessada dentro desta classe
  private acervo: Livro[] = [];

  // Adiciona um novo livro ao acervo
  public adicionarLivro(livro: Livro): void {
    this.acervo.push(livro);
    console.log(` Livro "${livro.titulo}" adicionado ao acervo.`);
  }

  // Marca o livro como indisponível (emprestado)
  // Lança um erro se o livro não existir ou já estiver emprestado
  public registrarEmprestimo(codigo: number): void {
    const livro: Livro | undefined = this.acervo.find(l => l.codigo === codigo);

    if (!livro) {
      throw new Error(` Erro: Livro com código ${codigo} não encontrado no acervo.`);
    }

    if (!livro.disponivel) {
      throw new Error(` Erro: Livro "${livro.titulo}" já está emprestado.`);
    }

    livro.disponivel = false;
    console.log(` Empréstimo registrado: "${livro.titulo}" agora está indisponível.`);
  }

  // Retorna true se o livro estiver disponível, false caso contrário
  // Lança um erro se o livro não existir
  public consultarDisponibilidade(codigo: number): boolean {
    const livro: Livro | undefined = this.acervo.find(l => l.codigo === codigo);

    if (!livro) {
      throw new Error(` Erro: Livro com código ${codigo} não encontrado no acervo.`);
    }

    return livro.disponivel;
  }
}

// ============================================================
// FUNÇÕES DE TESTE
// ============================================================

// Função para cadastrar livros no acervo
function cadastrarLivros(biblioteca: Biblioteca): void {
  console.log("\n --- Cadastrando livros ---");

  const livro1: Livro = new Livro(1, "O Senhor dos Anéis", "J.R.R. Tolkien");
  const livro2: Livro = new Livro(2, "Dom Casmurro", "Machado de Assis");
  const livro3: Livro = new Livro(3, "1984", "George Orwell");

  biblioteca.adicionarLivro(livro1);
  biblioteca.adicionarLivro(livro2);
  biblioteca.adicionarLivro(livro3);
}

// Função para registrar empréstimo de um livro pelo código
function registrarEmprestimo(biblioteca: Biblioteca, codigo: number): void {
  console.log("\n --- Registrando empréstimo ---");
  try {
    biblioteca.registrarEmprestimo(codigo);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(erro.message);
    }
  }
}

// Função para consultar a disponibilidade de um livro pelo código
function consultarDisponibilidade(biblioteca: Biblioteca, codigo: number): void {
  console.log("\n --- Consultando disponibilidade ---");
  try {
    const disponivel: boolean = biblioteca.consultarDisponibilidade(codigo);
    if (disponivel) {
      console.log(` Livro ${codigo}: Disponível para empréstimo.`);
    } else {
      console.log(` Livro ${codigo}: Indisponível (emprestado).`);
    }
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(erro.message);
    }
  }
}

// ============================================================
// EXECUÇÃO DOS TESTES
// ============================================================

const biblioteca = new Biblioteca();

// 1. Cadastra os livros
cadastrarLivros(biblioteca);

// 2. Consulta disponibilidade antes do empréstimo
consultarDisponibilidade(biblioteca, 1);

// 3. Registra empréstimo do livro 1
registrarEmprestimo(biblioteca, 1);

// 4. Consulta disponibilidade após o empréstimo
consultarDisponibilidade(biblioteca, 1);

// 5. Tenta emprestar o mesmo livro novamente (teste de erro)
registrarEmprestimo(biblioteca, 1);

// 6. Tenta consultar um livro inexistente (teste de erro)
consultarDisponibilidade(biblioteca, 99);