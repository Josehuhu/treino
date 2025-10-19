import { useState, useEffect } from 'react'
import { Plus, Utensils, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { MealCard } from './MealCard'
import { MealForm } from './MealForm'
import { toast } from 'sonner@2.0.3'
import * as api from '../utils/api'

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

export function DietPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMeals()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.foods.some(food => food.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredMeals(filtered)
    } else {
      setFilteredMeals(meals)
    }
  }, [searchQuery, meals])

  const loadMeals = async () => {
    try {
      setLoading(true)
      const response = await api.getMeals()
      setMeals(response.meals)
      setFilteredMeals(response.meals)
    } catch (error) {
      console.error('Error loading meals:', error)
      toast.error('Erro ao carregar refeições')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMeal = async (mealData: Omit<Meal, 'id'>) => {
    try {
      if (editingMeal) {
        await api.updateMeal(editingMeal.id, mealData)
        toast.success('Refeição atualizada com sucesso!')
      } else {
        await api.createMeal(mealData)
        toast.success('Refeição criada com sucesso!')
      }
      await loadMeals()
      setEditingMeal(undefined)
    } catch (error) {
      console.error('Error saving meal:', error)
      toast.error('Erro ao salvar refeição')
    }
  }

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal)
    setIsFormOpen(true)
  }

  const handleDeleteMeal = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta refeição?')) return

    try {
      await api.deleteMeal(id)
      toast.success('Refeição excluída com sucesso!')
      await loadMeals()
    } catch (error) {
      console.error('Error deleting meal:', error)
      toast.error('Erro ao excluir refeição')
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingMeal(undefined)
  }

  // Sort meals by time
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    return a.time.localeCompare(b.time)
  })

  // Calculate total nutrients
  const totalNutrients = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + (meal.nutrients.calories || 0),
      protein: acc.protein + (meal.nutrients.protein || 0),
      carbs: acc.carbs + (meal.nutrients.carbs || 0),
      fat: acc.fat + (meal.nutrients.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900 flex items-center gap-2">
            <Utensils className="w-6 h-6" />
            Gestão de Dieta
          </h2>
          <p className="text-gray-600 mt-1">Gerencie suas refeições e acompanhe sua nutrição</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Refeição
        </Button>
      </div>

      {/* Nutrition Summary */}
      {meals.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Calorias Totais</p>
            <p className="text-gray-900 mt-1">{totalNutrients.calories.toFixed(0)} kcal</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Proteínas</p>
            <p className="text-gray-900 mt-1">{totalNutrients.protein.toFixed(1)}g</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Carboidratos</p>
            <p className="text-gray-900 mt-1">{totalNutrients.carbs.toFixed(1)}g</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">Gorduras</p>
            <p className="text-gray-900 mt-1">{totalNutrients.fat.toFixed(1)}g</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar refeições..."
          className="pl-10"
        />
      </div>

      {/* Meals Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Carregando...</div>
      ) : sortedMeals.length === 0 ? (
        <div className="text-center py-12">
          <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">
            {searchQuery ? 'Nenhuma refeição encontrada' : 'Nenhuma refeição cadastrada ainda'}
          </p>
          {!searchQuery && (
            <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Refeição
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onEdit={handleEditMeal}
              onDelete={handleDeleteMeal}
            />
          ))}
        </div>
      )}

      <MealForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveMeal}
        meal={editingMeal}
      />
    </div>
  )
}
