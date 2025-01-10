import React, { useState } from 'react';

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [resizedImage, setResizedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResizedImage(null); // Clear resized image when a new one is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    const img = document.getElementById('resized-image');
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;

    // Create a canvas to draw the resized image and get the data URL for downloading
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgElement = new Image();
    imgElement.src = image;
    imgElement.onload = () => {
      ctx.drawImage(imgElement, 0, 0, width, height);
      const resizedImgURL = canvas.toDataURL(); // Get resized image URL
      setResizedImage(resizedImgURL); // Set resized image for download
    };
  };

  const handleDownload = () => {
    if (resizedImage) {
      const a = document.createElement('a');
      a.href = resizedImage;
      a.download = 'resized-image.png'; // Set download file name
      a.click();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Image Resizer</h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      {image && (
        <div className="mb-4">
          <img
            id="resized-image"
            src={image}
            alt="Uploaded"
            className="mx-auto mb-4"
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        </div>
      )}

      <div className="mb-4 flex justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleResize}
        className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600"
      >
        Resize Image
      </button>

      {resizedImage && (
        <button
          onClick={handleDownload}
          className="w-full py-2 bg-green-500 text-white rounded-lg mt-4 hover:bg-green-600"
        >
          Download Resized Image
        </button>
      )}
    </div>
  );
};

export default ImageResizer;