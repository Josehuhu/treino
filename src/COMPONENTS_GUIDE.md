# 🧩 Guia de Componentes - DED System

Este guia documenta todos os componentes shadcn/ui utilizados no sistema e como são aplicados.

---

## 📦 Componentes shadcn/ui Utilizados

### 1. **Button** (`button.tsx`)

Usado em: Toda a aplicação

**Variantes utilizadas:**
- `default` - Botões principais (Criar, Salvar, Atualizar)
- `ghost` - Botões de ação secundária (Editar, Excluir)
- `outline` - Botões de cancelar e ações rápidas

**Exemplos no código:**
```tsx
// Botão primário
<Button onClick={() => setIsFormOpen(true)}>
  <Plus className="w-4 h-4 mr-2" />
  Nova Refeição
</Button>

// Botão ghost para ações
<Button variant="ghost" size="sm" onClick={() => onEdit(meal)}>
  <Edit2 className="w-4 h-4" />
</Button>
```

**Localização:**
- Layout.tsx - Botão de Logout
- Dashboard.tsx - Ações rápidas
- DietPage.tsx - Nova Refeição
- ExercisePage.tsx - Novo Treino
- PersonalDataPage.tsx - Registrar Dados
- Todos os formulários - Salvar/Cancelar

---

### 2. **Card** (`card.tsx`)

Usado em: Toda a aplicação

**Componentes:**
- `Card` - Container principal
- `CardHeader` - Cabeçalho com título
- `CardTitle` - Título do card
- `CardDescription` - Descrição/subtítulo
- `CardContent` - Conteúdo do card

**Exemplos no código:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
</Card>
```

**Localização:**
- Dashboard.tsx - Stats cards, ações rápidas, conquistas
- MealCard.tsx - Exibir refeições
- ExerciseCard.tsx - Exibir treinos
- PersonalDataPage.tsx - Histórico de dados
- ProgressChart.tsx - Container dos gráficos
- App.tsx - Card de login

---

### 3. **Dialog** (`dialog.tsx`)

Usado em: Todos os formulários modais

**Componentes:**
- `Dialog` - Container do modal
- `DialogContent` - Conteúdo
- `DialogHeader` - Cabeçalho
- `DialogTitle` - Título
- `DialogDescription` - Descrição

**Exemplos no código:**
```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Nova Refeição</DialogTitle>
      <DialogDescription>
        Preencha os detalhes
      </DialogDescription>
    </DialogHeader>
    {/* Form */}
  </DialogContent>
</Dialog>
```

**Localização:**
- MealForm.tsx - Formulário de refeições
- ExerciseForm.tsx - Formulário de treinos
- DailyDataForm.tsx - Formulário de dados diários

---

### 4. **Input** (`input.tsx`)

Usado em: Todos os formulários

**Tipos utilizados:**
- `text` - Campos de texto
- `email` - Email
- `password` - Senha
- `number` - Números (peso, nutrientes)
- `time` - Horário de refeições
- `date` - Data para dados diários

**Exemplos no código:**
```tsx
<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="seu@email.com"
  required
/>
```

**Localização:**
- App.tsx - Login/Signup
- MealForm.tsx - Nome, horário, alimentos, nutrientes
- ExerciseForm.tsx - Nome, exercícios, séries, reps
- DailyDataForm.tsx - Data, peso, suplementos
- DietPage.tsx - Campo de busca

---

### 5. **Label** (`label.tsx`)

Usado em: Todos os formulários

**Exemplos no código:**
```tsx
<Label htmlFor="name">Nome da Refeição *</Label>
<Input id="name" ... />
```

**Localização:**
- Todos os formulários
- Sempre associado com Input para acessibilidade

---

### 6. **Tabs** (`tabs.tsx`)

Usado em: Navegação contextual

**Componentes:**
- `Tabs` - Container
- `TabsList` - Lista de abas
- `TabsTrigger` - Botão de aba
- `TabsContent` - Conteúdo da aba

**Exemplos no código:**
```tsx
<Tabs value={selectedDay} onValueChange={setSelectedDay}>
  <TabsList>
    <TabsTrigger value="all">Todos</TabsTrigger>
    <TabsTrigger value="monday">Segunda</TabsTrigger>
  </TabsList>
  <TabsContent value="all">
    {/* Conteúdo */}
  </TabsContent>
</Tabs>
```

**Localização:**
- App.tsx - Login/Signup tabs
- ExercisePage.tsx - Filtrar por dia da semana
- PersonalDataPage.tsx - Gráficos/Histórico

---

### 7. **Badge** (`badge.tsx`)

Usado em: Tags e indicadores

**Variantes utilizadas:**
- `default` - Padrão
- `secondary` - Tags de alimentos e suplementos
- `outline` - Séries/reps em exercícios

**Exemplos no código:**
```tsx
<Badge variant="secondary">
  Ovos
</Badge>

<Badge variant="outline">
  4 séries
</Badge>
```

**Localização:**
- MealCard.tsx - Lista de alimentos
- ExerciseCard.tsx - Séries, reps, descanso
- DailyDataForm.tsx - Lista de suplementos
- Dashboard.tsx - Total, Stats

---

### 8. **Textarea** (`textarea.tsx`)

Usado em: Campos de texto longo

**Exemplos no código:**
```tsx
<Textarea
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  placeholder="Observações..."
  rows={3}
/>
```

**Localização:**
- ExerciseForm.tsx - Observações do treino
- DailyDataForm.tsx - Observações do dia

---

### 9. **Select** (`select.tsx`)

Usado em: Dropdown de seleção

**Componentes:**
- `Select` - Container
- `SelectTrigger` - Botão de abertura
- `SelectValue` - Valor selecionado
- `SelectContent` - Menu dropdown
- `SelectItem` - Item do menu

**Exemplos no código:**
```tsx
<Select value={dayOfWeek} onValueChange={setDayOfWeek}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="monday">Segunda-feira</SelectItem>
    <SelectItem value="tuesday">Terça-feira</SelectItem>
  </SelectContent>
</Select>
```

**Localização:**
- ExerciseForm.tsx - Seletor de dia da semana

---

### 10. **Slider** (`slider.tsx`)

Usado em: Controles deslizantes

**Exemplos no código:**
```tsx
<Slider
  value={[hydration]}
  onValueChange={(v) => setHydration(v[0])}
  min={0}
  max={5000}
  step={100}
/>
```

**Localização:**
- DailyDataForm.tsx - Hidratação, Sono, Motivação

---

### 11. **Sonner** (`sonner.tsx`)

Usado em: Notificações toast

**Funções:**
- `toast.success()` - Sucesso
- `toast.error()` - Erro
- `toast.info()` - Informação

**Exemplos no código:**
```tsx
import { toast, Toaster } from 'sonner@2.0.3'

// No JSX
<Toaster richColors position="top-center" />

// No código
toast.success('Refeição criada com sucesso!')
toast.error('Erro ao salvar refeição')
```

**Localização:**
- App.tsx - Toaster component
- DietPage.tsx - Feedback de CRUD
- ExercisePage.tsx - Feedback de CRUD
- PersonalDataPage.tsx - Feedback de CRUD

---

## 🎨 Padrões de Design Implementados

### 1. Cards com Ações

Padrão usado em MealCard, ExerciseCard:

```tsx
<Card>
  <CardHeader>
    <div className="flex justify-between items-start">
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

---

### 2. Formulário Modal

Padrão usado em todos os formulários:

```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{editing ? 'Editar' : 'Novo'}</DialogTitle>
      <DialogDescription>Preencha os detalhes</DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      
      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {editing ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

---

### 3. Página CRUD Completa

Estrutura padrão das páginas:

```tsx
export function CRUDPage() {
  const [items, setItems] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => { /* ... */ }
  const handleSave = async (data) => { /* ... */ }
  const handleEdit = (item) => { /* ... */ }
  const handleDelete = async (id) => { /* ... */ }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2>Título</h2>
          <p>Descrição</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stat cards */}
      </div>

      {/* List/Grid */}
      {loading ? (
        <div>Carregando...</div>
      ) : items.length === 0 ? (
        <div>Nenhum item</div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <ItemForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        item={editingItem}
      />
    </div>
  )
}
```

---

### 4. Grid Responsivo

Padrão para exibir cards:

```tsx
{/* 1 coluna no mobile, 2 no tablet, 3 no desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <ItemCard key={item.id} item={item} />
  ))}
</div>

{/* Stats com 2 colunas no mobile, 4 no desktop */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {stats.map(stat => (
    <Card key={stat.id}>...</Card>
  ))}
</div>
```

---

### 5. Estado de Loading

Padrão para loading states:

```tsx
{loading ? (
  <div className="text-center py-12 text-gray-400">
    Carregando...
  </div>
) : items.length === 0 ? (
  <div className="text-center py-12">
    <Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-400">Nenhum item cadastrado</p>
    <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
      <Plus className="w-4 h-4 mr-2" />
      Adicionar Primeiro Item
    </Button>
  </div>
) : (
  {/* Render items */}
)}
```

---

## 🎯 Componentes Customizados

### Layout.tsx

**Responsabilidades:**
- Navegação principal
- Header com logout
- Sidebar (desktop) e Bottom Nav (mobile)
- Wrapper para páginas

**Props:**
```typescript
interface LayoutProps {
  children: React.ReactNode
  currentPage?: string
  onNavigate?: (page: string) => void
  onLogout?: () => void
  userName?: string
}
```

---

### Dashboard.tsx

**Responsabilidades:**
- Estatísticas gerais
- Ações rápidas
- Sistema de conquistas

**Props:**
```typescript
interface DashboardProps {
  stats?: {
    mealsLogged: number
    workoutsCompleted: number
    daysTracked: number
    currentStreak: number
  }
  onNavigate?: (page: string) => void
}
```

---

### MealCard.tsx

**Responsabilidades:**
- Exibir detalhes da refeição
- Ações de editar/excluir
- Mostrar alimentos e nutrientes

**Props:**
```typescript
interface MealCardProps {
  meal: Meal
  onEdit: (meal: Meal) => void
  onDelete: (id: string) => void
}
```

---

### MealForm.tsx

**Responsabilidades:**
- Criar/editar refeições
- Adicionar múltiplos alimentos
- Campos de nutrientes opcionais

**Props:**
```typescript
interface MealFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (meal: Omit<Meal, 'id'>) => void
  meal?: Meal
}
```

---

### ExerciseCard.tsx

**Responsabilidades:**
- Exibir treino com lista de exercícios
- Mostrar séries, reps, descanso
- Ações de editar/excluir

**Props:**
```typescript
interface ExerciseCardProps {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onDelete: (id: string) => void
}
```

---

### ExerciseForm.tsx

**Responsabilidades:**
- Criar/editar treinos
- Adicionar múltiplos exercícios
- Seletor de dia da semana

**Props:**
```typescript
interface ExerciseFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (exercise: Omit<Exercise, 'id'>) => void
  exercise?: Exercise
}
```

---

### DailyDataForm.tsx

**Responsabilidades:**
- Registrar dados diários
- Sliders para hidratação, sono, motivação
- Adicionar suplementos

**Props:**
```typescript
interface DailyDataFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<DailyData, 'id'>) => void
  data?: DailyData
}
```

---

### ProgressChart.tsx

**Responsabilidades:**
- Exibir gráfico de linha (Recharts)
- Suportar 4 métricas diferentes
- Últimos 30 registros

**Props:**
```typescript
interface ProgressChartProps {
  data: DailyData[]
  metric: 'weight' | 'hydration' | 'sleep' | 'motivation'
}
```

---

## 🔧 Utilitários e Hooks

### utils/api.ts

Funções para comunicação com backend:

```typescript
// Auth
export const signup = (email, password, name) => { ... }

// Meals
export const getMeals = () => { ... }
export const createMeal = (meal) => { ... }
export const updateMeal = (id, meal) => { ... }
export const deleteMeal = (id) => { ... }

// Exercises
export const getExercises = () => { ... }
export const createExercise = (exercise) => { ... }
export const updateExercise = (id, exercise) => { ... }
export const deleteExercise = (id) => { ... }

// Daily Data
export const getDailyData = () => { ... }
export const createDailyData = (data) => { ... }
export const updateDailyData = (date, data) => { ... }
export const deleteDailyData = (date) => { ... }
```

---

### utils/supabase-client.ts

Singleton do cliente Supabase:

```typescript
export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    )
  }
  return supabaseInstance
}
```

---

## 📱 Responsividade

### Breakpoints Tailwind

```css
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop extra grande */
```

### Padrões Responsivos Usados

**Navegação:**
```tsx
{/* Desktop: Sidebar */}
<aside className="w-64 bg-white min-h-screen hidden md:block">

{/* Mobile: Bottom Navigation */}
<nav className="md:hidden fixed bottom-0 left-0 right-0">
```

**Grid:**
```tsx
{/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

{/* Stats: 2 cols mobile, 4 cols desktop */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
```

**Texto:**
```tsx
{/* Ocultar em mobile, mostrar em desktop */}
<span className="hidden sm:block">Texto completo</span>

{/* Versão abreviada em mobile */}
<span className="sm:hidden">Texto curto</span>
```

**Padding/Margin:**
```tsx
{/* Padding responsivo */}
<div className="p-4 sm:p-6 lg:p-8">

{/* Bottom padding para evitar bottom nav em mobile */}
<div className="pb-20 md:pb-6">
```

---

## 🎨 Classes Tailwind Comuns

### Cores

```css
/* Background gradients */
bg-gradient-to-br from-blue-50 to-indigo-50
bg-gradient-to-br from-blue-500 to-indigo-600

/* Text colors */
text-gray-900    /* Títulos principais */
text-gray-600    /* Texto secundário */
text-gray-400    /* Texto desabilitado/placeholder */
text-indigo-600  /* Accent color */

/* Border colors */
border-gray-200
border-indigo-200
```

### Espaçamento

```css
/* Gaps */
gap-2   /* 0.5rem - 8px */
gap-4   /* 1rem - 16px */
gap-6   /* 1.5rem - 24px */

/* Padding */
p-4     /* 1rem - 16px */
px-4    /* Horizontal padding */
py-2    /* Vertical padding */

/* Margin */
mt-4    /* Margin top */
mb-6    /* Margin bottom */
```

### Layout

```css
/* Flex */
flex items-center justify-between
flex flex-col gap-4

/* Grid */
grid grid-cols-2 gap-4
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Width */
w-full
max-w-6xl
min-w-[80px]
```

---

Este guia fornece uma visão completa dos componentes e padrões usados no DED System! 🎨
