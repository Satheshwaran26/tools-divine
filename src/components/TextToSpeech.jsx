import React, { useState } from "react";
import Select from "react-select";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");

  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "es-ES", label: "Spanish (ES)" },
    { value: "fr-FR", label: "French (FR)" },
    { value: "de-DE", label: "German (DE)" },
    { value: "hi-IN", label: "Hindi (IN)" },
  ];

  const handleSpeak = () => {
    if (!text) return alert("Please enter some text to speak!");
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    synth.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Text-to-Speech App
        </h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter text here..."
        ></textarea>
        <Select
          options={languages}
          defaultValue={languages[0]}
          onChange={(option) => setLanguage(option.value)}
          placeholder="Select Language"
          styles={{
            container: (base) => ({ ...base, marginBottom: "1rem" }),
          }}
        />
        <button
          onClick={handleSpeak}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
        >
          Speak
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
