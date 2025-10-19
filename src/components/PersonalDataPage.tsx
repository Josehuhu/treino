import { useState, useEffect } from 'react'
import { Plus, TrendingUp, Calendar, Droplets, Moon, Smile, Scale } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { DailyDataForm } from './DailyDataForm'
import { ProgressChart } from './ProgressChart'
import { toast } from 'sonner@2.0.3'
import * as api from '../utils/api'

interface DailyData {
  id: string
  userId: string
  date: string
  hydration: number
  sleep: number
  motivation: number
  supplements: string[]
  weight?: number | null
  notes?: string
}

export function PersonalDataPage() {
  const [dailyData, setDailyData] = useState<DailyData[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingData, setEditingData] = useState<DailyData | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDailyData()
  }, [])

  const loadDailyData = async () => {
    try {
      setLoading(true)
      const response = await api.getDailyData()
      setDailyData(response.dailyData)
    } catch (error) {
      console.error('Error loading daily data:', error)
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveData = async (data: Omit<DailyData, 'id' | 'userId'>) => {
    try {
      if (editingData) {
        await api.updateDailyData(editingData.date, data)
        toast.success('Dados atualizados com sucesso!')
      } else {
        await api.createDailyData(data)
        toast.success('Dados registrados com sucesso!')
      }
      await loadDailyData()
      setEditingData(undefined)
    } catch (error) {
      console.error('Error saving daily data:', error)
      toast.error('Erro ao salvar dados')
    }
  }

  const handleEditData = (data: DailyData) => {
    setEditingData(data)
    setIsFormOpen(true)
  }

  const handleDeleteData = async (date: string) => {
    if (!confirm('Tem certeza que deseja excluir estes dados?')) return

    try {
      await api.deleteDailyData(date)
      toast.success('Dados excluídos com sucesso!')
      await loadDailyData()
    } catch (error) {
      console.error('Error deleting daily data:', error)
      toast.error('Erro ao excluir dados')
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingData(undefined)
  }

  // Sort by date descending
  const sortedData = [...dailyData].sort((a, b) => 
    b.date.localeCompare(a.date)
  )

  // Calculate averages
  const averages = dailyData.length > 0 ? {
    hydration: dailyData.reduce((sum, d) => sum + d.hydration, 0) / dailyData.length,
    sleep: dailyData.reduce((sum, d) => sum + d.sleep, 0) / dailyData.length,
    motivation: dailyData.reduce((sum, d) => sum + d.motivation, 0) / dailyData.length,
  } : null

  const latestWeight = sortedData.find(d => d.weight)?.weight

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Dados Pessoais
          </h2>
          <p className="text-gray-600 mt-1">Acompanhe seus hábitos e progresso</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Hoje
        </Button>
      </div>

      {/* Stats Cards */}
      {averages && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <Droplets className="w-3 h-3" />
                Hidratação Média
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">{averages.hydration.toFixed(0)}ml</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <Moon className="w-3 h-3" />
                Sono Médio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">{averages.sleep.toFixed(1)}h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <Smile className="w-3 h-3" />
                Motivação Média
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">{averages.motivation.toFixed(1)}/5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <Scale className="w-3 h-3" />
                Peso Atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900">
                {latestWeight ? `${latestWeight}kg` : 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Carregando...</div>
      ) : dailyData.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">Nenhum dado registrado ainda</p>
          <p className="text-gray-500 text-sm mt-2">
            Comece registrando seus dados diários para acompanhar seu progresso
          </p>
          <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Registrar Primeiro Dia
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="charts">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ProgressChart data={dailyData} metric="weight" />
              <ProgressChart data={dailyData} metric="hydration" />
              <ProgressChart data={dailyData} metric="sleep" />
              <ProgressChart data={dailyData} metric="motivation" />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            {sortedData.map((data) => (
              <Card key={data.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {new Date(data.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditData(data)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteData(data.date)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Droplets className="w-3 h-3" />
                        Hidratação
                      </p>
                      <p className="text-gray-900 mt-1">{data.hydration}ml</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Moon className="w-3 h-3" />
                        Sono
                      </p>
                      <p className="text-gray-900 mt-1">{data.sleep}h</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Smile className="w-3 h-3" />
                        Motivação
                      </p>
                      <p className="text-gray-900 mt-1">{data.motivation}/5</p>
                    </div>
                    {data.weight && (
                      <div>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          Peso
                        </p>
                        <p className="text-gray-900 mt-1">{data.weight}kg</p>
                      </div>
                    )}
                  </div>

                  {data.supplements.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-500 text-sm mb-2">Suplementos:</p>
                      <p className="text-gray-900">{data.supplements.join(', ')}</p>
                    </div>
                  )}

                  {data.notes && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-500 text-sm mb-1">Observações:</p>
                      <p className="text-gray-900 text-sm">{data.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}

      <DailyDataForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveData}
        data={editingData}
      />
    </div>
  )
}
