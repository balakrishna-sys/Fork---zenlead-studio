import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SmartNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  requireAuth?: boolean;
  onClick?: () => void;
}

const SmartNavLink: React.FC<SmartNavLinkProps> = ({ 
  to, 
  children, 
  className = "", 
  requireAuth = false,
  onClick 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    // If custom onClick is provided, call it
    if (onClick) {
      onClick();
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated && !isLoading) {
      e.preventDefault();
      
      // Show informative toast
      toast.error("Please log in to access this section", {
        description: "You need to be signed in to access this feature",
        action: {
          label: "Sign In",
          onClick: () => {
            // Navigate to sign in with current location stored
            window.location.href = `/signin?redirect=${encodeURIComponent(to)}`;
          }
        }
      });
      
      return;
    }

    // For protected routes that redirect to login anyway, don't show toast
    if (requireAuth && !isAuthenticated) {
      return;
    }
  };

  // Always render as a Link but with smart click handling
  return (
    <Link 
      to={to} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default SmartNavLink;
