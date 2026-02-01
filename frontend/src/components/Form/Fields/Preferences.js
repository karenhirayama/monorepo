import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-100 rounded-lg p-2">
          <Settings className="w-5 h-5 text-orange-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Preferências</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {preferences.map((preference, index) => (
          <Checkbox
            key={index}
            value={preference}
            checked={currentPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
          >
            {preference}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
