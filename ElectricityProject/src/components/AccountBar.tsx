import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import vaillantLogo from "../../assets/vaillant_logo.png";

export function AccountBar() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setShowLogin(false);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed top-4 left-8 right-8 z-50 flex items-center justify-between gap-4">
      <img src={vaillantLogo} alt="Vaillant Logo" className="h-10" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2">
            <span
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={() => navigate("/profil")}
              title="Profil anzeigen"
            >
              {user.email[0].toUpperCase()}
            </span>
            <span
              className="text-gray-800 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/profil")}
              title="Profil anzeigen"
            >
              {user.email}
            </span>
            <Button variant="outline" className="ml-2 px-3 py-1 text-sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full shadow" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            {showLogin && (
              <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg p-6 w-80 z-50 border">
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border p-2 rounded bg-white text-gray-900 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-2 rounded bg-white text-gray-900 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <Button type="submit" className="bg-primary hover:bg-primary-dark text-white w-full" disabled={loading}>
                    {loading ? "Einloggen..." : "Einloggen"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setShowLogin(false)}>
                    Abbrechen
                  </Button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 