"use client";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function removeBg() {
    if (!imageUrl && !file) return;

    const form = new FormData();
    if (imageUrl) {
      form.append("type", "url");
      form.append("image_url", imageUrl);
    } else if (file) {
      form.append("type", "file");
      form.append("image_file", file);
    }

    const response = await fetch("/api/removebg", {
      method: "POST",
      body: form,
    });

    if (response.ok) {
      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
    } else {
      console.log("Something went wrong while calling the api");
      return;
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={file ? "hidden" : "input"}
            disabled={file ? true : false}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={imageUrl ? true : false}
            className={
              imageUrl
                ? "hidden"
                : "file:btn file:btn-primary file:mr-3 file:rounded-md w-60"
            }
          />
        </div>
        <button onClick={removeBg} className="btn btn-primary rounded-md">
          Remove Background
        </button>
        <a
          type="download"
          download
          href={resultUrl ? resultUrl : ""}
          className="btn btn-primary rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" />
          </svg>
        </a>
      </div>

      {resultUrl && <img className="rounded-md" src={resultUrl} alt="Result" />}
    </div>
  );
}
