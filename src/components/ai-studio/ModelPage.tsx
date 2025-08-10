import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BaseModel } from "./AIStudioBase";
import { useNavigate } from "react-router-dom";

interface ModelPageProps {
  model: BaseModel;
  children: ReactNode;
  backPath: string; // Path to go back to (e.g., "/text")
}

export const ModelPage = ({ model, children, backPath }: ModelPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(backPath)}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Button>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${model.color}`}>
              {(() => {
                const Icon = model.icon;
                return <Icon className="h-4 w-4 text-white" />;
              })()}
            </div>
            <div>
              <h2 className="font-semibold text-lg lg:text-xl">{model.title}</h2>
              <p className="text-sm text-muted-foreground">{model.titletagline}</p>
            </div>
          </div>
          <Badge className={`ml-auto ${model.bgColor} border-0`}>
            {model.badge}
          </Badge>
        </div>
        
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
          <CardContent className="p-4 lg:p-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
