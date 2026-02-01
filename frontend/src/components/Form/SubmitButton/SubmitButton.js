import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
