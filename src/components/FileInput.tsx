import { useRef } from "react";

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

export default function FileInput({ onFileSelect }: FileInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        onFileSelect(file);
      }}
      onClick={() => fileRef.current?.click()}
      className="rounded-lg dotted-border cursor-pointer text-sm text-secondary p-16">
      <input
        type="file"
        hidden
        onChange={(event) => {
          const file = event.target.files![0];
          onFileSelect(file);
        }}
        ref={fileRef}
      />
      Click to browse or drag and drop your files
    </div>
  );
}
