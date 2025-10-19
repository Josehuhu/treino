import { useState, useEffect } from 'react'
import { X, Plus, Droplets, Moon, Smile, Pill, Scale } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Slider } from './ui/slider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'

interface DailyData {
  id?: string
  date: string
  hydration: number
  sleep: number
  motivation: number
  supplements: string[]
  weight?: number | null
  notes?: string
}

interface DailyDataFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<DailyData, 'id'>) => void
  data?: DailyData
}

export function DailyDataForm({ isOpen, onClose, onSave, data }: DailyDataFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [hydration, setHydration] = useState(2000)
  const [sleep, setSleep] = useState(8)
  const [motivation, setMotivation] = useState(5)
  const [supplementInput, setSupplementInput] = useState('')
  const [supplements, setSupplements] = useState<string[]>([])
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (data) {
      setDate(data.date)
      setHydration(data.hydration)
      setSleep(data.sleep)
      setMotivation(data.motivation)
      setSupplements(data.supplements)
      setWeight(data.weight?.toString() || '')
      setNotes(data.notes || '')
    } else {
      resetForm()
    }
  }, [data, isOpen])

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0])
    setHydration(2000)
    setSleep(8)
    setMotivation(5)
    setSupplementInput('')
    setSupplements([])
    setWeight('')
    setNotes('')
  }

  const addSupplement = () => {
    if (supplementInput.trim()) {
      setSupplements([...supplements, supplementInput.trim()])
      setSupplementInput('')
    }
  }

  const removeSupplement = (index: number) => {
    setSupplements(supplements.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const dailyData = {
      date,
      hydration,
      sleep,
      motivation,
      supplements,
      weight: weight ? parseFloat(weight) : null,
      notes,
    }

    onSave(dailyData)
    resetForm()
    onClose()
  }

  const motivationLabels = ['Muito Baixa', 'Baixa', 'Normal', 'Boa', 'Muito Boa']
  const motivationEmojis = ['😞', '😕', '😐', '🙂', '😄']

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{data ? 'Editar Dados do Dia' : 'Registrar Dados do Dia'}</DialogTitle>
          <DialogDescription>
            Registre seus dados diários para acompanhar seu progresso
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Hidratação: {hydration}ml
            </Label>
            <Slider
              value={[hydration]}
              onValueChange={(v) => setHydration(v[0])}
              min={0}
              max={5000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0ml</span>
              <span>2.5L</span>
              <span>5L</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              Sono: {sleep}h
            </Label>
            <Slider
              value={[sleep]}
              onValueChange={(v) => setSleep(v[0])}
              min={0}
              max={12}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-yellow-500" />
              Motivação: {motivationLabels[motivation - 1]} {motivationEmojis[motivation - 1]}
            </Label>
            <Slider
              value={[motivation]}
              onValueChange={(v) => setMotivation(v[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              {motivationLabels.map((label, i) => (
                <span key={i}>{motivationEmojis[i]}</span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-green-500" />
              Suplementação
            </Label>
            <div className="flex gap-2">
              <Input
                id="supplement-input"
                value={supplementInput}
                onChange={(e) => setSupplementInput(e.target.value)}
                placeholder="Digite o nome do suplemento"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSupplement()
                  }
                }}
              />
              <Button type="button" onClick={addSupplement} size="icon" aria-label="Adicionar suplemento">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {supplements.map((supplement, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {supplement}
                  <button
                    type="button"
                    onClick={() => removeSupplement(index)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-500" />
              Peso (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 70.5"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como você se sentiu hoje? Alguma observação importante?"
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {data ? 'Atualizar' : 'Registrar'} Dados
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}