import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures)

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-green-100 rounded-lg p-2">
          <Sparkles className="w-5 h-5 text-green-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Funcionalidades</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <Checkbox
            key={index}
            value={feature}
            checked={currentFeatures.includes(feature)}
            onChange={() => handleFeatureChange(feature)}
          >
            {feature}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Features;
