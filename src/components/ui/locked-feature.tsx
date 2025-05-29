import * as React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface LockedFeatureProps {
  isLocked: boolean;
  children: React.ReactNode;
  className?: string;
  blurRadius?: number; // Blur radius in pixels
}

const LockedFeature = React.forwardRef<HTMLDivElement, LockedFeatureProps>(
  ({ isLocked, children, className, blurRadius = 0.5, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div style={isLocked ? { filter: `blur(${blurRadius}px)` } : {}}>
          {children}
        </div>
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center text-white">
              <Lock className="mx-auto h-8 w-8 mb-2" />
              <p className="text-lg font-semibold">Feature Locked</p>
              <p className="text-sm">
                This feature is not available to use. Please {" "}
                <Link to="https://www.zenlead.in/#contact" className="underline text-white hover:text-gray-200">
                  Contact us!
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

LockedFeature.displayName = "LockedFeature";

export { LockedFeature };