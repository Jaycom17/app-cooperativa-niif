import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import cutString from "@/utils/CropName";

type CopyBoxProps = {
  text: string;
};

export default function CopyBox({ text }: CopyBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copiando al portapapeles", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="flex items-center justify-between cursor-pointer gap-2 rounded-lg px-2 hover:bg-primary bg-background hover:border transition"
    >
      <span className="font-mono text-lg text-white">{cutString(text, 15)}</span>
      {copied ? (
        <FiCheck className="text-white" />
      ) : (
        <FiCopy className="text-white" />
      )}
    </div>
  );
}
