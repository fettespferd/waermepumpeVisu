import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AccountBar } from "./components/AccountBar";
import { Profile } from "./pages/Profile";
import vaillantLogo from "../assets/vaillant_logo.png";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative">
      <Card className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-0">
        <div className="flex items-center justify-center p-6 pb-0">
          <img src={vaillantLogo} alt="Vaillant Logo" className="h-12" />
        </div>
        <CardHeader className="pt-2 pb-0">
          <CardTitle className="text-2xl text-gray-900">Energieeinsparungsrechner</CardTitle>
          <CardDescription className="text-gray-600">
            Berechne schnell und einfach, wie viel Energie und Kosten du sparen kannst.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">
            Starte jetzt mit deiner ersten Berechnung und entdecke dein Sparpotenzial!
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold rounded-lg py-3 transition-colors duration-200" onClick={() => navigate('/dashboard')}>
            Jetzt berechnen
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AccountBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
