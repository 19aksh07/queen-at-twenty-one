import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="book-page h-full flex flex-col justify-center overflow-y-auto">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="text-6xl mb-4">🎂</div>
        <h2 className="poem-title">Queen Turns 21!</h2>
        <div className="poem-text italic text-center">
          <p className="mb-4 leading-relaxed">
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
    <div className="book-page h-full flex flex-col justify-center overflow-y-auto">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="text-6xl mb-4">💜</div>
        <h2 className="poem-title">Have a Great Day, My Dearest Queen!</h2>
        <Button
          onClick={onClose}
          variant="outline"
          className="mt-8 border-gold text-gold hover:bg-gold hover:text-romantic-dark-black-purple transition-all duration-300"
        >
          Close Book
        </Button>
      </div>
    </div>
  );

  const renderPoemPage = (poem: Poem) => (
    <div className="book-page h-full flex flex-col justify-center overflow-y-auto">
      <div className="space-y-6 max-w-2xl mx-auto px-4">
        <h2 className="poem-title text-center">{poem.title}</h2>
        <div className="poem-text text-center leading-relaxed">
          {poem.poem.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
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
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative max-w-4xl w-full mx-auto">
        {/* Book container */}
        <div
          className="relative rounded-lg shadow-2xl overflow-hidden min-h-[70vh] max-h-[85vh]"
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
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || isFlipping}
              className="text-gold hover:text-gold-light hover:bg-royal-purple/20 border border-gold/30"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <span className="text-sm text-gold font-serif font-semibold px-4 py-2 bg-royal-purple/30 rounded-full border border-gold/50 backdrop-blur-sm">
              Page {currentPage + 1} of {totalPages}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="text-gold hover:text-gold-light hover:bg-royal-purple/20 border border-gold/30"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Page number indicator */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              disabled={isFlipping}
              className={`relative group transition-all duration-300 ${
                i === currentPage ? "transform scale-125" : "hover:scale-110"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-gold shadow-lg shadow-gold/50"
                    : "bg-royal-purple/40 hover:bg-royal-purple/60"
                }`}
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {i === 0
                  ? "Birthday"
                  : i === totalPages - 1
                  ? "Continuum"
                  : `Poem ${i}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
