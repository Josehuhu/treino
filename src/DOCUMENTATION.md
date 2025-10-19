# DED System - Sistema de Gestão de Dieta, Exercício e Dados Pessoais

## 📋 Visão Geral

O **DED System** é uma aplicação web completa para gestão de dieta, exercícios e dados pessoais, construída com Next.js, React, shadcn/ui e Supabase.

## 🏗️ Arquitetura

### Estrutura de Dados (KV Store - Supabase)

O sistema utiliza a tabela Key-Value do Supabase para armazenar dados. A estrutura das chaves é:

#### 1. **Usuários**
```
Key: users:{userId}
Value: {
  id: string,
  email: string,
  name: string,
  createdAt: string (ISO)
}
```

#### 2. **Refeições (Meals)**
```
Key: meals:{userId}:{mealId}
Value: {
  id: string,
  userId: string,
  name: string,
  time: string (HH:mm),
  foods: string[],
  nutrients: {
    calories?: number,
    protein?: number,
    carbs?: number,
    fat?: number
  },
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

#### 3. **Exercícios (Exercises)**
```
Key: exercises:{userId}:{exerciseId}
Value: {
  id: string,
  userId: string,
  name: string,
  exercises: [{
    name: string,
    sets: number,
    reps: number,
    rest: number (segundos)
  }],
  dayOfWeek: string ('monday'|'tuesday'|...),
  notes?: string,
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

#### 4. **Dados Diários (Daily Data)**
```
Key: daily_data:{userId}:{date}
Value: {
  id: string,
  userId: string,
  date: string (YYYY-MM-DD),
  hydration: number (ml),
  sleep: number (horas),
  motivation: number (1-5),
  supplements: string[],
  weight?: number (kg),
  notes?: string,
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

---

## 🗂️ Estrutura de Arquivos

```
/
├── App.tsx                          # Componente principal com autenticação
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # Servidor Hono com todas as rotas API
│           └── kv_store.tsx         # Utilitários KV (protegido)
├── utils/
│   ├── supabase-client.ts           # Cliente Supabase singleton
│   ├── api.ts                       # Funções API para frontend
│   └── supabase/
│       └── info.tsx                 # Configuração Supabase (protegido)
├── components/
│   ├── Layout.tsx                   # Layout principal com navegação
│   ├── Dashboard.tsx                # Página inicial com estatísticas
│   ├── DietPage.tsx                 # Página CRUD de Dieta
│   ├── ExercisePage.tsx             # Página CRUD de Exercícios
│   ├── PersonalDataPage.tsx         # Página CRUD de Dados Pessoais
│   ├── MealCard.tsx                 # Card para exibir refeição
│   ├── MealForm.tsx                 # Formulário de refeição
│   ├── ExerciseCard.tsx             # Card para exibir treino
│   ├── ExerciseForm.tsx             # Formulário de treino
│   ├── DailyDataForm.tsx            # Formulário de dados diários
│   ├── ProgressChart.tsx            # Gráfico de progresso (Recharts)
│   └── ui/                          # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       └── ... (outros componentes)
└── DOCUMENTATION.md                 # Esta documentação
```

---

## 🔌 Backend API - Rotas do Servidor

O servidor está localizado em `/supabase/functions/server/index.tsx` e usa Hono.

### Autenticação

#### `POST /make-server-2cdd57ac/signup`
Cria um novo usuário.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Response:**
```json
{
  "user": { "id": "...", "email": "..." }
}
```

---

### CRUD - Refeições (Meals)

#### `GET /make-server-2cdd57ac/meals`
Lista todas as refeições do usuário autenticado.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "meals": [...]
}
```

#### `POST /make-server-2cdd57ac/meals`
Cria uma nova refeição.

**Body:**
```json
{
  "name": "Café da Manhã",
  "time": "08:00",
  "foods": ["Ovos", "Pão integral", "Café"],
  "nutrients": {
    "calories": 450,
    "protein": 25,
    "carbs": 40,
    "fat": 15
  }
}
```

#### `PUT /make-server-2cdd57ac/meals/:id`
Atualiza uma refeição existente.

#### `DELETE /make-server-2cdd57ac/meals/:id`
Exclui uma refeição.

---

### CRUD - Exercícios (Exercises)

#### `GET /make-server-2cdd57ac/exercises`
Lista todos os treinos do usuário.

#### `POST /make-server-2cdd57ac/exercises`
Cria um novo treino.

**Body:**
```json
{
  "name": "Treino A - Peito e Tríceps",
  "dayOfWeek": "monday",
  "exercises": [
    {
      "name": "Supino reto",
      "sets": 4,
      "reps": 12,
      "rest": 90
    }
  ],
  "notes": "Focar na contração"
}
```

#### `PUT /make-server-2cdd57ac/exercises/:id`
Atualiza um treino.

#### `DELETE /make-server-2cdd57ac/exercises/:id`
Exclui um treino.

---

### CRUD - Dados Diários (Daily Data)

#### `GET /make-server-2cdd57ac/daily-data`
Lista todos os dados diários do usuário.

#### `POST /make-server-2cdd57ac/daily-data`
Registra dados de um dia.

**Body:**
```json
{
  "date": "2025-10-19",
  "hydration": 2500,
  "sleep": 8,
  "motivation": 4,
  "supplements": ["Whey Protein", "Creatina"],
  "weight": 75.5,
  "notes": "Dia produtivo!"
}
```

#### `PUT /make-server-2cdd57ac/daily-data/:date`
Atualiza dados de um dia específico.

#### `DELETE /make-server-2cdd57ac/daily-data/:date`
Exclui dados de um dia.

---

## 🎨 Páginas e Rotas (Frontend)

### 1. **Login/Cadastro** (`/`)
- Tela de autenticação com tabs para Login e Cadastro
- Valida credenciais via Supabase Auth
- Armazena access_token no localStorage

### 2. **Dashboard** (`/dashboard`)
- Resumo geral com estatísticas
- Cards de estatísticas (refeições, treinos, dias rastreados, sequência)
- Ações rápidas para navegação
- Sistema de conquistas (badges)

### 3. **Dieta** (`/dieta`)
- Lista de todas as refeições em cards
- Busca por nome ou alimento
- Resumo nutricional (calorias, proteínas, carboidratos, gorduras)
- Modal para criar/editar refeições
- Organização por horário

### 4. **Exercício** (`/exercicio`)
- Tabs por dia da semana
- Cards de treinos com exercícios, séries, reps e descanso
- Estatísticas (total de treinos, exercícios, dias ativos)
- Modal para criar/editar treinos

### 5. **Dados Pessoais** (`/dados`)
- Tabs: Gráficos e Histórico
- **Gráficos**: 4 gráficos de linha (peso, hidratação, sono, motivação)
- **Histórico**: Cards com todos os registros diários
- Médias calculadas automaticamente
- Modal para registrar dados do dia

---

## 🧩 Componentes React Principais

### Layout Components

#### `<Layout>`
Componente de layout que envolve todas as páginas.

**Props:**
```typescript
{
  children: React.ReactNode,
  currentPage?: string,
  onNavigate?: (page: string) => void,
  onLogout?: () => void,
  userName?: string
}
```

**Features:**
- Navegação sidebar (desktop) e bottom bar (mobile)
- Header com logo e botão de logout
- Responsivo

---

### Diet Components

#### `<MealCard>`
Exibe uma refeição em formato de card.

**Props:**
```typescript
{
  meal: Meal,
  onEdit: (meal: Meal) => void,
  onDelete: (id: string) => void
}
```

#### `<MealForm>`
Modal para criar/editar refeições.

**Props:**
```typescript
{
  isOpen: boolean,
  onClose: () => void,
  onSave: (meal: Omit<Meal, 'id'>) => void,
  meal?: Meal
}
```

**Features:**
- Campo de nome e horário
- Adicionar múltiplos alimentos
- Campos opcionais para nutrientes (calorias, proteína, carbs, gorduras)

---

### Exercise Components

#### `<ExerciseCard>`
Exibe um treino em formato de card.

#### `<ExerciseForm>`
Modal para criar/editar treinos.

**Features:**
- Seletor de dia da semana
- Adicionar múltiplos exercícios com séries, reps e descanso
- Campo de observações

---

### Personal Data Components

#### `<DailyDataForm>`
Modal para registrar dados diários.

**Features:**
- Seletor de data
- Sliders para hidratação (0-5000ml), sono (0-12h), motivação (1-5)
- Lista de suplementos
- Campo de peso (opcional)
- Campo de observações

#### `<ProgressChart>`
Gráfico de linha usando Recharts.

**Props:**
```typescript
{
  data: DailyData[],
  metric: 'weight' | 'hydration' | 'sleep' | 'motivation'
}
```

**Features:**
- Mostra últimos 30 registros
- Eixos configurados por métrica
- Tooltip com formatação

---

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Signup:**
   ```typescript
   POST /make-server-2cdd57ac/signup
   → Cria usuário com Supabase Admin API
   → Email confirmado automaticamente (email_confirm: true)
   ```

2. **Sign In:**
   ```typescript
   supabase.auth.signInWithPassword({ email, password })
   → Retorna access_token
   → Armazenado em localStorage
   ```

3. **Session Check:**
   ```typescript
   supabase.auth.getSession()
   → Verifica se há sessão ativa
   ```

4. **Protected Routes:**
   ```typescript
   // No servidor
   const accessToken = request.headers.get('Authorization')?.split(' ')[1]
   const { data: { user }, error } = await supabase.auth.getUser(accessToken)
   if (!user) return 401 Unauthorized
   ```

5. **Sign Out:**
   ```typescript
   supabase.auth.signOut()
   → Remove access_token do localStorage
   ```

---

## 🎨 Design & UX

### Princípios de Design

1. **Responsividade**
   - Layout adapta-se automaticamente entre desktop e mobile
   - Navegação em sidebar (desktop) e bottom bar (mobile)
   - Grids responsivos para cards

2. **Feedback Visual**
   - Toasts (Sonner) para todas as ações (sucesso/erro)
   - Loading states durante requisições
   - Hover states em cards e botões

3. **Gamificação**
   - Sistema de conquistas no Dashboard
   - Badges para marcos alcançados
   - Estatísticas de progresso

4. **Vieses Cognitivos Aplicados**
   - **Efeito de Progresso**: Gráficos mostram evolução visual
   - **Endowed Progress Effect**: Badges e conquistas incentivam continuidade
   - **Commitment & Consistency**: Sequências de dias motivam registro diário
   - **Loss Aversion**: Não perder a sequência motiva o uso contínuo

### Paleta de Cores

- **Primary**: Indigo/Blue gradient (`from-blue-500 to-indigo-600`)
- **Background**: Gradient suave (`from-blue-50 to-indigo-50`)
- **Success**: Green
- **Warning**: Yellow/Orange
- **Danger**: Red
- **Neutral**: Gray scale

---

## 🚀 Como Usar

### 1. Primeiro Acesso
1. Acesse a aplicação
2. Clique em "Cadastrar"
3. Preencha nome, email e senha
4. Faça login automaticamente após cadastro

### 2. Adicionar Refeição
1. Navegue para "Dieta"
2. Clique em "Nova Refeição"
3. Preencha nome, horário, alimentos e nutrientes (opcional)
4. Clique em "Criar Refeição"

### 3. Adicionar Treino
1. Navegue para "Exercício"
2. Clique em "Novo Treino"
3. Preencha nome e selecione dia da semana
4. Adicione exercícios com séries, reps e descanso
5. Clique em "Criar Treino"

### 4. Registrar Dados Diários
1. Navegue para "Dados Pessoais"
2. Clique em "Registrar Hoje"
3. Ajuste sliders de hidratação, sono e motivação
4. Adicione suplementos e peso (opcional)
5. Clique em "Registrar Dados"

### 5. Visualizar Progresso
1. Em "Dados Pessoais" → Tab "Gráficos"
2. Veja evolução de peso, hidratação, sono e motivação
3. Analise tendências e padrões

---

## 🔧 Tecnologias Utilizadas

- **Frontend Framework**: React + Next.js
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS v4.0
- **Backend**: Supabase (Edge Functions com Hono)
- **Database**: Supabase KV Store
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Notifications**: Sonner
- **Icons**: Lucide React

---

## 📊 Métricas e Estatísticas

O Dashboard calcula automaticamente:

- **Refeições Cadastradas**: Total de meals criadas
- **Treinos Completados**: Total de exercises criados
- **Dias Rastreados**: Número de dias com dados registrados
- **Sequência Atual**: Dias consecutivos com registros

Na página de Dados Pessoais:
- **Médias**: Hidratação, sono e motivação média
- **Peso Atual**: Último peso registrado

---

## 🎯 Funcionalidades Avançadas

### 1. Busca e Filtros
- Busca de refeições por nome ou alimento
- Filtro de treinos por dia da semana

### 2. Ordenação
- Refeições ordenadas por horário
- Dados diários ordenados por data (mais recente primeiro)
- Gráficos com últimos 30 registros

### 3. Validações
- Campos obrigatórios marcados com *
- Validação de email e senha (mínimo 6 caracteres)
- Confirmação antes de excluir

### 4. Responsividade
- Layout adaptativo para desktop, tablet e mobile
- Grids responsivos (1, 2, 3 colunas)
- Navegação adaptável (sidebar/bottom bar)

---

## 🔮 Melhorias Futuras Sugeridas

1. **Notificações**
   - Lembretes para registrar refeições
   - Notificações de hora de treino
   - Alertas de meta de hidratação

2. **Metas e Objetivos**
   - Definir metas de peso
   - Metas diárias de nutrientes
   - Metas de treinos semanais

3. **Relatórios**
   - Relatórios semanais/mensais em PDF
   - Comparação de períodos
   - Insights automáticos

4. **Social**
   - Compartilhar conquistas
   - Comunidade de usuários
   - Desafios entre amigos

5. **Integração**
   - Importar dados de smartwatches
   - Integração com apps de nutrição
   - Sincronização com calendário

---

## 📝 Notas Importantes

- **Privacidade**: O sistema armazena dados sensíveis. Não use para PII em produção.
- **Backup**: Os dados estão no Supabase KV Store. Configure backups regulares.
- **Segurança**: Access tokens são armazenados no localStorage. Considere soluções mais seguras para produção.
- **Email**: Email de confirmação está desabilitado. Configure SMTP para produção.

---

## 📞 Suporte

Para questões técnicas ou dúvidas sobre a implementação, consulte:
- Documentação do Supabase: https://supabase.com/docs
- Documentação do shadcn/ui: https://ui.shadcn.com
- Documentação do Recharts: https://recharts.org

---

**DED System** - Construído com ❤️ usando React, Next.js, shadcn/ui e Supabase
