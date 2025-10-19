import { Calendar, TrendingUp, Award, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface DashboardProps {
  stats?: {
    mealsLogged: number
    workoutsCompleted: number
    daysTracked: number
    currentStreak: number
  }
  onNavigate?: (page: string) => void
}

export function Dashboard({ stats, onNavigate }: DashboardProps) {
  const defaultStats = {
    mealsLogged: stats?.mealsLogged || 0,
    workoutsCompleted: stats?.workoutsCompleted || 0,
    daysTracked: stats?.daysTracked || 0,
    currentStreak: stats?.currentStreak || 0,
  }

  const achievements = [
    { id: 1, title: 'Primeira Refeição', description: 'Cadastre sua primeira refeição', completed: defaultStats.mealsLogged > 0 },
    { id: 2, title: 'Primeiro Treino', description: 'Cadastre seu primeiro treino', completed: defaultStats.workoutsCompleted > 0 },
    { id: 3, title: 'Consistência', description: 'Registre dados por 7 dias seguidos', completed: defaultStats.currentStreak >= 7 },
  ]

  const quickActions = [
    { id: 'dieta', label: 'Adicionar Refeição', icon: '🍽️', color: 'bg-green-100 text-green-600' },
    { id: 'exercicio', label: 'Registrar Treino', icon: '💪', color: 'bg-blue-100 text-blue-600' },
    { id: 'dados', label: 'Dados de Hoje', icon: '📊', color: 'bg-purple-100 text-purple-600' },
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h2 className="text-gray-900 mb-2">Bem-vindo ao DED System</h2>
        <p className="text-gray-600">Gerencie sua dieta, exercícios e dados pessoais em um só lugar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Refeições Cadastradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{defaultStats.mealsLogged}</span>
              <Badge variant="secondary" className="ml-auto">Total</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Treinos Completados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{defaultStats.workoutsCompleted}</span>
              <Badge variant="secondary" className="ml-auto">Total</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Dias Rastreados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{defaultStats.daysTracked}</span>
              <Calendar className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sequência Atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{defaultStats.currentStreak} dias</span>
              <TrendingUp className="w-4 h-4 text-green-500 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>Comece a registrar suas atividades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => onNavigate?.(action.id)}
              >
                <span className="text-2xl">{action.icon}</span>
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Conquistas
          </CardTitle>
          <CardDescription>Acompanhe seu progresso e ganhe badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  achievement.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {achievement.completed ? '✓' : '🔒'}
                </div>
                <div className="flex-1">
                  <p className={achievement.completed ? 'text-green-900' : 'text-gray-600'}>
                    {achievement.title}
                  </p>
                  <p className="text-gray-500 text-sm">{achievement.description}</p>
                </div>
                {achievement.completed && (
                  <Badge className="bg-green-500">Completo</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
