
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!user) return;
      
      // Check if user is an admin
      const { data } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      setIsAdmin(!!data);
    };
    
    if (user && adminOnly) {
      checkIsAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user, adminOnly]);

  // Show loading state while checking authentication
  if (loading || (adminOnly && isAdmin === null)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Redirect to home if not admin but admin route is requested
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated and has required permissions
  return <>{children}</>;
};

export default ProtectedRoute;
