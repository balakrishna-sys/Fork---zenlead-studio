import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, Eye, Zap, TrendingUp } from "lucide-react";

interface ModelCardProps {
  title: string;
  titletagline: string;
  description: string;
  modelName: string;
  modelkeywords: string[];
  liveornot: boolean;
  totalruns: number;
  sucessrate: number; // Note: Kept as "sucessrate" to match your interface
  processingspeed: string;
  outputquality: string;
  compatibility: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  onTryNow: () => void;
}

const ModelCard = ({
  title,
  titletagline,
  description,
  modelName,
  modelkeywords,
  liveornot,
  totalruns,
  sucessrate,
  processingspeed,
  outputquality,
  compatibility,
  image,
  icon: Icon,
  onTryNow,
}: ModelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group relative overflow-hidden bg-white dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 hover:border-blue-400 transition-all duration-500 hover:shadow-xl hover:shadow-blue-300/20 dark:hover:shadow-blue-500/20 hover:-translate-y-1 min-h-[400px] flex flex-col">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-pink-100/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Section */}
      <div className="relative h-40 bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{titletagline}</span>
          </div>
        </div>
      </div>

      <CardHeader className="relative z-10 p-4">
        {/* Header with avatar, modelName, and badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-blue-400/20 group-hover:ring-blue-400/40 transition-all duration-300">
              <AvatarImage src="/placeholder.svg" alt="Model Creator" />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
                AI
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {modelName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">by Zenlead Research</p>
            </div>
          </div>
          {liveornot && (
            <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0 shadow-md">
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
          )}
        </div>

        {/* Model description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {modelkeywords.map((keyword, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-100/50 dark:hover:bg-blue-50/10 transition-colors"
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 p-4 flex-1 space-y-4">
        {/* Performance Stats */}
        <div className="space-y-3">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase">Performance Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-black text-xs">↗</span>
              </span>
              <span className="text-sm">
                <strong>Total Runs:</strong> {totalruns}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </span>
              <span className="text-sm">
                <strong>Success Rate:</strong> {sucessrate}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </span>
              <span className="text-sm">
                <strong>Processing Speed:</strong> {processingspeed}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </span>
              <span className="text-sm">
                <strong>Output Quality:</strong> {outputquality}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </span>
              <span className="text-sm">
                <strong>Compatibility:</strong> {compatibility.join(", ")}
              </span>
            </div>
          </div>
        </div>

        <Separator className="opacity-50 bg-gray-300 dark:bg-gray-700" />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
            onClick={onTryNow}
          >
            <Zap className="w-4 h-4 mr-2" />
            Try Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-red-100/50 dark:hover:bg-red-50/10 hover:border-red-300 transition-all duration-300"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isLiked ? "text-red-500 fill-current" : "text-gray-500 dark:text-gray-400"}`}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blue-100/50 dark:hover:bg-blue-50/10 hover:border-blue-300 transition-all duration-300"
          >
            <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCard;