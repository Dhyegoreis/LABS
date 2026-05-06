# 👥 Sistema de Gerenciamento de Funcionários

Aplicação em TypeScript para gerenciar funcionários de uma empresa.

---

##  Estrutura do Projeto

```
meus-projetos/
├── src/
│   └── LAB2.ts       # Código-fonte principal
├── dist/
│   └── LAB2.js       # Arquivo gerado após compilação
├── tsconfig.json
└── README.md
```

---

##  Como executar

**1. Compile o TypeScript:**
```bash
tsc
```

**2. Execute o programa:**
```bash
node dist/LAB2.js
```

**Ou rode diretamente sem compilar:**
```bash
npx ts-node src/LAB2.ts
```

---

##  Testes realizados

| Teste | Descrição | Resultado esperado |
|---|---|---|
| Cadastro de funcionários | Adiciona 3 funcionários | Confirmação de cada cadastro |
| Consulta antes da atualização | Verifica dados do funcionário 101 | Exibe informações com salário original |
| Atualização de salário | Atualiza salário da matrícula 101 | Mostra salário antigo e novo |
| Consulta após atualização | Verifica dados do funcionário 101 | Exibe novo salário atualizado |
| Salário inválido | Tenta definir salário negativo | Mensagem de erro |
| Funcionário inexistente (consulta) | Consulta matrícula 999 | Mensagem de erro |
| Funcionário inexistente (atualização) | Atualiza matrícula 999 | Mensagem de erro |

---

##  Saída esperada no console

```
 --- Cadastrando funcionários ---
 Funcionário "Ana Souza" cadastrado com sucesso.
 Funcionário "Carlos Lima" cadastrado com sucesso.
 Funcionário "Mariana Costa" cadastrado com sucesso.

 --- Consultando funcionário ---
 Informações do funcionário:
   Matrícula : 101
   Nome      : Ana Souza
   Cargo     : Desenvolvedora
   Salário   : R$ 7500.00

 --- Atualizando salário ---
 Salário de "Ana Souza" atualizado: R$ 7500.00 → R$ 8500.00

 --- Consultando funcionário ---
 Informações do funcionário:
   Matrícula : 101
   Nome      : Ana Souza
   Cargo     : Desenvolvedora
   Salário   : R$ 8500.00

 --- Atualizando salário ---
 Erro: O salário deve ser um valor positivo.

 --- Consultando funcionário ---
 Erro: Funcionário com matrícula 999 não encontrado.

    --- Atualizando salário ---
 Erro: Funcionário com matrícula 999 não encontrado.
```