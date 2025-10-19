# Arquitetura do DED System

## 🏛️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   App.tsx    │  │   Layout     │  │  Components  │          │
│  │              │  │              │  │              │          │
│  │ - Auth       │  │ - Navigation │  │ - Pages      │          │
│  │ - Routing    │  │ - Header     │  │ - Forms      │          │
│  │ - State      │  │ - Sidebar    │  │ - Cards      │          │
│  └──────┬───────┘  └──────────────┘  └──────────────┘          │
│         │                                                         │
│         │ uses                                                    │
│         ▼                                                         │
│  ┌─────────────────────────────────────────────────┐            │
│  │         utils/api.ts (API Client)                │            │
│  │                                                   │            │
│  │  - getMeals()     - createMeal()                 │            │
│  │  - getExercises() - createExercise()             │            │
│  │  - getDailyData() - createDailyData()            │            │
│  └─────────────────────┬───────────────────────────┘            │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │ Authorization: Bearer {access_token}
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE EDGE FUNCTION                        │
│                   (Hono Web Server)                              │
│                                                                   │
│  /supabase/functions/server/index.tsx                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────┐         │
│  │              Authentication Routes                  │         │
│  │  POST /signup - Create user                         │         │
│  └────────────────────────────────────────────────────┘         │
│                                                                   │
│  ┌────────────────────────────────────────────────────┐         │
│  │              Meals CRUD Routes                      │         │
│  │  GET    /meals       - List all meals               │         │
│  │  POST   /meals       - Create meal                  │         │
│  │  PUT    /meals/:id   - Update meal                  │         │
│  │  DELETE /meals/:id   - Delete meal                  │         │
│  └────────────────────────────────────────────────────┘         │
│                                                                   │
│  ┌────────────────────────────────────────────────────┐         │
│  │            Exercises CRUD Routes                    │         │
│  │  GET    /exercises       - List all exercises       │         │
│  │  POST   /exercises       - Create exercise          │         │
│  │  PUT    /exercises/:id   - Update exercise          │         │
│  │  DELETE /exercises/:id   - Delete exercise          │         │
│  └────────────────────────────────────────────────────┘         │
│                                                                   │
│  ┌────────────────────────────────────────────────────┐         │
│  │           Daily Data CRUD Routes                    │         │
│  │  GET    /daily-data         - List all data         │         │
│  │  POST   /daily-data         - Create data           │         │
│  │  PUT    /daily-data/:date   - Update data           │         │
│  │  DELETE /daily-data/:date   - Delete data           │         │
│  └─────────────────────┬──────────────────────────────┘         │
│                        │                                          │
│                        │ uses                                     │
│                        ▼                                          │
│  ┌────────────────────────────────────────────────────┐         │
│  │         kv_store.tsx (KV Utilities)                 │         │
│  │                                                      │         │
│  │  - get(key)           - set(key, value)             │         │
│  │  - getByPrefix(prefix) - del(key)                   │         │
│  │  - mget([keys])       - mset([{k,v}])               │         │
│  └─────────────────────┬──────────────────────────────┘         │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         │ Database Operations
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE SERVICES                           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Auth       │  │  KV Store    │  │   Storage    │          │
│  │              │  │  (Database)  │  │   (Future)   │          │
│  │ - SignUp     │  │              │  │              │          │
│  │ - SignIn     │  │ kv_store     │  │ Files/Images │          │
│  │ - Session    │  │ table        │  │              │          │
│  │ - GetUser    │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados

### 1. Autenticação (Login/Signup)

```
User Input (Email/Password)
    │
    ▼
App.tsx (handleSignIn/handleSignUp)
    │
    ▼
Supabase Client (auth.signInWithPassword)
    │
    ▼
Supabase Auth Service
    │
    ▼
Returns Access Token
    │
    ▼
Stored in localStorage
    │
    ▼
User Authenticated ✓
```

### 2. Criar Refeição (Create Meal)

```
User fills MealForm
    │
    ▼
DietPage.handleSaveMeal()
    │
    ▼
api.createMeal() (utils/api.ts)
    │
    ├─ Header: Authorization: Bearer {access_token}
    ├─ Method: POST
    ├─ Body: { name, time, foods, nutrients }
    │
    ▼
Server: POST /make-server-2cdd57ac/meals
    │
    ├─ Verify access_token with Supabase Auth
    ├─ Extract user.id
    │
    ▼
Generate mealId (UUID)
    │
    ▼
kv.set(`meals:${userId}:${mealId}`, mealData)
    │
    ▼
Supabase KV Store (Database)
    │
    ▼
Return { meal } to Frontend
    │
    ▼
DietPage updates state
    │
    ▼
UI Re-renders with new meal ✓
```

### 3. Listar Refeições (Get Meals)

```
DietPage.useEffect() → loadMeals()
    │
    ▼
api.getMeals() (utils/api.ts)
    │
    ├─ Header: Authorization: Bearer {access_token}
    ├─ Method: GET
    │
    ▼
Server: GET /make-server-2cdd57ac/meals
    │
    ├─ Verify access_token
    ├─ Extract user.id
    │
    ▼
kv.getByPrefix(`meals:${userId}:`)
    │
    ▼
Supabase KV Store returns all meals
    │
    ▼
Return { meals: [...] }
    │
    ▼
DietPage updates state
    │
    ▼
MealCard components render ✓
```

---

## 📊 Modelo de Dados (Entity-Relationship)

```
┌──────────────────┐
│      User        │
│                  │
│ - id (PK)        │
│ - email          │
│ - name           │
│ - createdAt      │
└────────┬─────────┘
         │
         │ 1:N
         │
    ┌────┴─────────────────────────────────┐
    │                                       │
    ▼                                       ▼
┌──────────────────┐              ┌──────────────────┐
│      Meal        │              │    Exercise      │
│                  │              │                  │
│ - id (PK)        │              │ - id (PK)        │
│ - userId (FK)    │              │ - userId (FK)    │
│ - name           │              │ - name           │
│ - time           │              │ - dayOfWeek      │
│ - foods[]        │              │ - exercises[]    │
│ - nutrients{}    │              │ - notes          │
│ - createdAt      │              │ - createdAt      │
│ - updatedAt      │              │ - updatedAt      │
└──────────────────┘              └──────────────────┘
                                           
         │ 1:N                            
         │                                
         ▼                                
┌──────────────────┐              
│   Daily Data     │              
│                  │              
│ - id (PK)        │              
│ - userId (FK)    │              
│ - date           │              
│ - hydration      │              
│ - sleep          │              
│ - motivation     │              
│ - supplements[]  │              
│ - weight         │              
│ - notes          │              
│ - createdAt      │              
│ - updatedAt      │              
└──────────────────┘              
```

---

## 🔐 Segurança

### Fluxo de Autorização

```
┌─────────────────────────────────────────────────────────────┐
│  1. User logs in                                             │
│     → Supabase Auth generates access_token                   │
│     → Frontend stores token in localStorage                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  2. User makes API request                                   │
│     → Frontend includes:                                     │
│       Authorization: Bearer {access_token}                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Server receives request                                  │
│     → Extracts access_token from header                      │
│     → Calls: supabase.auth.getUser(access_token)             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Supabase Auth validates token                            │
│     ✓ Valid → Returns user object with id                   │
│     ✗ Invalid → Returns error                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Server checks user                                       │
│     if (!user.id) → return 401 Unauthorized                  │
│     else → proceed with request                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  6. Server uses user.id to scope data                        │
│     → All KV keys include userId                             │
│     → User can only access their own data                    │
└─────────────────────────────────────────────────────────────┘
```

### Proteção de Dados

- **Isolamento por Usuário**: Todas as chaves KV incluem `userId`, garantindo que cada usuário acesse apenas seus próprios dados
- **Validação de Token**: Toda requisição protegida valida o access_token com Supabase Auth
- **CORS**: Servidor configurado com CORS aberto (ajustar para produção)
- **HTTPS**: Todas as requisições via HTTPS (Supabase)

---

## 🚀 Fluxo de Navegação

```
                    ┌─────────────────┐
                    │   Landing Page  │
                    │   (Login)       │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   User Auth?    │
                    └────┬──────┬─────┘
                         │      │
                    No   │      │  Yes
                         │      │
                    ┌────▼──┐   │
                    │ Login │   │
                    │   or  │   │
                    │Signup │   │
                    └───┬───┘   │
                        │       │
                        └───┬───┘
                            │
                    ┌───────▼────────┐
                    │   Dashboard    │
                    │   (Main Page)  │
                    └───────┬────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
    ┌─────▼─────┐    ┌──────▼──────┐   ┌────▼──────┐
    │   Dieta   │    │  Exercício  │   │   Dados   │
    │   Page    │    │    Page     │   │  Pessoais │
    └─────┬─────┘    └──────┬──────┘   └────┬──────┘
          │                 │                │
    ┌─────▼─────┐    ┌──────▼──────┐   ┌────▼──────┐
    │ MealForm  │    │ExerciseForm │   │DailyData  │
    │  (Modal)  │    │   (Modal)   │   │   Form    │
    └───────────┘    └─────────────┘   └───────────┘
```

---

## 🎨 Estrutura de Componentes

```
App
├── Toaster (Sonner notifications)
│
├── [Not Authenticated]
│   └── Login/Signup Card
│       ├── Tabs (signin/signup)
│       ├── Input fields
│       └── Submit button
│
└── [Authenticated]
    └── Layout
        ├── Header
        │   ├── Logo
        │   ├── User name
        │   └── Logout button
        │
        ├── Sidebar (Desktop)
        │   └── Navigation links
        │       ├── Dashboard
        │       ├── Dieta
        │       ├── Exercício
        │       └── Dados Pessoais
        │
        ├── Bottom Navigation (Mobile)
        │   └── Navigation links
        │
        └── Main Content
            │
            ├── [Dashboard]
            │   ├── Stats cards
            │   ├── Quick actions
            │   └── Achievements
            │
            ├── [DietPage]
            │   ├── Header + New button
            │   ├── Nutrition summary
            │   ├── Search input
            │   ├── MealCard grid
            │   └── MealForm (modal)
            │
            ├── [ExercisePage]
            │   ├── Header + New button
            │   ├── Stats cards
            │   ├── Tabs (by weekday)
            │   ├── ExerciseCard grid
            │   └── ExerciseForm (modal)
            │
            └── [PersonalDataPage]
                ├── Header + Register button
                ├── Stats cards
                ├── Tabs (Charts/History)
                │   ├── Charts tab
                │   │   └── ProgressChart × 4
                │   │
                │   └── History tab
                │       └── Daily data cards
                │
                └── DailyDataForm (modal)
```

---

## 📦 Dependências Principais

```
Frontend:
├── react
├── next
├── @supabase/supabase-js
├── recharts (charts)
├── sonner (notifications)
├── lucide-react (icons)
└── shadcn/ui
    ├── @radix-ui/* (primitives)
    └── tailwindcss (styling)

Backend (Edge Function):
├── hono (web server)
├── @supabase/supabase-js
└── Deno runtime
```

---

## 🔄 Estado da Aplicação

### Estado Global (App.tsx)
```typescript
{
  isAuthenticated: boolean
  isLoading: boolean
  currentPage: 'dashboard' | 'dieta' | 'exercicio' | 'dados'
  userName: string
}
```

### Estado Local (Pages)

**DietPage:**
```typescript
{
  meals: Meal[]
  filteredMeals: Meal[]
  searchQuery: string
  isFormOpen: boolean
  editingMeal: Meal | undefined
  loading: boolean
}
```

**ExercisePage:**
```typescript
{
  exercises: Exercise[]
  isFormOpen: boolean
  editingExercise: Exercise | undefined
  loading: boolean
  selectedDay: string
}
```

**PersonalDataPage:**
```typescript
{
  dailyData: DailyData[]
  isFormOpen: boolean
  editingData: DailyData | undefined
  loading: boolean
}
```

---

## 🎯 Performance Considerations

### Otimizações Implementadas

1. **Singleton Supabase Client**: Cliente criado uma única vez
2. **Local State Management**: Sem Redux, usando useState/useEffect
3. **Lazy Loading**: Componentes carregam dados apenas quando montados
4. **Efficient Filtering**: Busca client-side para melhor UX
5. **Optimistic UI**: Toast feedback imediato

### Áreas de Melhoria

1. **Caching**: Implementar cache de dados
2. **Pagination**: Adicionar paginação para grandes datasets
3. **Debouncing**: Debounce em campos de busca
4. **Virtual Scrolling**: Para listas muito grandes
5. **Service Worker**: Cache offline

---

Esta arquitetura foi projetada para ser simples, escalável e fácil de entender, seguindo as melhores práticas de desenvolvimento web moderno.
