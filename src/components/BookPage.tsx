import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./BookPage.css";

interface Poem {
  title: string;
  poem: string;
}

interface BookPageProps {
  poems: Poem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

const BookPage = ({
  poems,
  currentPage,
  onPageChange,
  onClose,
}: BookPageProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const totalPages = poems.length + 2; // +1 for special birthday poem, +1 for final message

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages || isFlipping) return;

    setIsFlipping(true);
    setTimeout(() => {
      onPageChange(newPage);
      setIsFlipping(false);
    }, 400);
  };

  const renderSpecialBirthdayPage = () => (
    <div className="book-page h-full flex flex-col bg-gradient-to-b from-romantic-dark-purple to-romantic-dark-black-purple">
      <div className="text-center space-y-6 max-w-3xl mx-auto px-2 py-8 md:py-12">
        <div className="relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">✨</div>
          <div className="text-7xl sm:text-8xl mb-4 animate-float">🎂</div>
        </div>
        <h2 className="poem-title text-3xl md:text-4xl lg:text-5xl mb-8 romantic-text gradient-text">
          Queen Turns 21!
        </h2>
        <div className="poem-container relative overflow-y-auto max-h-[60vh] md:max-h-[65vh] scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent rounded-lg backdrop-blur-sm bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none"></div>
          <p className="romantic-text leading-relaxed text-lg md:text-xl lg:text-2xl px-3 py-8 relative z-10">
            "Today the world shines brighter than sun,
            <br /> For it crowns my queen, who turns twenty-one.
            <br /> From stranger to friend, to love so true,
            <br /> Every step has led me closer to you.
            <br />
            <br /> You taught me patience, you taught me care,
            <br /> Showed me how love is gentle and rare,
            <br /> Through laughter, through silence, through storm and fight,
            <br /> You held my soul and brought me light.
            <br />
            <br /> I've admired your strength, your tender ways,
            <br /> You've colored my nights, you've warmed my days.
            <br /> I've dreamed of our travels, our books, our home,
            <br /> Of building forever, where hearts can roam.
            <br />
            <br /> I promise devotion, through time and test,
            <br /> My heart is yours, in you it rests.
            <br /> No distance can break, no shadow divide,
            <br /> With you, my love, I stand by your side.
            <br />
            <br /> And even when stars begin to fade,
            <br /> Our story endures, unafraid.
            <br /> This poem's no ending, but only a start,
            <br /> A continuum written in soul and heart.
            <br />
            <br /> So happy birthday, my brightest one,
            <br /> Here's to all tomorrows we've just begun."
          </p>
        </div>
      </div>
    </div>
  );

  const renderFinalPage = () => (
    <div className="book-page h-full flex flex-col bg-gradient-to-b from-romantic-dark-purple to-romantic-dark-black-purple">
      <div className="text-center space-y-8 max-w-3xl mx-auto px-2 py-12">
        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">✨</div>
          <div className="text-8xl mb-4 animate-float">💜</div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        </div>
        
        <h2 className="poem-title text-3xl md:text-4xl lg:text-5xl mb-8 romantic-text gradient-text">
          Have a Great Day, My Dearest Queen!
        </h2>
        
        <div className="relative mt-12">
          <Button
            onClick={onClose}
            variant="outline"
            className="relative group px-4 py-4 text-lg border-2 border-gold text-gold hover:bg-gold/10 transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10 romantic-text">Close Book</span>
          </Button>
          
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );

  const renderPoemPage = (poem: Poem) => (
    <div className="book-page h-full flex flex-col bg-gradient-to-b from-romantic-dark-purple to-romantic-dark-black-purple">
      <div className="space-y-6 max-w-3xl mx-auto px-2 py-8 md:py-12 w-full">
        <div className="text-center mb-8 relative">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-2xl opacity-50">✨</div>
          <h2 className="poem-title text-center text-2xl md:text-3xl lg:text-4xl inline-block relative">
            {poem.title}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl opacity-50">✨</div>
          </h2>
        </div>
        <div className="poem-container relative overflow-y-auto max-h-[60vh] md:max-h-[65vh] scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent rounded-lg backdrop-blur-sm bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none"></div>
          <div className="poem-text text-center leading-relaxed text-base md:text-lg lg:text-xl p-6 relative z-10">
            {poem.poem.split("\n").map((line, index) => (
              <p key={index} className="mb-3 romantic-text hover:text-gold/90 transition-colors duration-300">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentPageContent = () => {
    if (currentPage === 0) {
      return renderSpecialBirthdayPage();
    } else if (currentPage === totalPages - 1) {
      return renderFinalPage();
    } else {
      const poemIndex = currentPage - 1;
      return renderPoemPage(poems[poemIndex]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="relative w-full mx-auto max-w-[95vw] md:max-w-4xl">
        {/* Book container */}
        <div
          className="relative rounded-lg shadow-2xl overflow-hidden min-h-[80vh] sm:min-h-[70vh] max-h-[90vh] sm:max-h-[85vh]"
          style={{
            background: "var(--gradient-page)",
            boxShadow: "var(--shadow-book)",
          }}
        >
          {/* Page content */}
          <div
            className={`page-turn ${
              isFlipping ? "flipped" : ""
            } h-full overflow-y-auto`}
          >
            {getCurrentPageContent()}
          </div>

          {/* Navigation */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || isFlipping}
              className="text-gold hover:text-gold hover:bg-black/30 backdrop-blur-sm rounded-full p-2 border border-gold/30 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="text-gold hover:text-gold hover:bg-black/30 backdrop-blur-sm rounded-full p-2 border border-gold/30 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
