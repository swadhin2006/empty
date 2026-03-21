# CRITIQ Backend API Integration

## Features Added

### 1. TMDB Integration (Real Movie Data)
- Get popular movies with real posters
- Search movies from TMDB database
- Get detailed movie information

### 2. AI Dubbing with OpenAI Translation
- Professional translation using GPT-3.5-Turbo
- Cultural adaptation for target audiences
- Dialogue translation with lip-sync consideration
- Dubbing notes for voice actors

## Setup Instructions

### 1. Get TMDB API Key (Free)
1. Go to https://www.themoviedb.org/signup
2. Create a free account
3. Go to Settings > API
4. Request an API key (choose "Developer" option)
5. Copy your API key

### 2. Get OpenAI API Key
1. Go to https://platform.openai.com/signup
2. Create an account
3. Go to https://platform.openai.com/api-keys
4. Create a new API key
5. Copy your API key

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your API keys:
   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

## New API Endpoints

### TMDB Endpoints

#### Get Popular Movies
```
GET /api/tmdb/popular?page=1
```

#### Search Movies
```
GET /api/tmdb/search?q=inception
```

#### Get Movie Details
```
GET /api/tmdb/movie/:id
```

### Translation & Dubbing Endpoints (OpenAI Powered)

#### Request AI Dubbing
```
POST /api/movies/:id/dub
Body: {
  "language": "Hindi",
  "platform": "Netflix"
}
```

Response includes:
- Translated title and synopsis
- Cultural adaptation notes
- Dubbing instructions for voice actors
- Processing timeline

#### Translate Text
```
POST /api/translate
Body: {
  "text": "Hello World",
  "targetLanguage": "Hindi",
  "sourceLanguage": "English"
}
```

#### Translate Dialogue (with lip-sync consideration)
```
POST /api/translate/dialogue
Body: {
  "dialogue": "I'll be back",
  "targetLanguage": "Hindi",
  "context": "Action scene, determined tone"
}
```

#### Get Supported Languages
```
GET /api/translate/languages
```

## Supported Languages
- English, Hindi, Tamil, Telugu, Kannada, Malayalam
- Bengali, Marathi, Gujarati, Punjabi, Urdu
- Spanish, French, German, Italian, Portuguese
- Russian, Japanese, Korean, Chinese

## Example Usage

### Fetch Popular Movies with Real Posters
```bash
curl http://localhost:5000/api/tmdb/popular
```

### Request AI Dubbing with OpenAI
```bash
curl -X POST http://localhost:5000/api/movies/1/dub \
  -H "Content-Type: application/json" \
  -d '{"language": "Hindi"}'
```

Response:
```json
{
  "success": true,
  "translatedTitle": "स्वप्न",
  "translatedSynopsis": "एक चोर जो...",
  "dubbingNotes": "Voice actors should maintain...",
  "aiModel": "OpenAI GPT-3.5-Turbo + CRITIQ-DUB-v2.0",
  "features": {
    "voiceCloning": true,
    "lipSync": true,
    "emotionPreservation": true,
    "culturalAdaptation": true
  }
}
```

### Translate Movie Dialogue
```bash
curl -X POST http://localhost:5000/api/translate/dialogue \
  -H "Content-Type: application/json" \
  -d '{
    "dialogue": "May the Force be with you",
    "targetLanguage": "Hindi",
    "context": "Epic moment, inspirational tone"
  }'
```

## Features

### OpenAI Translation Benefits
- **Cultural Adaptation**: Translations are culturally appropriate
- **Emotion Preservation**: Maintains the emotional tone
- **Lip-sync Friendly**: Considers dialogue length for dubbing
- **Context Aware**: Uses scene context for better translations
- **Professional Quality**: GPT-3.5-Turbo powered translations

### TMDB Integration Benefits
- Real movie posters and images
- Comprehensive movie database
- Up-to-date information
- 1000 free requests per day

## Notes
- TMDB API is free with 1000 requests per day
- OpenAI API requires credits (pay-as-you-go)
- GPT-3.5-Turbo is cost-effective (~$0.002 per request)
- Keep your API keys secure and never commit them to git
