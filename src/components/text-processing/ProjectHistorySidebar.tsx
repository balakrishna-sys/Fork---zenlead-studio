import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  FileText, 
  Search,
  Plus,
  History,
  Menu
} from "lucide-react";

interface DocumentProject {
  id: string;
  title: string;
  type: string;
  timestamp: string;
  status: 'draft' | 'completed' | 'processing';
  model: string;
  wordCount?: number;
  preview: string;
  category: 'traditional' | 'content-generation';
}

interface ProjectHistorySidebarProps {
  projects: DocumentProject[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  onNewProject: () => void;
  onProjectSelect?: (project: DocumentProject) => void;
  contentPresets: any[];
  traditionalModels: any[];
}

const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const SidebarContent = ({ 
  projects, 
  searchQuery, 
  setSearchQuery, 
  filterType, 
  setFilterType, 
  filterCategory, 
  setFilterCategory, 
  onNewProject, 
  onProjectSelect,
  contentPresets,
  traditionalModels,
  onClose 
}: ProjectHistorySidebarProps & { onClose?: () => void }) => {
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">AI Studio</h2>
            <p className="text-sm text-muted-foreground">Text Processing</p>
          </div>
        </div>
        
        <Button className="w-full gap-2" onClick={() => { onNewProject(); onClose?.(); }}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b space-y-3 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="traditional">Traditional Tools</SelectItem>
              <SelectItem value="content-generation">Content Generation</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text-to-speech">Voice</SelectItem>
              <SelectItem value="excel-to-charts">Charts</SelectItem>
              <SelectItem value="summarize">Summary</SelectItem>
              <SelectItem value="ats-score">ATS</SelectItem>
              <SelectItem value="resume-analyser">Resume</SelectItem>
              <SelectItem value="book">Books</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="course">Courses</SelectItem>
              <SelectItem value="letter">Letters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project History - Full Height */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm">Recent Projects</h3>
          </div>
          
          {filteredProjects.map((project) => {
            const traditionalModel = traditionalModels.find(m => m.key === project.type);
            const contentPreset = contentPresets.find(p => p.id === project.type);
            const item = traditionalModel || contentPreset;
            const Icon = item?.icon || FileText;
            
            return (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => { onProjectSelect?.(project); onClose?.(); }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item?.color || 'from-gray-500 to-gray-600'} text-white flex-shrink-0`}>
                      {(() => {
                        const IconComponent = Icon;
                        return <IconComponent className="h-4 w-4" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate mb-1">{project.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.preview}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.category === 'traditional' ? 'Tool' : 'Gen'}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(project.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No projects found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectHistorySidebar = (props: ProjectHistorySidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-lg">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Project History</SheetTitle>
            </SheetHeader>
            <SidebarContent {...props} onClose={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 border-r bg-card/30 backdrop-blur-sm">
        <SidebarContent {...props} />
      </div>
    </>
  );
};

export default ProjectHistorySidebar;
