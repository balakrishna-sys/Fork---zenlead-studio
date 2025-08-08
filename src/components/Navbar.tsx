import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, Menu, Moon, Sun, User, LogOut, Settings, CreditCard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import SmartNavLink from "@/components/SmartNavLink";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Headphones className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Zenlead Studio</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <SmartNavLink to="/app" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Studio Dashboard
                </SmartNavLink>
                <SmartNavLink to="/audio" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Audios
                </SmartNavLink>
                <SmartNavLink to="/text" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Texts
                </SmartNavLink>
                <SmartNavLink to="/video" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Videos
                </SmartNavLink>
                <SmartNavLink to="/code" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Code
                </SmartNavLink>
                <Link to="/pricing" className="px-3 py-2 text-sm font-medium hover:text-primary">
                  Pricing
                </Link>
                <SmartNavLink to="/library" className="px-3 py-2 text-sm font-medium hover:text-primary" requireAuth>
                  Library
                </SmartNavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-4"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback>{getUserInitials(user.firstName, user.lastName)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Credits: {user.credits}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/app')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/billing')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="outline" className="mr-4">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[385px] pt-10">
                <div className="flex flex-col space-y-4 mt-4">
                  <Link to="/" className="px-3 py-2 text-lg font-medium hover:text-primary">
                    Home
                  </Link>
                  <SmartNavLink to="/app" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Studio Dashboard
                  </SmartNavLink>
                  <SmartNavLink to="/audio" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Audios
                  </SmartNavLink>
                  <SmartNavLink to="/text" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Texts
                  </SmartNavLink>
                  <SmartNavLink to="/video" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Videos
                  </SmartNavLink>
                  <SmartNavLink to="/code" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Code
                  </SmartNavLink>
                  <Link to="/pricing" className="px-3 py-2 text-lg font-medium hover:text-primary">
                    Pricing
                  </Link>
                  <SmartNavLink to="/library" className="px-3 py-2 text-lg font-medium hover:text-primary" requireAuth>
                    Library
                  </SmartNavLink>
                  <div className="pt-4 border-t border-border">
                    {isAuthenticated && user ? (
                      <>
                        <div className="px-3 py-2 mb-4">
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Credits: {user.credits}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mb-2"
                          onClick={() => navigate('/profile')}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full mb-2"
                          onClick={() => navigate('/app')}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full mb-2"
                          onClick={() => navigate('/billing')}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Billing
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/signin">
                          <Button variant="outline" className="w-full mb-2">Sign In</Button>
                        </Link>
                        <Link to="/signup">
                          <Button className="w-full">Get Started</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
