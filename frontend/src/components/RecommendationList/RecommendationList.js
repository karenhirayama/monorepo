import React from 'react';
import { TrendingUp, Share2, MessageSquare, Sparkles, ClipboardList, Package, RefreshCw } from 'lucide-react';

const categoryConfig = {
  Vendas: {
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    labelColor: 'text-orange-500',
    Icon: TrendingUp,
  },
  Marketing: {
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    labelColor: 'text-blue-600',
    Icon: Share2,
  },
  Omnichannel: {
    color: 'bg-green-50',
    iconColor: 'text-green-500',
    labelColor: 'text-green-500',
    Icon: MessageSquare,
  },
  'Uso de Inteligência Artificial': {
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    labelColor: 'text-purple-500',
    Icon: Sparkles,
  },
};

const defaultConfig = {
  color: 'bg-gray-50',
  iconColor: 'text-gray-500',
  labelColor: 'text-gray-500',
  Icon: Package,
};

const getCategoryDisplayName = (category) => {
  const displayNames = {
    Vendas: 'VENDAS',
    Marketing: 'MARKETING',
    Omnichannel: 'OMNICHANNEL',
    'Uso de Inteligência Artificial': 'INTELIGÊNCIA ARTIFICIAL',
  };
  return displayNames[category] || category?.toUpperCase();
};

function ProductCard({ product }) {
  const config = categoryConfig[product.category] || defaultConfig;
  const { Icon } = config;

  return (
    <div className="bg-white flex gap-4 p-4 rounded-xl border border-gray-100 shadow-sm">
      <div
        className={`${config.color} ${config.iconColor} w-12 h-12 rounded-xl flex items-center justify-center`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        {' '}
        <span
          className={`text-xs font-semibold ${config.labelColor} uppercase tracking-wider`}
        >
          {getCategoryDisplayName(product.category)}
        </span>
        <h3 className="text-gray-900 font-bold">{product.name}</h3>
      </div>
    </div>
  );
}

function RecommendationList({ recommendations, onNewSearch }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 rounded-lg p-3">
          <ClipboardList className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h2 className="text-lg font-bold text-center text-gray-800 mb-2">
        Lista de Recomendações
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          Selecione suas preferências para ver os melhores produtos para o seu
          negócio.
        </p>
      ) : (
        <>
          <div className="space-y-3 mt-4">
            {recommendations.map((recommendation, index) => (
              <ProductCard key={index} product={recommendation} />
            ))}
          </div>
          
          <button
            onClick={onNewSearch}
            className="w-full mt-4 py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Nova Busca
          </button>
        </>
      )}
    </div>
  );
}

export default RecommendationList;
