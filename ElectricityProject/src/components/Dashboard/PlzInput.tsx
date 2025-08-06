import { useState } from "react";

export function PlzInput({ onDataLoaded }: { onDataLoaded: (data: any) => void }) {
  const [plz, setPlz] = useState("");
  // Placeholder: Kein echtes Fetching, nur Demo
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onDataLoaded({ plz });
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={plz}
        onChange={e => setPlz(e.target.value)}
        placeholder="Postleitzahl"
        className="border p-2 rounded bg-white text-gray-900 border-gray-300"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Laden
      </button>
    </form>
  );
} 