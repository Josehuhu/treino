# 📝 Exemplos de Dados - DED System

Este arquivo contém exemplos práticos de dados para testar e entender o sistema.

---

## 🍽️ Exemplos de Refeições

### Café da Manhã - Fitness

```json
{
  "name": "Café da Manhã - Fit",
  "time": "07:00",
  "foods": ["3 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café preto"],
  "nutrients": {
    "calories": 520,
    "protein": 32,
    "carbs": 58,
    "fat": 14
  }
}
```

### Almoço - Bulking

```json
{
  "name": "Almoço - Bulking",
  "time": "12:30",
  "foods": ["200g frango grelhado", "150g arroz integral", "100g feijão", "Salada completa", "Azeite"],
  "nutrients": {
    "calories": 750,
    "protein": 65,
    "carbs": 85,
    "fat": 12
  }
}
```

### Lanche Pré-Treino

```json
{
  "name": "Pré-Treino",
  "time": "15:30",
  "foods": ["1 batata doce média", "1 dose whey protein"],
  "nutrients": {
    "calories": 280,
    "protein": 28,
    "carbs": 35,
    "fat": 2
  }
}
```

### Jantar - Low Carb

```json
{
  "name": "Jantar - Low Carb",
  "time": "19:30",
  "foods": ["200g salmão", "Brócolis", "Aspargos", "Salada verde"],
  "nutrients": {
    "calories": 420,
    "protein": 45,
    "carbs": 12,
    "fat": 22
  }
}
```

### Ceia - Proteica

```json
{
  "name": "Ceia",
  "time": "22:00",
  "foods": ["200g queijo cottage", "10 amêndoas"],
  "nutrients": {
    "calories": 230,
    "protein": 28,
    "carbs": 8,
    "fat": 10
  }
}
```

---

## 💪 Exemplos de Treinos

### Treino A - Peito e Tríceps (Segunda-feira)

```json
{
  "name": "Treino A - Peito e Tríceps",
  "dayOfWeek": "monday",
  "exercises": [
    {
      "name": "Supino reto com barra",
      "sets": 4,
      "reps": 10,
      "rest": 90
    },
    {
      "name": "Supino inclinado com halteres",
      "sets": 4,
      "reps": 12,
      "rest": 75
    },
    {
      "name": "Crucifixo no cabo",
      "sets": 3,
      "reps": 15,
      "rest": 60
    },
    {
      "name": "Tríceps francês",
      "sets": 3,
      "reps": 12,
      "rest": 60
    },
    {
      "name": "Tríceps corda",
      "sets": 3,
      "reps": 15,
      "rest": 45
    }
  ],
  "notes": "Focar na contração e controlar a descida. Aumentar peso no supino reto."
}
```

### Treino B - Costas e Bíceps (Terça-feira)

```json
{
  "name": "Treino B - Costas e Bíceps",
  "dayOfWeek": "tuesday",
  "exercises": [
    {
      "name": "Barra fixa",
      "sets": 4,
      "reps": 8,
      "rest": 90
    },
    {
      "name": "Remada curvada",
      "sets": 4,
      "reps": 10,
      "rest": 75
    },
    {
      "name": "Pulldown",
      "sets": 3,
      "reps": 12,
      "rest": 60
    },
    {
      "name": "Rosca direta",
      "sets": 3,
      "reps": 12,
      "rest": 60
    },
    {
      "name": "Rosca martelo",
      "sets": 3,
      "reps": 12,
      "rest": 45
    }
  ],
  "notes": "Manter postura correta na remada. Trabalhar toda amplitude na barra."
}
```

### Treino C - Pernas e Ombros (Quinta-feira)

```json
{
  "name": "Treino C - Pernas e Ombros",
  "dayOfWeek": "thursday",
  "exercises": [
    {
      "name": "Agachamento livre",
      "sets": 4,
      "reps": 10,
      "rest": 120
    },
    {
      "name": "Leg press 45°",
      "sets": 4,
      "reps": 15,
      "rest": 90
    },
    {
      "name": "Cadeira extensora",
      "sets": 3,
      "reps": 15,
      "rest": 60
    },
    {
      "name": "Mesa flexora",
      "sets": 3,
      "reps": 15,
      "rest": 60
    },
    {
      "name": "Desenvolvimento com halteres",
      "sets": 4,
      "reps": 12,
      "rest": 75
    },
    {
      "name": "Elevação lateral",
      "sets": 3,
      "reps": 15,
      "rest": 45
    }
  ],
  "notes": "Dia mais pesado! Alongar bem antes e depois. Caprichar no agachamento."
}
```

### Treino D - HIIT Cardio (Sábado)

```json
{
  "name": "Treino D - HIIT Cardio",
  "dayOfWeek": "saturday",
  "exercises": [
    {
      "name": "Burpees",
      "sets": 4,
      "reps": 15,
      "rest": 30
    },
    {
      "name": "Mountain climbers",
      "sets": 4,
      "reps": 30,
      "rest": 30
    },
    {
      "name": "Jump squats",
      "sets": 4,
      "reps": 20,
      "rest": 30
    },
    {
      "name": "High knees",
      "sets": 4,
      "reps": 40,
      "rest": 30
    },
    {
      "name": "Prancha",
      "sets": 3,
      "reps": 60,
      "rest": 45
    }
  ],
  "notes": "Circuito de 20 minutos. Manter intensidade alta. Hidratar bem durante."
}
```

---

## 📊 Exemplos de Dados Diários

### Dia Perfeito

```json
{
  "date": "2025-10-19",
  "hydration": 3500,
  "sleep": 8.5,
  "motivation": 5,
  "supplements": ["Whey Protein", "Creatina", "Ômega 3", "Multivitamínico"],
  "weight": 75.2,
  "notes": "Dia excelente! Treino pesado de pernas, bateu todos os PRs. Alimentação impecável, consegui bater todas as macros. Dormi muito bem, acordei disposto. 💪"
}
```

### Dia de Descanso

```json
{
  "date": "2025-10-20",
  "hydration": 2800,
  "sleep": 9,
  "motivation": 4,
  "supplements": ["Multivitamínico", "Ômega 3"],
  "weight": 75.5,
  "notes": "Dia de descanso bem merecido. Corpo recuperando do treino de ontem, pernas ainda doloridas. Aproveitei para alongar e fazer yoga leve. Dormi 1h a mais."
}
```

### Dia Desafiador

```json
{
  "date": "2025-10-21",
  "hydration": 2000,
  "sleep": 6,
  "motivation": 2,
  "supplements": ["Whey Protein"],
  "weight": 75.8,
  "notes": "Dia difícil. Dormi mal por causa de reunião importante no trabalho. Motivação baixa, mas consegui treinar mesmo assim (treino leve). Preciso dormir melhor hoje. 😴"
}
```

### Dia de Refeição Livre

```json
{
  "date": "2025-10-22",
  "hydration": 2500,
  "sleep": 7.5,
  "motivation": 4,
  "supplements": ["Whey Protein", "Creatina"],
  "weight": 76.5,
  "notes": "Sábado! Refeição livre no jantar - pizza com a família 🍕. Peso subiu por retenção de líquido (normal). Treino HIIT pela manhã foi intenso. Voltar ao foco amanhã!"
}
```

### Dia de Progresso

```json
{
  "date": "2025-10-23",
  "hydration": 3200,
  "sleep": 8,
  "motivation": 5,
  "supplements": ["Whey Protein", "Creatina", "Ômega 3", "Multivitamínico", "Vitamina D"],
  "weight": 74.8,
  "notes": "Peso voltou ao normal! Consegui aumentar carga no supino em 5kg 🎉. Consistência está pagando. Mês que vem vou focar em ganho de massa. Planejamento nutricional ajustado."
}
```

---

## 📈 Cenários de Uso

### Cenário 1: Cutting (Perda de Peso)

**Objetivo:** Perder 5kg em 8 semanas

**Refeições Típicas:**
- Total diário: ~1800-2000 kcal
- Proteína: 150-180g
- Carboidratos: 150-180g
- Gorduras: 40-60g

**Treinos:**
- 4x semana musculação
- 2x semana HIIT
- 1x descanso

**Dados Diários:**
- Hidratação: 3000-3500ml
- Sono: 8h mínimo
- Suplementos: Whey, BCAA, Cafeína, Multivitamínico
- Acompanhar peso 2x por semana

---

### Cenário 2: Bulking (Ganho de Massa)

**Objetivo:** Ganhar 3kg em 12 semanas

**Refeições Típicas:**
- Total diário: ~3000-3500 kcal
- Proteína: 180-220g
- Carboidratos: 350-450g
- Gorduras: 80-100g

**Treinos:**
- 5x semana musculação (ABC + repetição)
- 1x semana cardio leve
- 1x descanso

**Dados Diários:**
- Hidratação: 3500-4000ml
- Sono: 8-9h
- Suplementos: Whey, Creatina, Hipercalórico, Ômega 3
- Acompanhar peso 1x por semana

---

### Cenário 3: Manutenção (Fitness)

**Objetivo:** Manter peso e melhorar composição corporal

**Refeições Típicas:**
- Total diário: ~2400-2800 kcal
- Proteína: 160-180g
- Carboidratos: 240-280g
- Gorduras: 60-80g

**Treinos:**
- 4x semana musculação balanceada
- 2x semana atividade aeróbica
- 1x descanso ativo (yoga/alongamento)

**Dados Diários:**
- Hidratação: 2500-3000ml
- Sono: 7-8h
- Suplementos: Whey, Multivitamínico, Ômega 3
- Acompanhar peso quinzenalmente

---

## 🎯 Templates Prontos

### Template: Semana Típica de Treino

```
Segunda: Peito + Tríceps
Terça: Costas + Bíceps  
Quarta: Descanso ou Cardio Leve
Quinta: Pernas + Ombros
Sexta: Peito + Tríceps (Volume)
Sábado: HIIT ou Esporte
Domingo: Descanso Total
```

### Template: Plano Alimentar Diário (2500 kcal)

```
07:00 - Café da Manhã: 520 kcal
10:00 - Lanche 1: 180 kcal
12:30 - Almoço: 750 kcal
15:30 - Pré-Treino: 280 kcal
18:00 - Pós-Treino: 200 kcal (Whey + Fruta)
19:30 - Jantar: 420 kcal
22:00 - Ceia: 230 kcal
----------------------------------------
Total: 2580 kcal
```

### Template: Checklist Diário

```
Manhã:
[ ] Pesar (se dia de pesagem)
[ ] Café da manhã
[ ] Suplementos matinais
[ ] Hidratar (1L até 12h)

Tarde:
[ ] Almoço
[ ] Lanche
[ ] Pré-treino
[ ] Treino
[ ] Pós-treino
[ ] Hidratar (1L à tarde)

Noite:
[ ] Jantar
[ ] Ceia
[ ] Registrar dados no app
[ ] Planejar dia seguinte
[ ] Hidratar (1L à noite)
[ ] Dormir antes das 23h
```

---

## 🔥 Dicas de Observações Criativas

### Para Refeições
- "Primeira vez experimentando essa combinação - aprovado! ✅"
- "Preparar com antecedência no domingo economiza tempo"
- "Proteína batida, mas carboidratos ficaram baixos hoje"
- "Refeição livre do sábado - valeu a pena! 🍕"

### Para Treinos
- "PR no supino! 100kg × 8 reps 💪"
- "Treino em jejum - energia baixa, reduzir volume"
- "Novo parceiro de treino hoje, motivação lá em cima!"
- "Dor muscular de ontem ainda presente, ajustar carga"

### Para Dados Diários
- "Melhor semana do mês! Todos os dias acima de 8h de sono"
- "Estresse no trabalho afetou o sono, preciso relaxar mais"
- "Peso oscilou mas medidas diminuíram - progresso real!"
- "Completei 30 dias consecutivos! Badge desbloqueado 🏆"

---

## 📱 Integração com Rotina

### Manhã (5 min)
1. Abrir app ao acordar
2. Verificar peso (se dia de pesagem)
3. Registrar dados de ontem (se não registrou)
4. Ver treino do dia
5. Planejar refeições

### Durante o Dia
1. Registrar refeições após comer
2. Atualizar hidratação a cada 2-3h
3. Conferir treino antes de ir à academia

### Noite (5-10 min)
1. Registrar todas refeições do dia
2. Atualizar dados diários completos
3. Adicionar observações importantes
4. Ver gráficos de progresso
5. Planejar dia seguinte

---

**Lembre-se:** Estes são apenas exemplos! Adapte conforme suas necessidades, objetivos e preferências pessoais. A consistência no registro é mais importante que a perfeição! 🎯
