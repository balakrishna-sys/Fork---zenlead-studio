
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, Clapperboard } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Headphones className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VocalVerse Studio</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/app" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Studio Dashboard
                </Link>
                <Link to="/audio" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Audio Processing
                </Link>
                <Link to="/text" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Text Processing
                </Link>
                <Link to="/video" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Video Processing
                </Link>
                <Link to="/pricing" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Pricing
                </Link>
                <Link to="/library" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary">
                  Library
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <Button variant="outline" className="mr-4">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - would implement with state for actual toggle */}
            <Button variant="ghost" className="px-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

