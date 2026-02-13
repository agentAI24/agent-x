# Vertex AI Gemini API Guide

## Настройка

API ключ уже сохранён в `.env`. Для использования:

```bash
# Загрузить переменные
source .env
```

## Доступные модели

| Модель | Назначение | Код модели |
|--------|-----------|------------|
| Gemini 1.5 Flash | Быстрые задачи, чат | `gemini-1.5-flash-002` |
| Gemini 1.5 Pro | Сложные задачи, код | `gemini-1.5-pro-002` |
| Gemini 1.0 Ultra | Максимальное качество | `gemini-1.0-ultra-001` |

## REST API примеры

### 1. Текст (Gemini Flash)
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=$GOOGLE_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts":[{"text": "Напиши приветствие для маркетплейса AI-агентов"}]
    }]
  }'
```

### 2. Генерация кода (Gemini Pro)
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=$GOOGLE_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts":[{"text": "Напиши React компонент для карточки агента с Tailwind CSS"}]
    }],
    "generationConfig": {
      "temperature": 0.2,
      "maxOutputTokens": 2048
    }
  }'
```

### 3. Анализ изображения
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=$GOOGLE_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts":[
        {"text": "Опиши что на изображении"},
        {"inline_data": {"mime_type":"image/jpeg", "data": "$(base64 -w 0 image.jpg)"}}
      ]
    }]
  }'
```

## Генерация изображений (Imagen)

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=$GOOGLE_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "instances": [{
      "prompt": "Futuristic AI marketplace interface, dark theme, neon red accents, glass morphism design, 4k"
    }],
    "parameters": {
      "sampleCount": 1,
      "aspectRatio": "16:9"
    }
  }'
```

## JavaScript/TypeScript интеграция

```typescript
// utils/gemini.ts
const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = 'gemini-1.5-pro-002';

export async function generateCode(prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096,
        },
      }),
    }
  );
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Использование
const code = await generateCode('Напиши API endpoint для Express');
```

## Python интеграция

```python
# utils/gemini.py
import os
import google.generativeai as genai

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-1.5-pro-002')

response = model.generate_content("Напиши функцию сортировки")
print(response.text)
```

## Лимиты (Free Tier)

- **Gemini Flash:** 60 запросов/мин
- **Gemini Pro:** 30 запросов/мин
- **Imagen:** 10 изображений/день

## CODECLAW + Vertex AI

Для использования Gemini вместо OpenAI:

```bash
# Установить SDK
npm install @google/generative-ai

# Использовать в коде
export GOOGLE_API_KEY=AQ.Ab8RN6JdURBB5rjmVLMII4BMPA9bsjOe-jC9TAzteXPIJrnNiw
```

## Полезные ссылки

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Gemini API Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [Pricing](https://ai.google.dev/pricing)
