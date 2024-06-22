import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { ArrayVisualiser } from "./components/ArrayVisualizer";
import { HeroSection } from "./components/HeroSection";

export default function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div data-theme={theme} className="font-sans">
      <Navbar />

      <div className="min-h-[92dvh] bg-base-200 p-6">
        {/* Hero Section to introduce the app */}
        <HeroSection />
        <ArrayVisualiser />
      </div>
    </div>
  );
}
