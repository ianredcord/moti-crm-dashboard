import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


import { Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

function Router() {
  // 使用 hash location 來避免 GitHub Pages 的路由問題
  // 或者如果使用 path location，需要確保 base path 正確
  // 這裡我們保持使用預設的 path location，但配合 404.html hack
  
  // 為了確保在子目錄下也能正常運作，我們需要設定 base path
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={() => <ProtectedRoute component={Home} />} />
        <Route path="/dashboard" component={() => <ProtectedRoute component={Home} />} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
