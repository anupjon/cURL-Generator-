import React, { useState } from "react";
import { toast } from "react-toastify";

const CivitaiGenerator = () => {
  const [url, setUrl] = useState("");
  const [command, setCommand] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customFileName, setCustomFileName] = useState("");
  const civitToken = import.meta.env.VITE_CIVITAI_TOKEN;

  const generateCommand = async () => {
    setIsLoading(true);
    try {
      if (!url.trim()) {
        setError("URL cannot be empty");
        return;
      }
      setError("");
      
      const cleanUrl = url.trim();
      const urlObj = new URL(cleanUrl);
      const searchParams = new URLSearchParams(urlObj.search);
      searchParams.append('token', civitToken);
      
      const finalUrl = `${urlObj.origin}${urlObj.pathname}?${searchParams.toString()}`;
      const fileName = customFileName.trim() || 'model.safetensors';
      
      const curlCommand = `curl -L -o "${fileName}" "${finalUrl}"`;
      setCommand(curlCommand);
      toast.success("Command generated successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    toast.info("Copied to clipboard!");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Civitai URL to cURL Generator</h2>
      <label htmlFor="civitai-url" className="block mb-2 font-medium">Enter Civitai model URL</label>
      <input
        id="civitai-url"
        type="text"
        placeholder="Enter Civitai model URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && generateCommand()}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <label htmlFor="custom-filename" className="block mb-2 font-medium">Custom Filename (optional)</label>
      <input
        id="custom-filename"
        type="text"
        placeholder="Enter custom filename (e.g., model.safetensors)"
        value={customFileName}
        onChange={(e) => setCustomFileName(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={generateCommand}
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-4"
      >
        Generate Command
      </button>
      {command && (
        <div className="mt-4">
          <label htmlFor="civitai-command" className="block mb-2 font-medium">Generated cURL Command</label>
          <textarea
            id="civitai-command"
            rows="4"
            value={command}
            readOnly
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={copyToClipboard}
            className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CivitaiGenerator;