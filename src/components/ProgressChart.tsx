import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface DailyData {
  date: string
  weight?: number | null
  hydration: number
  sleep: number
  motivation: number
}

interface ProgressChartProps {
  data: DailyData[]
  metric: 'weight' | 'hydration' | 'sleep' | 'motivation'
}

export function ProgressChart({ data, metric }: ProgressChartProps) {
  const titles = {
    weight: 'Evolução do Peso',
    hydration: 'Consumo de Água',
    sleep: 'Horas de Sono',
    motivation: 'Nível de Motivação',
  }

  const units = {
    weight: 'kg',
    hydration: 'ml',
    sleep: 'horas',
    motivation: 'nível',
  }

  const colors = {
    weight: '#8b5cf6',
    hydration: '#3b82f6',
    sleep: '#6366f1',
    motivation: '#f59e0b',
  }

  // Sort data by date and format for chart
  const chartData = data
    .filter(d => metric === 'weight' ? d.weight != null : true)
    .map(d => ({
      date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      value: metric === 'weight' ? d.weight : d[metric],
    }))
    .sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('')
      const dateB = b.date.split('/').reverse().join('')
      return dateA.localeCompare(dateB)
    })
    .slice(-30) // Last 30 days

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{titles[metric]}</CardTitle>
          <CardDescription>Últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Sem dados para exibir
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titles[metric]}</CardTitle>
        <CardDescription>Últimos {chartData.length} registros</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: units[metric], angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
              formatter={(value: number) => [`${value} ${units[metric]}`, titles[metric]]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors[metric]} 
              strokeWidth={2}
              dot={{ fill: colors[metric], r: 4 }}
              name={titles[metric]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
