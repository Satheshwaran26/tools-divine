import React from "react";
import { Link } from "react-router-dom";

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
      name: "QR Code Generator",
      description: "Generate QR codes from text or URLs.",
      link: "/qr-code-generator",
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
    <div className="bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-[400] text-center mb-12 text-gray-800">
        Project Section
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {tool.name}
              </h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <Link
                to={tool.link}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-md transition duration-300"
              >
                Open Tool
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
