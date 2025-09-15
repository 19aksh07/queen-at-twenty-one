import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">💔</div>
        <h1 className="poem-title">Page Not Found</h1>
        <p className="poem-text">This page seems to have wandered away from our love story.</p>
        <a 
          href="/" 
          className="btn-royal inline-flex items-center px-6 py-3 rounded-full font-display font-semibold text-lg"
        >
          Return to Our Story 💜
        </a>
      </div>
    </div>
  );
};

export default NotFound;
