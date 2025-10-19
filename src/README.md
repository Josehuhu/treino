# 💪 DED System - Dieta, Exercício e Dados Pessoais

<div align="center">

![DED System](https://img.shields.io/badge/DED-System-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Sistema completo de gestão de dieta, exercícios e hábitos diários**

[Começar](#-começar) • [Documentação](#-documentação) • [Arquitetura](#-arquitetura) • [Funcionalidades](#-funcionalidades)

</div>

---

## 📖 Sobre o Projeto

O **DED System** é uma aplicação web moderna e completa para gestão de:

- 🍽️ **Dieta**: Cadastre e gerencie suas refeições diárias com informações nutricionais
- 💪 **Exercícios**: Organize seus treinos semanais com detalhes de séries, reps e descanso
- 📊 **Dados Pessoais**: Acompanhe hábitos como hidratação, sono, motivação e peso

Desenvolvido com as tecnologias mais modernas do ecossistema web, o sistema oferece uma experiência intuitiva, responsiva e com foco em gamificação para incentivar a consistência.

---

## ✨ Funcionalidades

### 🍽️ Gestão de Dieta

- ✅ Criar, editar, visualizar e excluir refeições
- ✅ Adicionar múltiplos alimentos por refeição
- ✅ Registrar macronutrientes (calorias, proteína, carboidratos, gorduras)
- ✅ Visualizar resumo nutricional diário
- ✅ Buscar refeições por nome ou alimento
- ✅ Organização automática por horário

### 💪 Gestão de Exercícios

- ✅ Criar, editar, visualizar e excluir treinos
- ✅ Organizar treinos por dia da semana
- ✅ Adicionar múltiplos exercícios por treino
- ✅ Registrar séries, repetições e tempo de descanso
- ✅ Adicionar observações aos treinos
- ✅ Visualizar por calendário semanal
- ✅ Estatísticas de treinos e exercícios

### 📊 Dados Pessoais e Hábitos

- ✅ Registrar dados diários (hidratação, sono, motivação)
- ✅ Acompanhar peso corporal
- ✅ Lista de suplementação diária
- ✅ Observações e diário pessoal
- ✅ Gráficos de evolução (Recharts)
- ✅ Médias automáticas calculadas
- ✅ Histórico completo de registros

### 🎯 Gamificação e Motivação

- ✅ Sistema de conquistas (badges)
- ✅ Contador de sequência de dias
- ✅ Dashboard com estatísticas motivacionais
- ✅ Ações rápidas para facilitar uso diário
- ✅ Feedback visual imediato (toasts)
- ✅ Progresso visual em gráficos

### 🔐 Autenticação e Segurança

- ✅ Sistema de cadastro e login completo
- ✅ Autenticação via Supabase Auth
- ✅ Proteção de rotas com tokens
- ✅ Isolamento de dados por usuário
- ✅ Sessão persistente

### 📱 Interface e UX

- ✅ Design moderno e responsivo
- ✅ Navegação intuitiva (sidebar + bottom nav)
- ✅ Compatível com desktop, tablet e mobile
- ✅ Formulários modais para melhor UX
- ✅ Cards organizados em grids responsivos
- ✅ Loading states e empty states

---

## 🚀 Começar

### Acesso Rápido

1. Abra a aplicação
2. Crie sua conta na aba "Cadastrar"
3. Comece a usar imediatamente!

### Primeiros Passos

1. **Cadastre sua primeira refeição**
   - Vá para "Dieta" → "Nova Refeição"
   - Adicione nome, horário, alimentos e nutrientes

2. **Crie seu primeiro treino**
   - Vá para "Exercício" → "Novo Treino"
   - Selecione o dia e adicione exercícios

3. **Registre dados de hoje**
   - Vá para "Dados Pessoais" → "Registrar Hoje"
   - Preencha hidratação, sono e motivação

4. **Acompanhe seu progresso**
   - Veja gráficos na aba "Gráficos"
   - Consulte histórico na aba "Histórico"

---

## 📚 Documentação

O projeto possui documentação completa em múltiplos arquivos:

### 📄 Arquivos de Documentação

| Arquivo | Descrição |
|---------|-----------|
| [DOCUMENTATION.md](./DOCUMENTATION.md) | Documentação técnica completa |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura e fluxo de dados |
| [QUICK_START.md](./QUICK_START.md) | Guia rápido de uso |
| [EXAMPLES.md](./EXAMPLES.md) | Exemplos práticos de dados |
| [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) | Guia de componentes |

### 🔗 Links Rápidos

- **Estrutura de Dados**: [DOCUMENTATION.md > Estrutura de Dados](./DOCUMENTATION.md#-estrutura-de-dados-kv-store---supabase)
- **API Backend**: [DOCUMENTATION.md > Backend API](./DOCUMENTATION.md#-backend-api---rotas-do-servidor)
- **Componentes React**: [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)
- **Fluxo de Autenticação**: [ARCHITECTURE.md > Segurança](./ARCHITECTURE.md#-segurança)

---

## 🏗️ Arquitetura

### Stack Tecnológico

```
Frontend
├── React 18
├── TypeScript
├── Tailwind CSS v4.0
├── shadcn/ui (Radix UI)
├── Recharts (gráficos)
├── Sonner (notificações)
└── Lucide React (ícones)

Backend
├── Supabase Edge Functions
├── Hono (web framework)
├── Supabase Auth
└── Supabase KV Store

Deploy
└── Figma Make (Supabase hosting)
```

### Estrutura de Pastas

```
/
├── App.tsx                     # Componente principal
├── components/
│   ├── Layout.tsx              # Layout com navegação
│   ├── Dashboard.tsx           # Dashboard principal
│   ├── DietPage.tsx            # Página de dieta
│   ├── ExercisePage.tsx        # Página de exercícios
│   ├── PersonalDataPage.tsx    # Página de dados
│   ├── MealCard.tsx            # Card de refeição
│   ├── MealForm.tsx            # Form de refeição
│   ├── ExerciseCard.tsx        # Card de exercício
│   ├── ExerciseForm.tsx        # Form de exercício
│   ├── DailyDataForm.tsx       # Form de dados diários
│   ├── ProgressChart.tsx       # Gráfico de progresso
│   └── ui/                     # shadcn/ui components
├── supabase/
│   └── functions/server/
│       └── index.tsx           # API backend (Hono)
├── utils/
│   ├── api.ts                  # Cliente API
│   └── supabase-client.ts      # Cliente Supabase
└── styles/
    └── globals.css             # Estilos globais
```

### Fluxo de Dados

```
User Action
    ↓
React Component
    ↓
API Client (utils/api.ts)
    ↓
HTTP Request (Authorization: Bearer token)
    ↓
Supabase Edge Function (Hono)
    ↓
Auth Validation
    ↓
KV Store (Database)
    ↓
Response
    ↓
Update React State
    ↓
Re-render UI
```

Veja mais detalhes em [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🗄️ Modelo de Dados

### Estrutura de Chaves (KV Store)

```
users:{userId}              → Dados do usuário
meals:{userId}:{mealId}     → Refeições
exercises:{userId}:{exId}   → Exercícios
daily_data:{userId}:{date}  → Dados diários
```

### Entidades Principais

#### Meal (Refeição)
```typescript
{
  id: string
  name: string
  time: string (HH:mm)
  foods: string[]
  nutrients: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}
```

#### Exercise (Treino)
```typescript
{
  id: string
  name: string
  dayOfWeek: string
  exercises: [{
    name: string
    sets: number
    reps: number
    rest: number
  }]
  notes?: string
}
```

#### DailyData (Dados Diários)
```typescript
{
  id: string
  date: string (YYYY-MM-DD)
  hydration: number (ml)
  sleep: number (horas)
  motivation: number (1-5)
  supplements: string[]
  weight?: number (kg)
  notes?: string
}
```

---

## 🎨 Design System

### Cores Principais

```css
Primary:    Indigo/Blue gradient
Background: Light blue/indigo gradient
Success:    Green
Warning:    Orange/Yellow
Danger:     Red
Text:       Gray scale
```

### Componentes shadcn/ui

- ✅ Button, Card, Dialog
- ✅ Input, Label, Textarea
- ✅ Select, Slider, Tabs
- ✅ Badge, Toaster

### Responsividade

| Breakpoint | Tamanho | Layout |
|------------|---------|--------|
| Mobile | < 768px | Bottom nav, 1 coluna |
| Tablet | 768px - 1024px | Sidebar, 2 colunas |
| Desktop | > 1024px | Sidebar, 3 colunas |

---

## 🔐 Segurança

### Autenticação

- ✅ Supabase Auth para gestão de usuários
- ✅ Tokens JWT para autenticação
- ✅ Sessões persistentes
- ✅ Email confirmado automaticamente

### Autorização

- ✅ Todas as rotas protegidas validam token
- ✅ Dados isolados por userId
- ✅ Middleware de autenticação no servidor
- ✅ CORS configurado

### Boas Práticas

- ⚠️ Access tokens em localStorage (OK para prototipagem)
- ⚠️ SUPABASE_SERVICE_ROLE_KEY isolado no servidor
- ⚠️ Não adequado para PII sensível em produção

---

## 🚀 Deploy e Configuração

### Requisitos

- ✅ Supabase Project (automático no Figma Make)
- ✅ Navegador moderno
- ✅ Conexão com internet

### Variáveis de Ambiente

Configuradas automaticamente pelo Figma Make:

```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## 📊 Estatísticas do Projeto

### Componentes

- **15** Componentes React customizados
- **11** Componentes shadcn/ui utilizados
- **3** Páginas principais de CRUD
- **1** Dashboard com gamificação

### Rotas API

- **12** Endpoints REST
- **3** Entidades principais
- **4** Operações CRUD por entidade

### Arquivos de Documentação

- **6** Arquivos markdown
- **1** Arquitetura detalhada
- **1** Guia rápido
- **1** Guia de componentes

---

## 🎯 Casos de Uso

### 1. Atleta/Bodybuilder
- Acompanhar macros diários
- Organizar treinos de hipertrofia
- Monitorar peso e evolução
- Meta: Bulking ou Cutting

### 2. Fitness Casual
- Manter rotina saudável
- Treinos 3-4x por semana
- Controlar alimentação
- Meta: Manutenção e saúde

### 3. Iniciante
- Aprender sobre nutrição
- Criar hábitos consistentes
- Experimentar diferentes treinos
- Meta: Perda de peso ou ganho de massa

### 4. Tracking Avançado
- Análise de correlações
- Gráficos de tendências
- Otimização de performance
- Meta: Peak performance

---

## 💡 Dicas de Uso

### Para Melhores Resultados

1. **Consistência** 📅
   - Registre dados todos os dias
   - Mantenha sua sequência ativa
   - Use as conquistas como motivação

2. **Detalhamento** 📝
   - Seja específico nas observações
   - Registre todos os nutrientes
   - Anote sensações e progressos

3. **Análise** 📊
   - Revise gráficos semanalmente
   - Identifique padrões
   - Ajuste com base em dados

4. **Planejamento** 🎯
   - Use o sistema para planejar
   - Prepare refeições com antecedência
   - Organize treinos da semana

---

## 🤝 Contribuindo

Este projeto foi desenvolvido como um sistema completo de CRUD para gestão de saúde e fitness. Sinta-se livre para:

- Adaptar para suas necessidades
- Estender funcionalidades
- Melhorar UI/UX
- Adicionar novas métricas

---

## 📝 Licença

Este projeto é parte do Figma Make e está disponível para uso pessoal e aprendizado.

**Importante**: Não adequado para armazenar PII sensível em produção sem configurações adicionais de segurança.

---

## 🙏 Agradecimentos

Desenvolvido com:

- ❤️ React e TypeScript
- 🎨 Tailwind CSS e shadcn/ui
- 🚀 Supabase
- 📊 Recharts
- 🔔 Sonner

---

## 📞 Suporte

Para dúvidas sobre o uso do sistema:
- Consulte [QUICK_START.md](./QUICK_START.md)
- Veja exemplos em [EXAMPLES.md](./EXAMPLES.md)
- Leia a documentação completa em [DOCUMENTATION.md](./DOCUMENTATION.md)

Para questões técnicas:
- Consulte [ARCHITECTURE.md](./ARCHITECTURE.md)
- Veja [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)

---

<div align="center">

**DED System** - Gerencie sua Dieta, Exercícios e Dados Pessoais

Construído com 💪 para fitness e saúde

[⬆ Voltar ao topo](#-ded-system---dieta-exercício-e-dados-pessoais)

</div>
