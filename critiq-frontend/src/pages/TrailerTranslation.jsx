import { useState, useEffect, useRef } from 'react';
import API_BASE from '../api';

// Inception trailer scenes with precise timestamps (in seconds)
const INCEPTION_SCENES = [
  { id: 1, start: 8,  end: 13, speaker: 'Cobb',     text: 'What is the most resilient parasite?' },
  { id: 2, start: 14, end: 20, speaker: 'Cobb',     text: 'An idea. Resilient, highly contagious.' },
  { id: 3, start: 22, end: 30, speaker: 'Cobb',     text: 'Once an idea has taken hold of the brain, it is almost impossible to eradicate.' },
  { id: 4, start: 38, end: 44, speaker: 'Saito',    text: 'I want you to perform inception.' },
  { id: 5, start: 45, end: 52, speaker: 'Saito',    text: 'Plant an idea deep in someones mind so they believe it was their own.' },
  { id: 6, start: 58, end: 64, speaker: 'Cobb',     text: 'The dream is real. Your mind is the scene of the crime.' },
  { id: 7, start: 70, end: 76, speaker: 'Arthur',   text: 'We need to go deeper into the dream.' },
  { id: 8, start: 82, end: 88, speaker: 'Ariadne',  text: 'How do you tell if you are dreaming?' },
  { id: 9, start: 95, end: 103, speaker: 'Cobb',    text: 'Dreams feel real while we are in them. It is only when we wake up that we realize something was strange.' },
  { id: 10, start: 108, end: 114, speaker: 'Mal',   text: 'You are waiting for a train. A train that will take you far away.' },
  { id: 11, start: 118, end: 124, speaker: 'Arthur', text: 'Time is running out! We need to move now!' },
  { id: 12, start: 128, end: 134, speaker: 'Cobb',  text: 'I can do this. I can get us home.' },
];

const LANGUAGES = [
  { label: '🇮🇳 Hindi',     value: 'Hindi',     code: 'hi-IN' },
  { label: '🇮🇳 Tamil',     value: 'Tamil',     code: 'ta-IN' },
  { label: '🇮🇳 Telugu',    value: 'Telugu',    code: 'te-IN' },
  { label: '🇮🇳 Kannada',   value: 'Kannada',   code: 'kn-IN' },
  { label: '🇮🇳 Bengali',   value: 'Bengali',   code: 'bn-IN' },
  { label: '🇪🇸 Spanish',   value: 'Spanish',   code: 'es-ES' },
  { label: '🇫🇷 French',    value: 'French',    code: 'fr-FR' },
  { label: '🇩🇪 German',    value: 'German',    code: 'de-DE' },
  { label: '🇯🇵 Japanese',  value: 'Japanese',  code: 'ja-JP' },
  { label: '🇰🇷 Korean',    value: 'Korean',    code: 'ko-KR' },
];

export default function TrailerTranslation() {
  const [targetLang, setTargetLang]         = useState(LANGUAGES[0]);
  const [translatedScenes, setTranslatedScenes] = useState([]);
  const [translating, setTranslating]       = useState(false);
  const [progress, setProgress]             = useState(0);
  const [ready, setReady]                   = useState(false);

  // Playback state
  const [playing, setPlaying]               = useState(false);
  const [currentScene, setCurrentScene]     = useState(null);
  const [elapsed, setElapsed]               = useState(0);

  const timerRef   = useRef(null);
  const synthRef   = useRef(window.speechSynthesis);
  const startTimeRef = useRef(null);

  // Translate all scenes via backend
  const handleTranslate = async () => {
    setTranslating(true);
    setReady(false);
    setTranslatedScenes([]);
    setProgress(0);
    stopPlayback();

    try {
      const res = await fetch(`${API_BASE}/api/translate/trailer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenes: INCEPTION_SCENES.map(s => ({ id: s.id, timestamp: `${s.start}s`, speaker: s.speaker, text: s.text })),
          targetLanguage: targetLang.value,
          sourceLanguage: 'English'
        })
      });
      const data = await res.json();
      if (data.success) {
        // Merge translations back with timing info
        const merged = INCEPTION_SCENES.map((scene, i) => ({
          ...scene,
          translatedText: data.data[i]?.translatedText || scene.text,
        }));
        setTranslatedScenes(merged);
        setReady(true);
        setProgress(100);
      }
    } catch (err) {
      alert('Translation error: ' + err.message);
    } finally {
      setTranslating(false);
    }
  };

  // Speak a single line using Web Speech API
  const speak = (text, langCode, onEnd) => {
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    utter.rate = 1.1;
    utter.pitch = 1;
    utter.onend = onEnd;
    synthRef.current.speak(utter);
  };

  // Start the simulated playback
  const startPlayback = () => {
    if (!translatedScenes.length) return;
    setPlaying(true);
    setElapsed(0);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(secs);

      // Find the scene that should be active now
      const active = translatedScenes.find(s => secs >= s.start && secs < s.end);
      setCurrentScene(prev => {
        if (active && prev?.id !== active.id) {
          // Speak the translated line
          speak(active.translatedText, targetLang.code, () => {});
          return active;
        }
        if (!active) return null;
        return prev;
      });

      // Stop after last scene ends
      if (secs > translatedScenes[translatedScenes.length - 1].end + 2) {
        stopPlayback();
      }
    }, 500);
  };

  const stopPlayback = () => {
    clearInterval(timerRef.current);
    synthRef.current.cancel();
    setPlaying(false);
    setCurrentScene(null);
    setElapsed(0);
  };

  useEffect(() => () => { clearInterval(timerRef.current); synthRef.current.cancel(); }, []);

  const totalDuration = translatedScenes.length ? translatedScenes[translatedScenes.length - 1].end : 134;

  return (
    <div className="min-h-screen bg-critiq-dark text-white pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🎬 AI Trailer Dubbing</h1>
          <p className="text-gray-400">Translate & hear Inception trailer dialogue in any language</p>
        </div>

        {/* YouTube + Subtitle Overlay */}
        <div className="relative rounded-xl overflow-hidden mb-6 shadow-2xl border border-gray-700">
          <div className="aspect-video bg-black">
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/YoHD9XEInc0?rel=0"
              title="Inception Official Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Subtitle Overlay */}
          {currentScene && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">{currentScene.speaker}</p>
                {/* English */}
                <p className="text-white text-sm mb-1 italic opacity-70">{currentScene.text}</p>
                {/* Translated */}
                <p className="text-yellow-300 text-lg font-semibold drop-shadow-lg">
                  {currentScene.translatedText}
                </p>
              </div>
            </div>
          )}

          {/* Progress bar */}
          {playing && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="h-1 bg-red-500 transition-all duration-500"
                style={{ width: `${(elapsed / totalDuration) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-critiq-card rounded-xl p-6 mb-6">
          {/* Language Picker */}
          <p className="text-sm text-gray-400 mb-3">Select target language</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {LANGUAGES.map(lang => (
              <button
                key={lang.value}
                onClick={() => { setTargetLang(lang); setReady(false); setTranslatedScenes([]); stopPlayback(); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  targetLang.value === lang.value
                    ? 'bg-red-600 text-white'
                    : 'bg-critiq-dark text-gray-300 hover:bg-gray-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleTranslate}
              disabled={translating}
              className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:opacity-50 transition-all"
            >
              {translating ? `🔄 Translating... ${progress}%` : `🌐 Translate to ${targetLang.label}`}
            </button>

            {ready && !playing && (
              <button
                onClick={startPlayback}
                className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all"
              >
                ▶️ Play with {targetLang.label} Audio
              </button>
            )}

            {playing && (
              <button
                onClick={stopPlayback}
                className="flex-1 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition-all"
              >
                ⏹ Stop
              </button>
            )}
          </div>

          {/* How it works note */}
          {ready && (
            <p className="text-xs text-gray-500 mt-3 text-center">
              ▶️ Press Play — subtitles will appear on the video and your browser will speak the {targetLang.label} audio in sync
            </p>
          )}
        </div>

        {/* Translated Script */}
        {translatedScenes.length > 0 && (
          <div className="bg-critiq-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              📋 Translated Script
              <span className="ml-2 text-sm text-gray-400">English → {targetLang.label}</span>
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {translatedScenes.map(scene => (
                <div
                  key={scene.id}
                  className={`flex gap-3 p-3 rounded-lg text-sm transition-all ${
                    currentScene?.id === scene.id
                      ? 'bg-red-600/20 border border-red-500/50'
                      : 'border border-transparent hover:bg-gray-800'
                  }`}
                >
                  <span className="text-red-400 font-mono w-10 shrink-0">{scene.start}s</span>
                  <span className="text-purple-400 w-20 shrink-0">{scene.speaker}</span>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs italic mb-1">{scene.text}</p>
                    <p className="text-yellow-300">{scene.translatedText}</p>
                  </div>
                  {currentScene?.id === scene.id && (
                    <span className="text-red-400 text-xs animate-pulse">🔊 Speaking</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info box */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700/40 rounded-xl p-4 text-sm text-gray-400">
          <p className="font-semibold text-blue-400 mb-1">ℹ️ How this works</p>
          <p>1. Translates all 12 dialogue scenes using AI (MyMemory API)</p>
          <p>2. Shows translated subtitles overlaid on the YouTube video</p>
          <p>3. Uses your browser's built-in Speech Synthesis to speak the translated audio in sync</p>
          <p className="mt-2 text-yellow-400">⚠️ Play the YouTube video manually first, then click "Play with Audio" to sync the dubbed audio</p>
        </div>
      </div>
    </div>
  );
}
