import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

// Placeholder image (you can replace this with an actual image URL or import)
const placeholderImage = "https://via.placeholder.com/300x150?text=Model+Image";

interface ModelCardProps {
  title: string;
  description: string;
  image : string;
  icon: LucideIcon;
  onTryNow: () => void;
}

const ModelCard = ({ title, description, icon: Icon, image : image, onTryNow }: ModelCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden flex flex-col min-h-[400px]">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-700 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Section */}
      <CardHeader className="p-4">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-lime-500" />
          <h2 className="text-white text-xl font-semibold">{title}</h2>
        </div>
      </CardHeader>

      {/* Content Section - Stats */}
      <CardContent className="p-4 flex-1">
        <div className="space-y-3">
          {/* Example stats inspired by the drone UI */}
          <div className="flex items-center gap-2 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-black text-xs">✓</span>
            </span>
            <span className="text-sm">
              <strong>Processing Speed:</strong> High
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-black text-xs">✓</span>
            </span>
            <span className="text-sm">
              <strong>Output Quality:</strong> Excellent
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-black text-xs">✓</span>
            </span>
            <span className="text-sm">
              <strong>Compatibility:</strong> Multi-format
            </span>
          </div>
        </div>
        {/* Performance Stats Section */}
        <div className="mt-4">
          <h3 className="text-gray-400 text-sm font-semibold uppercase">Performance Stats</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-black text-xs">↗</span>
              </span>
              <span className="text-sm">
                <strong>Total Runs:</strong> 150
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-black text-xs">↗</span>
              </span>
              <span className="text-sm">
                <strong>Success Rate:</strong> 98%
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="px-4 py-3 border-t border-gray-800 bg-gray-950">
        <Button
          variant="link"
          className="ml-auto text-lime-500 p-0 hover:text-lime-400 flex items-center gap-1"
          onClick={onTryNow}
        >
          Try Now
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;