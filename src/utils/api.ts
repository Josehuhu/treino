import { projectId, publicAnonKey } from './supabase/info'

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-2cdd57ac`

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token') || publicAnonKey
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    console.error(`API Error on ${endpoint}:`, data)
    throw new Error(data.error || 'API request failed')
  }
  
  return data
}

// Auth
export const signup = (email: string, password: string, name: string) =>
  fetchAPI('/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  })

// Meals
export const getMeals = () => fetchAPI('/meals')
export const createMeal = (meal: any) => fetchAPI('/meals', {
  method: 'POST',
  body: JSON.stringify(meal)
})
export const updateMeal = (id: string, meal: any) => fetchAPI(`/meals/${id}`, {
  method: 'PUT',
  body: JSON.stringify(meal)
})
export const deleteMeal = (id: string) => fetchAPI(`/meals/${id}`, {
  method: 'DELETE'
})

// Exercises
export const getExercises = () => fetchAPI('/exercises')
export const createExercise = (exercise: any) => fetchAPI('/exercises', {
  method: 'POST',
  body: JSON.stringify(exercise)
})
export const updateExercise = (id: string, exercise: any) => fetchAPI(`/exercises/${id}`, {
  method: 'PUT',
  body: JSON.stringify(exercise)
})
export const deleteExercise = (id: string) => fetchAPI(`/exercises/${id}`, {
  method: 'DELETE'
})

// Daily Data
export const getDailyData = () => fetchAPI('/daily-data')
export const createDailyData = (data: any) => fetchAPI('/daily-data', {
  method: 'POST',
  body: JSON.stringify(data)
})
export const updateDailyData = (date: string, data: any) => fetchAPI(`/daily-data/${date}`, {
  method: 'PUT',
  body: JSON.stringify(data)
})
export const deleteDailyData = (date: string) => fetchAPI(`/daily-data/${date}`, {
  method: 'DELETE'
})
