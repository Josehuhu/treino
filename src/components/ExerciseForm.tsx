import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface ExerciseItem {
  name: string
  sets: number
  reps: number
  rest: number
}

interface Exercise {
  id?: string
  name: string
  exercises: ExerciseItem[]
  dayOfWeek: string
  notes?: string
}

interface ExerciseFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (exercise: Omit<Exercise, 'id'>) => void
  exercise?: Exercise
}

export function ExerciseForm({ isOpen, onClose, onSave, exercise }: ExerciseFormProps) {
  const [name, setName] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState('monday')
  const [notes, setNotes] = useState('')
  const [exercises, setExercises] = useState<ExerciseItem[]>([])
  
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('3')
  const [reps, setReps] = useState('10')
  const [rest, setRest] = useState('60')

  useEffect(() => {
    if (exercise) {
      setName(exercise.name)
      setDayOfWeek(exercise.dayOfWeek)
      setNotes(exercise.notes || '')
      setExercises(exercise.exercises)
    } else {
      resetForm()
    }
  }, [exercise, isOpen])

  const resetForm = () => {
    setName('')
    setDayOfWeek('monday')
    setNotes('')
    setExercises([])
    setExerciseName('')
    setSets('3')
    setReps('10')
    setRest('60')
  }

  const addExercise = () => {
    if (exerciseName.trim()) {
      setExercises([
        ...exercises,
        {
          name: exerciseName.trim(),
          sets: parseInt(sets) || 3,
          reps: parseInt(reps) || 10,
          rest: parseInt(rest) || 60,
        },
      ])
      setExerciseName('')
      setSets('3')
      setReps('10')
      setRest('60')
    }
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const exerciseData = {
      name,
      exercises,
      dayOfWeek,
      notes,
    }

    onSave(exerciseData)
    resetForm()
    onClose()
  }

  const weekDays = [
    { value: 'monday', label: 'Segunda-feira' },
    { value: 'tuesday', label: 'Terça-feira' },
    { value: 'wednesday', label: 'Quarta-feira' },
    { value: 'thursday', label: 'Quinta-feira' },
    { value: 'friday', label: 'Sexta-feira' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exercise ? 'Editar Treino' : 'Novo Treino'}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do seu treino
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Treino *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Treino A - Peito e Tríceps"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayOfWeek">Dia da Semana *</Label>
              <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                <SelectTrigger id="dayOfWeek">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Adicionar Exercícios</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="space-y-1">
                <Label htmlFor="exercise-name" className="text-xs text-gray-600">Nome</Label>
                <Input
                  id="exercise-name"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  placeholder="Nome do exercício"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addExercise()
                    }
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exercise-sets" className="text-xs text-gray-600">Séries</Label>
                <Input
                  id="exercise-sets"
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  placeholder="Séries"
                  min="1"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exercise-reps" className="text-xs text-gray-600">Repetições</Label>
                <Input
                  id="exercise-reps"
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="Repetições"
                  min="1"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exercise-rest" className="text-xs text-gray-600">Descanso (s)</Label>
                <div className="flex gap-2">
                  <Input
                    id="exercise-rest"
                    type="number"
                    value={rest}
                    onChange={(e) => setRest(e.target.value)}
                    placeholder="Descanso (s)"
                    min="0"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addExercise} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-3">
              {exercises.map((ex, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">{ex.name}</p>
                    <p className="text-gray-500 text-sm">
                      {ex.sets} séries × {ex.reps} reps • {ex.rest}s descanso
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {exercises.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  Nenhum exercício adicionado ainda
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre este treino..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {exercise ? 'Atualizar' : 'Criar'} Treino
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}