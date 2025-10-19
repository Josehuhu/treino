import { Clock, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface Meal {
  id: string
  name: string
  time: string
  foods: string[]
  nutrients: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

interface MealCardProps {
  meal: Meal
  onEdit: (meal: Meal) => void
  onDelete: (id: string) => void
}

export function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{meal.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              {meal.time}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(meal)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(meal.id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 text-sm mb-2">Alimentos:</p>
            <div className="flex flex-wrap gap-2">
              {meal.foods.map((food, index) => (
                <Badge key={index} variant="secondary">
                  {food}
                </Badge>
              ))}
              {meal.foods.length === 0 && (
                <span className="text-gray-400 text-sm">Nenhum alimento adicionado</span>
              )}
            </div>
          </div>
          
          {Object.keys(meal.nutrients).length > 0 && (
            <div>
              <p className="text-gray-600 text-sm mb-2">Nutrientes:</p>
              <div className="grid grid-cols-2 gap-2">
                {meal.nutrients.calories && (
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Calorias</p>
                    <p className="text-gray-900">{meal.nutrients.calories} kcal</p>
                  </div>
                )}
                {meal.nutrients.protein && (
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Proteína</p>
                    <p className="text-gray-900">{meal.nutrients.protein}g</p>
                  </div>
                )}
                {meal.nutrients.carbs && (
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Carboidratos</p>
                    <p className="text-gray-900">{meal.nutrients.carbs}g</p>
                  </div>
                )}
                {meal.nutrients.fat && (
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Gorduras</p>
                    <p className="text-gray-900">{meal.nutrients.fat}g</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
