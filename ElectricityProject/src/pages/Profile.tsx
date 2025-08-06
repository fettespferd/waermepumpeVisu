import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      setUser(data.session?.user ?? null);
    });
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-[#f7f9f8]">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Profil</h2>
        {user ? (
          <div className="mb-2"><b>E-Mail:</b> {user.email}</div>
        ) : (
          <div className="mb-2 text-gray-500">Kein Nutzer eingeloggt.</div>
        )}
        {/* Hier kannst du weitere Felder (Name, Adresse, etc.) ergänzen */}
        {/* Optional: Formular zum Bearbeiten */}
      </div>
    </div>
  );
} 