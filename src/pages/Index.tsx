import { useState, useRef } from "react";
import VibeCheckIn from "@/components/VibeCheckIn";
import Reflection from "@/components/Reflection";
import Confirmation from "@/components/Confirmation";
import LanguageSelector from "@/components/LanguageSelector";
import VibeHistory from "@/components/VibeHistory";
import { saveVibeEntry } from "@/types/vibe";

type Screen = "checkin" | "reflection" | "confirmation" | "history";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("checkin");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const transition = (next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 500);
  };

  const handleVibeSelected = (vibe: string) => {
    setSelectedVibe(vibe);
    transition("reflection");
  };

  const handleReflectionComplete = async (reflections: string[]) => {
    await saveVibeEntry({
      id: crypto.randomUUID(),
      vibe: selectedVibe,
      reflections,
      timestamp: new Date().toISOString(),
    });
    transition("confirmation");
  };

  const handleDone = () => {
    setSelectedVibe("");
    transition("checkin");
  };

  const handleHistory = () => {
    transition("history");
  };

  const handleBackFromHistory = () => {
    transition("checkin");
  };

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pt-16">
      <button
        onClick={handleExit}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-accent transition-colors group z-50"
        aria-label="Exit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground group-hover:text-foreground"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <LanguageSelector />
      <div
        className={`transition-all duration-500 ease-in-out ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
      >
        {screen === "checkin" && <VibeCheckIn onNext={handleVibeSelected} onHistory={handleHistory} />}
        {screen === "reflection" && <Reflection onComplete={handleReflectionComplete} />}
        {screen === "confirmation" && <Confirmation onDone={handleDone} onHistory={handleHistory} />}
        {screen === "history" && <VibeHistory onBack={handleBackFromHistory} />}
      </div>
    </div>
  );
};

export default Index;

