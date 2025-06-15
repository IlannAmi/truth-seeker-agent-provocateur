import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AudioFactCheck from "./pages/AudioFactCheck";
import TwitterAnalysis from "./pages/TwitterAnalysis";
import { useLocation } from "react-router-dom";
import JamesBondTransition from "@/components/JamesBondTransition";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const [jbTransitionActive, setJbTransitionActive] = useState(false);
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  useEffect(() => {
    // Start transition only if pathname changed (not on first mount)
    if (prevPathname !== location.pathname) {
      setJbTransitionActive(true);
      setTimeout(() => {
        setJbTransitionActive(false);
        setPrevPathname(location.pathname);
      }, 800); // Match animation duration
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* JamesBond Transition overlay */}
        <JamesBondTransition active={jbTransitionActive} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/audio" element={<AudioFactCheck />} />
            <Route path="/twitter" element={<TwitterAnalysis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
