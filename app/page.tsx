"use client"
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const[count, setCount] = useState(2011)
  const [result, setResult] = useState(null)
  const [error, setError] = useState<string | null>(null)
  function clickAdd(){
    setCount(count + 1)
  }
  function clickDec(){
    if(count > 2011){
      setCount(count - 1) 
    }
  }
  async function getData() {
    setError(null)
    const url = `http://localhost:5000/years/${count}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const type = result.genres
    const location = result.location
    const begin_date = result.start_date
    const end_date = result.end_date
    console.log(result.data[0]);
    setResult(result)
  } catch (error) {
    console.error(error);
    setError(error instanceof Error ? error.message : "Błąd")
  }
}
  return (
    <div>
      <main >
        <button onClick={clickAdd}>
            +
        </button>
        <p>{count}</p>
        <button onClick={clickDec}>
            -
        </button>
        <button onClick={getData}>
          szukaj
        </button>
        {error && <p style={{ color: "red" }}>Błąd: {error}</p>}
        {result && (
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </main>
    </div>
  );
}
