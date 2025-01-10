import React, { useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = () => {
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerate = () => {
    QRCode.toDataURL(input)
      .then((url) => {
        setQrValue(url);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-customBg p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">QR Code Generator</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter text or URL"
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={qrValue}
              alt="Generated QR Code"
              className="w-64 h-64 border-2 border-gray-300 rounded-lg shadow-md"
            />
            <a
              href={qrValue}
              download="qrcode.png"
              className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
