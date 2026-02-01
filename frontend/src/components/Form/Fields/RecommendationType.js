import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

function RecommendationType({ onRecommendationTypeChange, selectedType }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-100 rounded-lg p-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Tipo de Recomendação</h2>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onRecommendationTypeChange('SingleProduct')}
          className={`px-6 py-2.5 rounded-full border-2 font-medium transition-all ${
            selectedType === 'SingleProduct'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
          }`}
        >
          Produto Único
        </button>
        <button
          type="button"
          onClick={() => onRecommendationTypeChange('MultipleProducts')}
          className={`px-6 py-2.5 rounded-full border-2 font-medium transition-all ${
            selectedType === 'MultipleProducts'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
          }`}
        >
          Múltiplos Produtos
        </button>
      </div>
    </div>
  );
}

export default RecommendationType;
