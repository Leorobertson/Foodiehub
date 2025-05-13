import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VideoFeed from "./pages/VideoFeed";
import UploadVideo from "./pages/UploadVideo";
import MenuBuilder from "./pages/MenuBuilder";
import Recipes from "./pages/Recipes";
import Recommendations from "./pages/Recommendations";
import Community from "./pages/Community";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VideoFeed} />
      <Route path="/home" component={Home} />
      <Route path="/upload" component={UploadVideo} />
      <Route path="/menu-builder" component={MenuBuilder} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recommendations" component={Recommendations} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isVideoFeedPage = location === "/";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`min-h-screen flex flex-col ${isVideoFeedPage ? "bg-black" : ""}`}>
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          {!isVideoFeedPage && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
