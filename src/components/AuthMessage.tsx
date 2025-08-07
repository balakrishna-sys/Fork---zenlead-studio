import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthMessageProps {
  children: React.ReactNode;
}

const AuthMessage: React.FC<AuthMessageProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's an authentication message in the location state
    if (location.state?.message) {
      toast.info(location.state.message, {
        description: "Sign in to continue to your requested page"
      });
      
      // Clear the message from history state
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.message]);

  return <>{children}</>;
};

export default AuthMessage;
