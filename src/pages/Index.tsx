import { useState, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import BookPage from "@/components/BookPage";
import poemsData from "@/data/poems.json";

interface Poem {
  title: string;
  poem: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'book'>('landing');
  const [currentPage, setCurrentPage] = useState(0);
  const [poems] = useState<Poem[]>(poemsData);

  const handleStartJourney = () => {
    setCurrentView('book');
    setCurrentPage(0);
  };

  const handleClosebook = () => {
    setCurrentView('landing');
    setCurrentPage(0);
  };

  if (currentView === 'book') {
    return (
      <BookPage
        poems={poems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onClose={handleClosebook}
      />
    );
  }

  return (
    <LandingPage onStartJourney={handleStartJourney} />
  );
};

export default Index;
