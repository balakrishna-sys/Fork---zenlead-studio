import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    // List of internal application routes that should redirect to dashboard instead of 404
    const internalRoutes = [
      '/app', '/dashboard', '/audio', '/text', '/video', '/code', '/library', '/profile'
    ];
    
    // Check if current path starts with any internal route patterns
    const isInternalRoute = internalRoutes.some(route => 
      path.startsWith(route) && path !== route
    );
    
    // If it's an internal route pattern but not exact match, redirect to home
    if (isInternalRoute) {
      navigate('/', { replace: true });
      return;
    }
    
    // For truly unknown routes, let them go to 404
    
  }, [location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default RouteHandler;
