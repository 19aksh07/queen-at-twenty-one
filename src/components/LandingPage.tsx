import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Sparkles } from "lucide-react";
import "../styles/shared.css";

interface LandingPageProps {
  onStartJourney: () => void;
}

const LandingPage = ({ onStartJourney }: LandingPageProps) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setSparkles(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-romantic-dark-purple to-romantic-dark-black-purple"
      onClick={createSparkle}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[10%] left-[10%] text-6xl floating-element">💜</div>
        <div className="absolute top-[20%] right-[15%] text-4xl floating-element" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[20%] left-[15%] text-5xl floating-element" style={{ animationDelay: '2s' }}>👑</div>
        <div className="absolute bottom-[10%] right-[10%] text-4xl floating-element" style={{ animationDelay: '0.5s' }}>💫</div>
      </div>

      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle absolute text-2xl pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animation: 'sparkle 2s ease-in-out forwards'
          }}
        >
          ✨
        </div>
      ))}

      <div className="text-center space-y-8 relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Crown and Title */}
        <div className="mb-12">
          <div className="text-7xl sm:text-8xl filter drop-shadow-lg mb-8 floating-element">👑</div>
          <h1 className="title-romantic relative">
            Queen at 21
            <span className="ml-3 inline-block">💜</span>
          </h1>
          <p className="subtitle-romantic mt-4 max-w-2xl mx-auto">
            A journey of love in 21 poems
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto px-4">
          <p className="romantic-text text-lg sm:text-xl md:text-2xl text-gold/90 leading-relaxed">
            Happy Birthday, Queen! <span className="inline-block">🎉</span> Today marks not just another year, but a new chapter in your story. A journey filled with love, dreams, and golden memories — captured in these poems written just for you. <span className="text-purple-300">💜</span>
          </p>
        </div>

        {/* Call to action button */}
        <div className="pt-12">
          <Button
            onClick={onStartJourney}
            className="btn-royal group relative overflow-hidden transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <BookOpen className="w-5 h-5 mr-3" />
            <span>Open Book</span>
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;