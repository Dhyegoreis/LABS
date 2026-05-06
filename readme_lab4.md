# Sistema de Gestão de Tarefas

Aplicação em TypeScript para gerenciar tarefas de projetos de uma equipe de desenvolvimento.

---

##  Estrutura do Projeto

```
meus-projetos/
├── src/
│   └── LAB4.ts       # Código-fonte principal
├── dist/
│   └── LAB4.js       # Arquivo gerado após compilação
├── tsconfig.json
└── README.md
```

---

## ▶️ Como executar

**1. Compile o TypeScript:**
```bash
tsc
```

**2. Execute o programa:**
```bash
node dist/LAB4.js
```

**Ou rode diretamente sem compilar:**
```bash
npx ts-node src/LAB4.ts
```

---

##  Testes realizados

| Teste | Descrição | Resultado esperado |
|---|---|---|
| Adicionar tarefas | Cria 4 tarefas em 2 projetos | Confirmação de cada tarefa |
| Consulta antes da atualização | Lista tarefas do "Sistema de Vendas" | 3 tarefas com status original |
| Atualizar status (ID 1) | Muda de "Pendente" para "Em Andamento" | Confirmação da mudança |
| Atualizar status (ID 2) | Muda de "Em Andamento" para "Concluída" | Confirmação da mudança |
| Consulta após atualização | Lista tarefas do "Sistema de Vendas" | Status atualizados |
| Status inválido | Tenta definir status "Pausada" | Mensagem de erro |
| Tarefa inexistente | Tenta atualizar ID 99 | Mensagem de erro |
| Projeto sem tarefas | Consulta "Projeto Inexistente" | Aviso de nenhuma tarefa |
| ID duplicado | Tenta adicionar tarefa com ID 1 novamente | Mensagem de erro |

---

##  Saída esperada no console

```
 --- Adicionando tarefas ---
 Tarefa adicionada: [1] "Criar banco de dados" — Projeto: Sistema de Vendas
 Tarefa adicionada: [2] "Desenvolver tela de login" — Projeto: Sistema de Vendas
 Tarefa adicionada: [3] "Configurar servidor" — Projeto: Infraestrutura
 Tarefa adicionada: [4] "Escrever documentação" — Projeto: Sistema de Vendas

🔍 --- Consultando tarefas do projeto "Sistema de Vendas" ---
 3 tarefa(s) encontrada(s):
   [ID: 1] Criar banco de dados — Status: Pendente
   [ID: 2] Desenvolver tela de login — Status: Em Andamento
   [ID: 4] Escrever documentação — Status: Pendente

 --- Atualizando status ---
    Tarefa [1] atualizada: "Pendente" → "Em Andamento"

 --- Atualizando status ---
 Tarefa [2] atualizada: "Em Andamento" → "Concluída"

 --- Consultando tarefas do projeto "Sistema de Vendas" ---
 3 tarefa(s) encontrada(s):
   [ID: 1] Criar banco de dados — Status: Em Andamento
   [ID: 2] Desenvolver tela de login — Status: Concluída
   [ID: 4] Escrever documentação — Status: Pendente

 --- Atualizando status ---
 Erro: Status "Pausada" inválido. Use: Pendente, Em Andamento, Concluída.

 --- Atualizando status ---
 Erro: Tarefa com ID 99 não encontrada.

 --- Consultando tarefas do projeto "Projeto Inexistente" ---
  Nenhuma tarefa encontrada para o projeto "Projeto Inexistente".

 --- Adicionando tarefas ---
 Erro: Já existe uma tarefa com o ID 1.
```