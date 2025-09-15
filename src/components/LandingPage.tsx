import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Sparkles } from "lucide-react";

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onClick={createSparkle}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-6xl animate-pulse">💜</div>
        <div className="absolute top-40 right-32 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-32 text-5xl animate-pulse" style={{ animationDelay: '2s' }}>👑</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>💫</div>
      </div>

      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle text-2xl"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          ✨
        </div>
      ))}

      <div className="text-center space-y-8 relative z-10 px-6 max-w-4xl">
        {/* Crown decoration */}
        <div className="flex justify-center mb-6">
          <div className="text-8xl animate-bounce">👑</div>
        </div>

        {/* Main title */}
        <h1 className="title-romantic relative">
          Queen at 21 💜
          <div className="heart-decoration"></div>
        </h1>

        {/* Subtitle */}
        <p className="subtitle-romantic max-w-2xl mx-auto">
          A journey of love in 21 poems
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center space-x-4 py-6">
          <Heart className="w-6 h-6 text-royal-purple animate-pulse" />
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <Heart className="w-6 h-6 text-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <Heart className="w-6 h-6 text-royal-purple animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Description */}
        <p className="font-serif text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Happy Birthday, Queen! 🎉 Today marks not just another year, but a new chapter in your story, a journey filled with love, dreams, and golden memories. May your heart be crowned with joy, your days sparkle with laughter, and every poem in this collection remind you how cherished you are. Here’s to you, to love, and to the magic of turning 21! 💜✨
        </p>

        {/* Call to action button */}
        <div className="pt-8">
          <Button
            onClick={onStartJourney}
            className="btn-royal group relative overflow-hidden"
            size="lg"
          >
            <BookOpen className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Open Book
            <Sparkles className="w-5 h-5 ml-3 group-hover:animate-spin" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;