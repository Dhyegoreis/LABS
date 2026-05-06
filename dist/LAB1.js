"use strict";
// ============================================================
// Sistema de Gerenciamento de Biblioteca
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
// --- CLASSE LIVRO ---
// Representa um livro do acervo da biblioteca
class Livro {
    codigo;
    titulo;
    autor;
    disponivel;
    // Construtor: inicializa todas as propriedades do livro
    constructor(codigo, titulo, autor, disponivel = true) {
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
    acervo = [];
    // Adiciona um novo livro ao acervo
    adicionarLivro(livro) {
        this.acervo.push(livro);
        console.log(` Livro "${livro.titulo}" adicionado ao acervo.`);
    }
    // Marca o livro como indisponível (emprestado)
    // Lança um erro se o livro não existir ou já estiver emprestado
    registrarEmprestimo(codigo) {
        const livro = this.acervo.find(l => l.codigo === codigo);
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
    consultarDisponibilidade(codigo) {
        const livro = this.acervo.find(l => l.codigo === codigo);
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
function cadastrarLivros(biblioteca) {
    console.log("\n --- Cadastrando livros ---");
    const livro1 = new Livro(1, "O Senhor dos Anéis", "J.R.R. Tolkien");
    const livro2 = new Livro(2, "Dom Casmurro", "Machado de Assis");
    const livro3 = new Livro(3, "1984", "George Orwell");
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
}
// Função para registrar empréstimo de um livro pelo código
function registrarEmprestimo(biblioteca, codigo) {
    console.log("\n --- Registrando empréstimo ---");
    try {
        biblioteca.registrarEmprestimo(codigo);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.log(erro.message);
        }
    }
}
// Função para consultar a disponibilidade de um livro pelo código
function consultarDisponibilidade(biblioteca, codigo) {
    console.log("\n --- Consultando disponibilidade ---");
    try {
        const disponivel = biblioteca.consultarDisponibilidade(codigo);
        if (disponivel) {
            console.log(` Livro ${codigo}: Disponível para empréstimo.`);
        }
        else {
            console.log(` Livro ${codigo}: Indisponível (emprestado).`);
        }
    }
    catch (erro) {
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
//# sourceMappingURL=LAB1.js.map