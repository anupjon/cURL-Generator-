import React, { useState } from "react";
import { toast } from "react-toastify";

const HuggingFaceGenerator = () => {
  const [url, setUrl] = useState("");
  const [command, setCommand] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = import.meta.env.VITE_HF_TOKEN;

  const generateCommand = async () => {
    setIsLoading(true);
    try {
      const validateHuggingFaceUrl = (url) => {
        if (!url.trim()) {
          return "URL cannot be empty";
        }
        try {
          const urlObj = new URL(url);
          if (!urlObj.hostname.includes('huggingface.co')) {
            return "Invalid Hugging Face URL. URL must be from huggingface.co";
          }
          return "";
        } catch (e) {
          return "Invalid URL format";
        }
      };

      const error = validateHuggingFaceUrl(url);
      if (error) {
        setError(error);
        return;
      }
      setError("");
      let cleanUrl = url.split("?download=true")[0];
      const fileName = cleanUrl.split("/").pop();
      const curlCommand = `curl -H "Authorization: Bearer ${token}" -L -o "${fileName}" "${cleanUrl}"`;
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
      <h2 className="text-xl font-bold mb-4">Hugging Face URL to cURL Generator</h2>
      <label htmlFor="hf-url" className="block mb-2 font-medium">Enter Hugging Face model URL</label>
      <input
        id="hf-url"
        type="text"
        placeholder="Enter Hugging Face model URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && generateCommand()}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
          <label htmlFor="hf-command" className="block mb-2 font-medium">Generated cURL Command</label>
          <textarea
            id="hf-command"
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

export default HuggingFaceGenerator;
