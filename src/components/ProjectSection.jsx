import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const ProjectSection = () => {
  const tools = [
    {
      id: 1,
      name: "Text-to-Speech",
      description: "Convert text to speech in multiple languages.",
      link: "/text-to-speech",
    },
    {
      id: 8,
      name: "QR Code Generator", // Changed name to match QR Code tool
      description: "Generate QR codes from text or URLs.",
      link: "/qr-code-generator", // Updated link for QR Code Generator
    },
    {
      id: 3,
      name: "Image Resizer",
      description: "Resize images to different dimensions.",
      link: "/tool-3",
    },
    {
      id: 4,
      name: "Todo List",
      description: "Manage your tasks and to-do list.",
      link: "/tool-4",
    },
    {
      id: 5,
      name: "Weather App",
      description: "Get weather information for your location.",
      link: "/tool-5",
    },
    {
      id: 6,
      name: "Image to Text",
      description: "Extract text from images using OCR.",
      link: "/tool-6",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Project Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
            <p className="text-gray-600 text-center mb-4">{tool.description}</p>
            <Link
              to={tool.link} // Using Link to navigate without reloading
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Open Tool
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
