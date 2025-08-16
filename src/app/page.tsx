"use client";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  async function removeBg() {
    const response = await fetch("/api/removebg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl }),
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
    <div>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={removeBg}>Remove Background</button>

      {resultUrl && <img src={resultUrl} alt="Result" />}
    </div>
  );
}
