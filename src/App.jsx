import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectSection from "./components/ProjectSection";
import TextToSpeech from "./components/TextToSpeech";
import QRCodeGenerator from "./components/QRCodeGenerator";
import ImageResizer from "./components/ImageResizer";
import TodoList from "./components/TodoList";
import WeatherApp from "./components/WeatherApp";
import ImageToText from "./components/ImageToText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectSection />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
        <Route path="/tool-3" element={<ImageResizer />} />
        <Route path="/tool-4" element={<TodoList />} />
        <Route path="/tool-5" element={<WeatherApp />} />
        <Route path="/tool-6" element={<ImageToText />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;