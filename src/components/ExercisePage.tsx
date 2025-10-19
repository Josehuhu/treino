import { useState, useEffect } from 'react'
import { Plus, Dumbbell, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ExerciseCard } from './ExerciseCard'
import { ExerciseForm } from './ExerciseForm'
import { toast } from 'sonner@2.0.3'
import * as api from '../utils/api'

interface Exercise {
  id: string
  name: string
  exercises: Array<{
    name: string
    sets: number
    reps: number
    rest: number
  }>
  dayOfWeek: string
  notes?: string
}

const weekDays = [
  { value: 'monday', label: 'Segunda' },
  { value: 'tuesday', label: 'Terça' },
  { value: 'wednesday', label: 'Quarta' },
  { value: 'thursday', label: 'Quinta' },
  { value: 'friday', label: 'Sexta' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
]

export function ExercisePage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | undefined>()
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState('all')

  useEffect(() => {
    loadExercises()
  }, [])

  const loadExercises = async () => {
    try {
      setLoading(true)
      const response = await api.getExercises()
      setExercises(response.exercises)
    } catch (error) {
      console.error('Error loading exercises:', error)
      toast.error('Erro ao carregar exercícios')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveExercise = async (exerciseData: Omit<Exercise, 'id'>) => {
    try {
      if (editingExercise) {
        await api.updateExercise(editingExercise.id, exerciseData)
        toast.success('Treino atualizado com sucesso!')
      } else {
        await api.createExercise(exerciseData)
        toast.success('Treino criado com sucesso!')
      }
      await loadExercises()
      setEditingExercise(undefined)
    } catch (error) {
      console.error('Error saving exercise:', error)
      toast.error('Erro ao salvar treino')
    }
  }

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setIsFormOpen(true)
  }

  const handleDeleteExercise = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este treino?')) return

    try {
      await api.deleteExercise(id)
      toast.success('Treino excluído com sucesso!')
      await loadExercises()
    } catch (error) {
      console.error('Error deleting exercise:', error)
      toast.error('Erro ao excluir treino')
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingExercise(undefined)
  }

  const filteredExercises = selectedDay === 'all'
    ? exercises
    : exercises.filter(ex => ex.dayOfWeek === selectedDay)

  // Group exercises by day
  const exercisesByDay = weekDays.reduce((acc, day) => {
    acc[day.value] = exercises.filter(ex => ex.dayOfWeek === day.value)
    return acc
  }, {} as Record<string, Exercise[]>)

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900 flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Gestão de Exercícios
          </h2>
          <p className="text-gray-600 mt-1">Organize seus treinos semanais</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Treino
        </Button>
      </div>

      {/* Stats */}
      {exercises.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Total de Treinos</p>
            <p className="text-gray-900 mt-1">{exercises.length}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Total de Exercícios</p>
            <p className="text-gray-900 mt-1">
              {exercises.reduce((sum, ex) => sum + ex.exercises.length, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Dias Ativos</p>
            <p className="text-gray-900 mt-1">
              {new Set(exercises.map(ex => ex.dayOfWeek)).size}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="w-full flex flex-wrap h-auto">
          <TabsTrigger value="all" className="flex-1 min-w-[80px]">
            Todos
          </TabsTrigger>
          {weekDays.map(day => (
            <TabsTrigger key={day.value} value={day.value} className="flex-1 min-w-[80px]">
              {day.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Carregando...</div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum treino cadastrado ainda</p>
              <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Treino
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {weekDays.map(day => {
                const dayExercises = exercisesByDay[day.value]
                if (dayExercises.length === 0) return null

                return (
                  <div key={day.value}>
                    <h3 className="text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {day.label}-feira
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dayExercises.map(exercise => (
                        <ExerciseCard
                          key={exercise.id}
                          exercise={exercise}
                          onEdit={handleEditExercise}
                          onDelete={handleDeleteExercise}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </TabsContent>

        {weekDays.map(day => (
          <TabsContent key={day.value} value={day.value} className="mt-6">
            {loading ? (
              <div className="text-center py-12 text-gray-400">Carregando...</div>
            ) : exercisesByDay[day.value].length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">Nenhum treino para {day.label}-feira</p>
                <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Treino
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercisesByDay[day.value].map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onEdit={handleEditExercise}
                    onDelete={handleDeleteExercise}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <ExerciseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveExercise}
        exercise={editingExercise}
      />
    </div>
  )
}
