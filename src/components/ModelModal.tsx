import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Maximize2, Minimize2, ExternalLink, Info } from "lucide-react";

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  model?: {
    title: string;
    titletagline: string;
    description: string;
    color: string;
    bgColor: string;
    badge: string;
    icon: any;
    modelkeywords?: string[];
    sucessrate?: number;
    processingspeed?: string;
    outputquality?: string;
  };
  children: ReactNode;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const ModelModal = ({ 
  isOpen, 
  onClose, 
  model, 
  children, 
  isFullscreen = false, 
  onToggleFullscreen 
}: ModelModalProps) => {
  if (!isOpen || !model) return null;

  const Icon = model.icon;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed z-50 transition-all duration-300 ${
        isFullscreen 
          ? 'inset-2 sm:inset-4' 
          : 'top-4 left-4 right-4 bottom-4 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90vw] sm:max-w-4xl sm:h-[80vh]'
      }`}>
        <Card className="h-full bg-card/95 backdrop-blur-md border border-border/50 shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-border/50 pb-4 flex-shrink-0">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg flex-shrink-0`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg sm:text-xl font-bold truncate">{model.title}</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base">{model.titletagline}</p>
                </div>
                <Badge className={`${model.bgColor} border-0 text-xs sm:text-sm px-2 sm:px-3 py-1 flex-shrink-0`}>
                  {model.badge}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {onToggleFullscreen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFullscreen}
                    className="h-8 w-8 p-0 hidden sm:flex"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Model Info */}
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {model.description}
              </p>
              
              {/* Stats - Responsive Grid */}
              {(model.sucessrate || model.processingspeed || model.outputquality) && (
                <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-4 text-xs">
                  {model.sucessrate && (
                    <div className="flex items-center gap-1 justify-center sm:justify-start">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-muted-foreground truncate">Success: {model.sucessrate}%</span>
                    </div>
                  )}
                  {model.processingspeed && (
                    <div className="flex items-center gap-1 justify-center sm:justify-start">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-muted-foreground truncate">Speed: {model.processingspeed}</span>
                    </div>
                  )}
                  {model.outputquality && (
                    <div className="flex items-center gap-1 justify-center sm:justify-start">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-muted-foreground truncate">Quality: {model.outputquality}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Keywords - Responsive Wrap */}
              {model.modelkeywords && model.modelkeywords.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {model.modelkeywords.slice(0, 4).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {model.modelkeywords.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.modelkeywords.length - 4} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          
          {/* Content */}
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 sm:p-6">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// Slide-in panel alternative for less intrusive UX
export const ModelSidePanel = ({ 
  isOpen, 
  onClose, 
  model, 
  children 
}: Omit<ModelModalProps, 'isFullscreen' | 'onToggleFullscreen'>) => {
  if (!isOpen || !model) return null;

  const Icon = model.icon;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[500px] lg:w-[600px] z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Card className="h-full bg-card/95 backdrop-blur-md border-l border-border/50 shadow-2xl rounded-none overflow-hidden flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-border/50 pb-4 flex-shrink-0">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${model.color} shadow-lg flex-shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg font-bold truncate">{model.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{model.titletagline}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className={`${model.bgColor} border-0 text-xs px-2 py-1`}>
                  {model.badge}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Model Info */}
            <div className="mt-3 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {model.description}
              </p>
              
              {/* Keywords */}
              {model.modelkeywords && model.modelkeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {model.modelkeywords.slice(0, 4).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          
          {/* Content */}
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 sm:p-6">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
