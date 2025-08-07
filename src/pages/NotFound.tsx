import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl text-center">
          <CardHeader className="space-y-6">
            <div className="mx-auto">
              <div className="text-8xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                404
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                Page Not Found
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Oops! The page you're looking for doesn't exist.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The page you requested might have been moved, deleted, or doesn't exist. 
                Don't worry, let's get you back on track!
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2 max-w-md mx-auto">
                <Button asChild className="h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                
                <Button variant="outline" onClick={() => window.history.back()} className="h-12">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h3 className="font-semibold mb-4">Popular Pages</h3>
              <div className="grid gap-2 text-sm">
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  🏠 Home
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  💰 Pricing
                </Link>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ℹ️ About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  📞 Contact
                </Link>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              If you believe this is an error, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact our support team
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
