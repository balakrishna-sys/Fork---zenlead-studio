import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ProcessingModel {
  key: string;
  title: string;
  titletagline: string;
  description: string;
  modelName: string;
  modelkeywords: string[];
  sucessrate: number;
  processingspeed: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  badge: string;
  category: 'traditional' | 'content-generation';
}

interface ProcessingToolGridProps {
  models: ProcessingModel[];
  onModelSelect: (model: ProcessingModel) => void;
  title: string;
  className?: string;
}

const ProcessingToolGrid = ({ models, onModelSelect, title, className = "" }: ProcessingToolGridProps) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <Card
              key={model.key}
              className={`cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${model.bgColor} border-2 hover:border-primary/50`}
              onClick={() => onModelSelect(model)}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {model.badge}
                    </Badge>
                    <p className="text-xs text-primary font-medium">{model.sucessrate}% Success</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-base lg:text-lg mb-1">{model.title}</h3>
                <p className="text-sm text-primary mb-2">{model.titletagline}</p>
                <p className="text-muted-foreground text-xs lg:text-sm mb-4 leading-relaxed line-clamp-3">
                  {model.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {model.modelkeywords.slice(0, 2).map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                  >
                    Try Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingToolGrid;
