import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'

interface Meal {
  id?: string
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

interface MealFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (meal: Omit<Meal, 'id'>) => void
  meal?: Meal
}

export function MealForm({ isOpen, onClose, onSave, meal }: MealFormProps) {
  const [name, setName] = useState('')
  const [customName, setCustomName] = useState('')
  const [time, setTime] = useState('')
  const [foodInput, setFoodInput] = useState('')
  const [foods, setFoods] = useState<string[]>([])
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const mealTypes = [
    { value: 'Café da Manhã', time: '07:00' },
    { value: 'Lanche da Manhã', time: '10:00' },
    { value: 'Almoço', time: '12:00' },
    { value: 'Lanche da Tarde', time: '15:00' },
    { value: 'Jantar', time: '19:00' },
    { value: 'Ceia', time: '21:00' },
    { value: 'Pré-Treino', time: '08:00' },
    { value: 'Pós-Treino', time: '09:00' },
    { value: 'custom', time: '' },
  ]

  const handleMealTypeSelect = (value: string) => {
    if (value === 'custom') {
      setName('custom')
      return
    }
    setName(value)
    const selectedMeal = mealTypes.find(m => m.value === value)
    if (selectedMeal && !meal && selectedMeal.time) {
      setTime(selectedMeal.time)
    }
  }

  useEffect(() => {
    if (meal) {
      // Check if meal name is a predefined type
      const isPredefined = mealTypes.some(mt => mt.value === meal.name)
      if (isPredefined) {
        setName(meal.name)
      } else {
        setName('custom')
        setCustomName(meal.name)
      }
      setTime(meal.time)
      setFoods(meal.foods)
      setCalories(meal.nutrients.calories?.toString() || '')
      setProtein(meal.nutrients.protein?.toString() || '')
      setCarbs(meal.nutrients.carbs?.toString() || '')
      setFat(meal.nutrients.fat?.toString() || '')
    } else {
      resetForm()
    }
  }, [meal, isOpen])

  const resetForm = () => {
    setName('')
    setCustomName('')
    setTime('')
    setFoodInput('')
    setFoods([])
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
  }

  const addFood = () => {
    if (foodInput.trim()) {
      setFoods([...foods, foodInput.trim()])
      setFoodInput('')
    }
  }

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const mealData = {
      name: name === 'custom' ? customName : name,
      time,
      foods,
      nutrients: {
        ...(calories && { calories: parseFloat(calories) }),
        ...(protein && { protein: parseFloat(protein) }),
        ...(carbs && { carbs: parseFloat(carbs) }),
        ...(fat && { fat: parseFloat(fat) }),
      },
    }

    onSave(mealData)
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{meal ? 'Editar Refeição' : 'Nova Refeição'}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da sua refeição
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Refeição *</Label>
              <Select onValueChange={handleMealTypeSelect} value={name}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo de refeição" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.slice(0, -1).map(mealType => (
                    <SelectItem key={mealType.value} value={mealType.value}>
                      {mealType.value}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
              {name === 'custom' && (
                <Input
                  id="customName"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Digite o nome da refeição"
                  required
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foods">Alimentos</Label>
            <div className="flex gap-2">
              <Input
                id="foods"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                placeholder="Digite um alimento"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addFood()
                  }
                }}
              />
              <Button type="button" onClick={addFood} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {foods.map((food, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {food}
                  <button
                    type="button"
                    onClick={() => removeFood(index)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Nutrientes (opcional)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories" className="text-sm">Calorias (kcal)</Label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="protein" className="text-sm">Proteína (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbs" className="text-sm">Carboidratos (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fat" className="text-sm">Gorduras (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {meal ? 'Atualizar' : 'Criar'} Refeição
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}