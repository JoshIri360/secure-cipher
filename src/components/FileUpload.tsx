import React, { useState } from "react";
import axios from "axios";
import FileInput from "./FileInput";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [filePassword, setFilePassword] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("filePassword", filePassword);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    };

    await axios.post("/api/upload", formData, config);
  };

  return (
    <div className="flex flex-col items-center">
      <FileInput onFileSelect={handleFileSelect} />
      <input
        type="password"
        placeholder="Enter file password"
        value={filePassword}
        onChange={(event) => setFilePassword(event.target.value)}
        className="mt-8 p-2 rounded-lg border border-gray-300"
      />
      <button
        onClick={handleUpload}
        disabled={!file || !filePassword}
        className="mt-8 p-2 rounded-lg bg-primary text-white disabled:bg-gray-400">
        Upload
      </button>
      {uploadProgress > 0 && (
        <div className="mt-8">
          <progress value={uploadProgress} max="100" />
          <span className="ml-4">{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
}
