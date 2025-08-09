import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

interface ContentPreset {
  id: string;
  type: 'book' | 'research' | 'course' | 'letter' | 'report' | 'article';
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  estimatedTime: string;
  features: string[];
  settings: {
    tone?: string[];
    style?: string[];
    length?: string[];
    format?: string[];
  };
}

interface ContentGenerationGridProps {
  presets: ContentPreset[];
  onPresetSelect: (preset: ContentPreset) => void;
  title: string;
  className?: string;
}

const ContentGenerationGrid = ({ presets, onPresetSelect, title, className = "" }: ContentGenerationGridProps) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <Card
              key={preset.id}
              className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${preset.bgColor} border-2 hover:border-primary/50`}
              onClick={() => onPresetSelect(preset)}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${preset.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base lg:text-lg">{preset.title}</h3>
                    <p className="text-sm text-muted-foreground">{preset.estimatedTime}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {preset.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{preset.estimatedTime}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {preset.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {preset.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{preset.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Start Creating
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContentGenerationGrid;
