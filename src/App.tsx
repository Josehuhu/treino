import { useState, useEffect } from 'react'
import { createClient } from './utils/supabase-client'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { DietPage } from './components/DietPage'
import { ExercisePage } from './components/ExercisePage'
import { PersonalDataPage } from './components/PersonalDataPage'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { toast, Toaster } from 'sonner@2.0.3'
import { signup } from './utils/api'
import * as api from './utils/api'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState({
    mealsLogged: 0,
    workoutsCompleted: 0,
    daysTracked: 0,
    currentStreak: 0,
  })

  // Login/Signup form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadStats()
    }
  }, [isAuthenticated, currentPage])

  const loadStats = async () => {
    try {
      const [mealsResponse, exercisesResponse, dailyDataResponse] = await Promise.all([
        api.getMeals(),
        api.getExercises(),
        api.getDailyData(),
      ])

      const meals = mealsResponse.meals || []
      const exercises = exercisesResponse.exercises || []
      const dailyData = dailyDataResponse.data || []

      // Calculate streak
      const sortedDates = dailyData
        .map((d: any) => new Date(d.date))
        .sort((a: Date, b: Date) => b.getTime() - a.getTime())
      
      let streak = 0
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      for (let i = 0; i < sortedDates.length; i++) {
        const date = new Date(sortedDates[i])
        date.setHours(0, 0, 0, 0)
        
        const expectedDate = new Date(today)
        expectedDate.setDate(today.getDate() - i)
        expectedDate.setHours(0, 0, 0, 0)
        
        if (date.getTime() === expectedDate.getTime()) {
          streak++
        } else {
          break
        }
      }

      setStats({
        mealsLogged: meals.length,
        workoutsCompleted: exercises.length,
        daysTracked: dailyData.length,
        currentStreak: streak,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()

      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token)
        setIsAuthenticated(true)
        setUserName(session.user?.user_metadata?.name || session.user?.email || 'Usuário')
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(`Erro ao fazer login: ${error.message}`)
        return
      }

      if (data.session?.access_token) {
        localStorage.setItem('access_token', data.session.access_token)
        setIsAuthenticated(true)
        setUserName(data.user?.user_metadata?.name || data.user?.email || 'Usuário')
        toast.success('Login realizado com sucesso!')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('Erro ao fazer login')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Por favor, preencha seu nome')
      return
    }

    try {
      await signup(email, password, name)
      
      // Now sign in
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(`Erro ao fazer login: ${error.message}`)
        return
      }

      if (data.session?.access_token) {
        localStorage.setItem('access_token', data.session.access_token)
        setIsAuthenticated(true)
        setUserName(name)
        toast.success('Conta criada com sucesso!')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('Erro ao criar conta')
    }
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      localStorage.removeItem('access_token')
      setIsAuthenticated(false)
      setCurrentPage('dashboard')
      setUserName('')
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Erro ao fazer logout')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <Toaster richColors position="top-center" />
        
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💪</span>
            </div>
            <CardTitle>DED System</CardTitle>
            <CardDescription>
              Gerencie sua Dieta, Exercícios e Dados pessoais
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'signin' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Senha</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Criar Conta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard stats={stats} onNavigate={setCurrentPage} />
      case 'dieta':
        return <DietPage />
      case 'exercicio':
        return <ExercisePage />
      case 'dados':
        return <PersonalDataPage />
      default:
        return <Dashboard stats={stats} onNavigate={setCurrentPage} />
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        userName={userName}
      >
        {renderPage()}
      </Layout>
    </>
  )
}