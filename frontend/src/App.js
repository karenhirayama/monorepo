import React, { useState, useRef } from 'react';
import { CheckCircle, Zap } from 'lucide-react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [formKey, setFormKey] = useState(0);
  const recommendationListRef = useRef(null);

  const handleRecommendationsChange = (newRecommendations) => {
    setRecommendations(newRecommendations || []);
    
    setTimeout(() => {
      recommendationListRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleNewSearch = () => {
    setRecommendations([]);
    setFormKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Recomendador de Produtos <span className="text-blue-600">RD Station</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Descubra qual produto RD Station é ideal para você! Selecione suas preferências 
          e funcionalidades desejadas, escolha se quer uma ou múltiplas recomendações, 
          e receba sugestões personalizadas em segundos.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Form key={formKey} onRecommendationsChange={handleRecommendationsChange} />
          </div>

          <div className="lg:col-span-1 space-y-6" ref={recommendationListRef}>
            <RecommendationList 
              recommendations={recommendations} 
              onNewSearch={handleNewSearch}
            />

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Confiança</p>
                <p className="text-sm font-medium text-gray-800">Curadoria de Especialistas RD</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Agilidade</p>
                <p className="text-sm font-medium text-gray-800">Alcance suas metas mais rápido</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
