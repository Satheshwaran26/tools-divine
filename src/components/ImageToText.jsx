
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText('');  // Clear previous text
      setError('');  // Clear previous error
    }
  };

  const handleImageUpload = () => {
    if (!image) return;
    setIsProcessing(true);
    setError(''); // Reset errors

    Tesseract.recognize(
      image,
      'eng', // Language (English)
      {
        logger: (m) => console.log(m), // Optional progress logger
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setIsProcessing(false);
    }).catch((err) => {
      console.error('Error during OCR:', err);
      setError('Error during OCR processing. Please try again.');
      setIsProcessing(false);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Image to Text Converter</h1>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700 bg-gray-200 rounded-md p-2 mb-4"
      />
      
      <button
        onClick={handleImageUpload}
        disabled={isProcessing}
        className={`w-full p-3 text-white rounded-md ${isProcessing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isProcessing ? 'Processing...' : 'Convert to Text'}
      </button>
      
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

      {image && <img src={image} alt="Uploaded" className="mx-auto my-4 rounded-lg shadow-lg" />}

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">Extracted Text:</h2>
        <p className="text-gray-600 mt-2 whitespace-pre-line">{text || 'No text extracted yet.'}</p>
      </div>
    </div>
  );
};

export default ImageToText;