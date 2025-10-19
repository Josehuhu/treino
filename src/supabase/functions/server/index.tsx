import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// ===== AUTH ROUTES =====

app.post('/make-server-2cdd57ac/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })
    
    if (error) {
      console.log('Error during signup:', error)
      return c.json({ error: error.message }, 400)
    }
    
    // Store user data in KV
    await kv.set(`users:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      createdAt: new Date().toISOString()
    })
    
    return c.json({ user: data.user })
  } catch (error) {
    console.log('Exception during signup:', error)
    return c.json({ error: String(error) }, 500)
  }
})

// ===== MEALS ROUTES =====

app.get('/make-server-2cdd57ac/meals', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const meals = await kv.getByPrefix(`meals:${user.id}:`)
    return c.json({ meals: meals || [] })
  } catch (error) {
    console.log('Error fetching meals:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.post('/make-server-2cdd57ac/meals', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const mealId = crypto.randomUUID()
    
    const meal = {
      id: mealId,
      userId: user.id,
      name: body.name,
      time: body.time,
      foods: body.foods || [],
      nutrients: body.nutrients || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`meals:${user.id}:${mealId}`, meal)
    
    return c.json({ meal })
  } catch (error) {
    console.log('Error creating meal:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.put('/make-server-2cdd57ac/meals/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const mealId = c.req.param('id')
    const body = await c.req.json()
    
    const existingMeal = await kv.get(`meals:${user.id}:${mealId}`)
    
    if (!existingMeal) {
      return c.json({ error: 'Meal not found' }, 404)
    }
    
    const updatedMeal = {
      ...existingMeal,
      name: body.name,
      time: body.time,
      foods: body.foods,
      nutrients: body.nutrients,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`meals:${user.id}:${mealId}`, updatedMeal)
    
    return c.json({ meal: updatedMeal })
  } catch (error) {
    console.log('Error updating meal:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.delete('/make-server-2cdd57ac/meals/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const mealId = c.req.param('id')
    await kv.del(`meals:${user.id}:${mealId}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.log('Error deleting meal:', error)
    return c.json({ error: String(error) }, 500)
  }
})

// ===== EXERCISES ROUTES =====

app.get('/make-server-2cdd57ac/exercises', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const exercises = await kv.getByPrefix(`exercises:${user.id}:`)
    return c.json({ exercises: exercises || [] })
  } catch (error) {
    console.log('Error fetching exercises:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.post('/make-server-2cdd57ac/exercises', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const exerciseId = crypto.randomUUID()
    
    const exercise = {
      id: exerciseId,
      userId: user.id,
      name: body.name,
      exercises: body.exercises || [],
      dayOfWeek: body.dayOfWeek,
      notes: body.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`exercises:${user.id}:${exerciseId}`, exercise)
    
    return c.json({ exercise })
  } catch (error) {
    console.log('Error creating exercise:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.put('/make-server-2cdd57ac/exercises/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const exerciseId = c.req.param('id')
    const body = await c.req.json()
    
    const existingExercise = await kv.get(`exercises:${user.id}:${exerciseId}`)
    
    if (!existingExercise) {
      return c.json({ error: 'Exercise not found' }, 404)
    }
    
    const updatedExercise = {
      ...existingExercise,
      name: body.name,
      exercises: body.exercises,
      dayOfWeek: body.dayOfWeek,
      notes: body.notes,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`exercises:${user.id}:${exerciseId}`, updatedExercise)
    
    return c.json({ exercise: updatedExercise })
  } catch (error) {
    console.log('Error updating exercise:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.delete('/make-server-2cdd57ac/exercises/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const exerciseId = c.req.param('id')
    await kv.del(`exercises:${user.id}:${exerciseId}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.log('Error deleting exercise:', error)
    return c.json({ error: String(error) }, 500)
  }
})

// ===== DAILY DATA ROUTES =====

app.get('/make-server-2cdd57ac/daily-data', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const dailyData = await kv.getByPrefix(`daily_data:${user.id}:`)
    return c.json({ dailyData: dailyData || [] })
  } catch (error) {
    console.log('Error fetching daily data:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.post('/make-server-2cdd57ac/daily-data', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const body = await c.req.json()
    const date = body.date || new Date().toISOString().split('T')[0]
    
    const dailyRecord = {
      id: `${user.id}_${date}`,
      userId: user.id,
      date,
      hydration: body.hydration || 0,
      sleep: body.sleep || 0,
      motivation: body.motivation || 5,
      supplements: body.supplements || [],
      weight: body.weight || null,
      notes: body.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`daily_data:${user.id}:${date}`, dailyRecord)
    
    return c.json({ dailyRecord })
  } catch (error) {
    console.log('Error creating daily data:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.put('/make-server-2cdd57ac/daily-data/:date', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const date = c.req.param('date')
    const body = await c.req.json()
    
    const existingData = await kv.get(`daily_data:${user.id}:${date}`)
    
    const updatedData = {
      ...existingData,
      id: `${user.id}_${date}`,
      userId: user.id,
      date,
      hydration: body.hydration,
      sleep: body.sleep,
      motivation: body.motivation,
      supplements: body.supplements,
      weight: body.weight,
      notes: body.notes,
      updatedAt: new Date().toISOString(),
      createdAt: existingData?.createdAt || new Date().toISOString()
    }
    
    await kv.set(`daily_data:${user.id}:${date}`, updatedData)
    
    return c.json({ dailyRecord: updatedData })
  } catch (error) {
    console.log('Error updating daily data:', error)
    return c.json({ error: String(error) }, 500)
  }
})

app.delete('/make-server-2cdd57ac/daily-data/:date', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const date = c.req.param('date')
    await kv.del(`daily_data:${user.id}:${date}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.log('Error deleting daily data:', error)
    return c.json({ error: String(error) }, 500)
  }
})

Deno.serve(app.fetch)
