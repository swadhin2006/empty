import { useState } from 'react';
import API_BASE from '../api';

function DubbingDemo() {
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Hindi');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dubbingResult, setDubbingResult] = useState(null);

  // Demo YouTube videos
  const demoVideos = [
    {
      id: 'inception-trailer',
      title: 'Inception - Official Trailer',
      youtubeId: 'YoHD9XEInc0',
      language: 'English',
      description: 'A thief who steals corporate secrets through dream-sharing technology.'
    },
    {
      id: 'ddlj-scene',
      title: 'DDLJ - Famous Train Scene',
      youtubeId: 'gkXzeZ0KE5Q',
      language: 'Hindi',
      description: 'Raj and Simran\'s iconic train scene from Dilwale Dulhania Le Jayenge.'
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);

  const languages = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Spanish', 'French', 
    'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 
    'Korean', 'Chinese', 'Kannada', 'Malayalam', 'Bengali'
  ];

  const handleTranslate = async () => {
    if (!originalText) {
      alert('Please enter text to translate');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: originalText,
          targetLanguage: targetLanguage,
          sourceLanguage: sourceLanguage
        })
      });

      const data = await response.json();
      if (data.success) {
        setTranslatedText(data.translatedText);
      } else {
        alert('Translation failed: ' + data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDubVideo = async () => {
    setLoading(true);
    setDubbingResult(null);
    
    try {
      const response = await fetch(`${API_BASE}/api/movies/1/dub`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: targetLanguage
        })
      });

      const data = await response.json();
      if (data.success) {
        setDubbingResult(data);
      } else {
        alert('Dubbing failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-critiq-dark text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">
          🎬 AI Dubbing & Translation Demo
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Powered by OpenAI GPT-3.5-Turbo
        </p>

        {/* Video Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {demoVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                selectedVideo.id === video.id
                  ? 'border-red-500 shadow-lg shadow-red-500/50'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-critiq-card">
                <h3 className="font-semibold text-lg">{video.title}</h3>
                <p className="text-sm text-gray-400 mt-1">Language: {video.language}</p>
                <p className="text-sm text-gray-300 mt-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Translation Section */}
        <div className="bg-critiq-card rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">📝 Text Translation</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Source Language</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full bg-critiq-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Language</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full bg-critiq-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Original Text</label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-32 bg-critiq-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Translated Text</label>
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-32 bg-critiq-dark border border-gray-700 rounded-lg px-4 py-2 resize-none text-gray-300"
              />
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? '🔄 Translating...' : '🌐 Translate Text'}
          </button>
        </div>

        {/* AI Dubbing Section */}
        <div className="bg-critiq-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">🎙️ AI Video Dubbing</h2>
          
          <div className="mb-4">
            <p className="text-gray-300 mb-2">
              Selected Video: <span className="text-red-500 font-semibold">{selectedVideo.title}</span>
            </p>
            <p className="text-sm text-gray-400">
              Original Language: {selectedVideo.language} → Target: {targetLanguage}
            </p>
          </div>

          <button
            onClick={handleDubVideo}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 mb-4"
          >
            {loading ? '🔄 Processing...' : `🎬 Generate AI Dubbing in ${targetLanguage}`}
          </button>

          {dubbingResult && (
            <div className="bg-critiq-dark rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-green-400">✅ Dubbing Generated!</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Job ID:</span>
                  <span className="ml-2 text-sm font-mono text-gray-300">{dubbingResult.jobId}</span>
                </div>
                
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="ml-2 text-yellow-400 font-semibold">{dubbingResult.status}</span>
                </div>
                
                <div>
                  <span className="text-gray-400">Estimated Time:</span>
                  <span className="ml-2 text-white">{dubbingResult.estimatedTime} seconds</span>
                </div>

                {dubbingResult.translatedTitle && (
                  <div>
                    <span className="text-gray-400">Translated Title:</span>
                    <p className="ml-2 text-white font-semibold">{dubbingResult.translatedTitle}</p>
                  </div>
                )}

                {dubbingResult.translatedSynopsis && (
                  <div>
                    <span className="text-gray-400">Translated Synopsis:</span>
                    <p className="ml-2 text-gray-300 mt-1">{dubbingResult.translatedSynopsis}</p>
                  </div>
                )}

                {dubbingResult.dubbingNotes && (
                  <div>
                    <span className="text-gray-400">Dubbing Notes:</span>
                    <p className="ml-2 text-gray-300 mt-1 italic">{dubbingResult.dubbingNotes}</p>
                  </div>
                )}

                <div>
                  <span className="text-gray-400">AI Model:</span>
                  <span className="ml-2 text-purple-400">{dubbingResult.aiModel}</span>
                </div>

                {dubbingResult.features && (
                  <div>
                    <span className="text-gray-400">Features:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(dubbingResult.features).map(([key, value]) => (
                        value && (
                          <span key={key} className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            ✓ {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Examples */}
        <div className="mt-8 bg-critiq-card rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">💡 Quick Examples</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSourceLanguage('English');
                setTargetLanguage('Hindi');
                setOriginalText('A thief who steals corporate secrets through dream-sharing technology.');
              }}
              className="bg-critiq-dark hover:bg-gray-800 p-4 rounded-lg text-left transition-all"
            >
              <p className="font-semibold text-red-400">English → Hindi</p>
              <p className="text-sm text-gray-400 mt-1">Inception movie description</p>
            </button>
            <button
              onClick={() => {
                setSourceLanguage('Hindi');
                setTargetLanguage('English');
                setOriginalText('राज और सिमरन की प्रेम कहानी');
              }}
              className="bg-critiq-dark hover:bg-gray-800 p-4 rounded-lg text-left transition-all"
            >
              <p className="font-semibold text-red-400">Hindi → English</p>
              <p className="text-sm text-gray-400 mt-1">DDLJ love story</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DubbingDemo;
