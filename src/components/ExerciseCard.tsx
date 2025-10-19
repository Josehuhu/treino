import { Calendar, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

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

interface ExerciseCardProps {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onDelete: (id: string) => void
}

const weekDays: { [key: string]: string } = {
  'monday': 'Segunda',
  'tuesday': 'Terça',
  'wednesday': 'Quarta',
  'thursday': 'Quinta',
  'friday': 'Sexta',
  'saturday': 'Sábado',
  'sunday': 'Domingo',
}

export function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{exercise.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {weekDays[exercise.dayOfWeek] || exercise.dayOfWeek}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(exercise)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(exercise.id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exercise.exercises.length > 0 ? (
            <div className="space-y-2">
              {exercise.exercises.map((ex, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900 mb-2">{ex.name}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {ex.sets} séries
                    </Badge>
                    <Badge variant="outline">
                      {ex.reps} reps
                    </Badge>
                    <Badge variant="outline">
                      {ex.rest}s descanso
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nenhum exercício adicionado</p>
          )}
          
          {exercise.notes && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-blue-600 mb-1">Observações:</p>
              <p className="text-blue-900 text-sm">{exercise.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
