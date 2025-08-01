import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LockedFeature } from "@/components/ui/locked-feature";
import { 
  FileAudio, 
  FileText, 
  FileVideo, 
  Clock, 
  Download, 
  Play, 
  Search, 
  Filter, 
  Sparkles,
  Folder,
  Calendar,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Star,
  Eye,
  Share2,
  Trash2,
  Grid3X3,
  List,
  SortAsc,
  BarChart3
} from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  date: string;
  type: "Audio" | "Text" | "Video";
  status: "Ready" | "Processing" | "Failed";
  size: string;
  duration?: string;
  model: string;
  tags: string[];
  thumbnail?: string;
  actions: string[];
}

const demoData = {
  audio: [
    { 
      id: "1", 
      name: "Product Demo Translation.wav", 
      date: "2025-01-21", 
      type: "Audio" as const, 
      status: "Ready" as const, 
      size: "4.2 MB", 
      duration: "2:15", 
      model: "AudioTrans", 
      tags: ["Translation", "Product"], 
      actions: ["play", "download", "share"] 
    },
    { 
      id: "2", 
      name: "Voice Clone Sample.mp3", 
      date: "2025-01-20", 
      type: "Audio" as const, 
      status: "Ready" as const, 
      size: "3.8 MB", 
      duration: "1:45", 
      model: "VoiceReplicator", 
      tags: ["Voice Clone", "Sample"], 
      actions: ["play", "download", "share"] 
    },
    { 
      id: "3", 
      name: "Enhanced Podcast.wav", 
      date: "2025-01-19", 
      type: "Audio" as const, 
      status: "Processing" as const, 
      size: "12.1 MB", 
      duration: "8:30", 
      model: "AudioClear", 
      tags: ["Enhancement", "Podcast"], 
      actions: [] 
    },
  ],
  text: [
    { 
      id: "4", 
      name: "Resume Analysis Report.pdf", 
      date: "2025-01-21", 
      type: "Text" as const, 
      status: "Ready" as const, 
      size: "2.1 MB", 
      model: "ResumeOptimizer", 
      tags: ["Resume", "Analysis"], 
      actions: ["download", "view", "share"] 
    },
    { 
      id: "5", 
      name: "Book Chapter - AI Ethics.pdf", 
      date: "2025-01-20", 
      type: "Text" as const, 
      status: "Ready" as const, 
      size: "5.7 MB", 
      model: "BookGenix", 
      tags: ["Book", "AI", "Ethics"], 
      actions: ["download", "view", "share"] 
    },
    { 
      id: "6", 
      name: "Meeting Summary.txt", 
      date: "2025-01-18", 
      type: "Text" as const, 
      status: "Ready" as const, 
      size: "45 KB", 
      model: "TextSummarizer", 
      tags: ["Summary", "Meeting"], 
      actions: ["download", "view", "share"] 
    },
  ],
  video: [
    { 
      id: "7", 
      name: "Product Animation.mp4", 
      date: "2025-01-21", 
      type: "Video" as const, 
      status: "Processing" as const, 
      size: "25.4 MB", 
      duration: "0:30", 
      model: "VideoGenix", 
      tags: ["Animation", "Product"], 
      actions: [] 
    },
    { 
      id: "8", 
      name: "Explainer Video.mp4", 
      date: "2025-01-19", 
      type: "Video" as const, 
      status: "Ready" as const, 
      size: "18.7 MB", 
      duration: "1:20", 
      model: "VideoGenix", 
      tags: ["Explainer", "Tutorial"], 
      actions: ["play", "download", "share"] 
    },
  ],
};

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeTab, setActiveTab] = useState("audio");

  const lockedTabs = {
    audio: true,
    text: true,
    video: true,
  };

  const allItems = [...demoData.audio, ...demoData.text, ...demoData.video];
  const totalFiles = allItems.length;
  const processingFiles = allItems.filter(item => item.status === "Processing").length;
  const readyFiles = allItems.filter(item => item.status === "Ready").length;
  const totalSize = "72.8 MB"; // Calculated sum

  const getFilteredData = (data: MediaItem[]) => {
    return data
      .filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(item => filterStatus === "all" || item.status.toLowerCase() === filterStatus)
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "date":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "size":
            return parseFloat(b.size) - parseFloat(a.size);
          default:
            return 0;
        }
      });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Audio":
        return <FileAudio className="h-4 w-4 text-blue-500" />;
      case "Text":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "Video":
        return <FileVideo className="h-4 w-4 text-purple-500" />;
      default:
        return <Folder className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
              <Folder className="h-6 w-6 text-primary-foreground" />
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-card/50 backdrop-blur-sm border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Media Library
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Your Creative Library
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage all your AI-generated content in one place. Audio translations, enhanced videos, 
            generated documents, and more.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                  <p className="text-2xl font-bold text-blue-600">{totalFiles}</p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ready Files</p>
                  <p className="text-2xl font-bold text-green-600">{readyFiles}</p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-orange-600">{processingFiles}</p>
                </div>
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold text-purple-600">{totalSize}</p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files, tags, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="px-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="audio" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileAudio className="w-4 h-4" /> 
              Audio ({demoData.audio.length})
            </TabsTrigger>
            <TabsTrigger value="text" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" /> 
              Text ({demoData.text.length})
            </TabsTrigger>
            <TabsTrigger value="video" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileVideo className="w-4 h-4" /> 
              Video ({demoData.video.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio">
            <LockedFeature isLocked={lockedTabs.audio}>
              <MediaDisplay 
                data={getFilteredData(demoData.audio)} 
                viewMode={viewMode}
                getStatusIcon={getStatusIcon}
                getTypeIcon={getTypeIcon}
              />
            </LockedFeature>
          </TabsContent>

          <TabsContent value="text">
            <LockedFeature isLocked={lockedTabs.text}>
              <MediaDisplay 
                data={getFilteredData(demoData.text)} 
                viewMode={viewMode}
                getStatusIcon={getStatusIcon}
                getTypeIcon={getTypeIcon}
              />
            </LockedFeature>
          </TabsContent>

          <TabsContent value="video">
            <LockedFeature isLocked={lockedTabs.video}>
              <MediaDisplay 
                data={getFilteredData(demoData.video)} 
                viewMode={viewMode}
                getStatusIcon={getStatusIcon}
                getTypeIcon={getTypeIcon}
              />
            </LockedFeature>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MediaDisplay({ 
  data, 
  viewMode, 
  getStatusIcon, 
  getTypeIcon 
}: { 
  data: MediaItem[]; 
  viewMode: "grid" | "list";
  getStatusIcon: (status: string) => JSX.Element | null;
  getTypeIcon: (type: string) => JSX.Element;
}) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No files found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          data.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <div className="flex items-center gap-1">
                      {getStatusIcon(item.status)}
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-sm font-medium leading-snug">{item.name}</CardTitle>
                <CardDescription className="text-xs">
                  {item.model} • {item.size}
                  {item.duration && ` • ${item.duration}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <div className="flex gap-2">
                  {item.actions.includes("play") && (
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <Play className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("view") && (
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("download") && (
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("share") && (
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12">
                <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No files found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </TableCell>
            </TableRow>
          )}
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <span className="truncate max-w-48">{item.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-sm ${
                    item.status === "Ready" ? "text-green-600" : 
                    item.status === "Processing" ? "text-blue-600" : "text-red-600"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.size}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {item.model}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 justify-center">
                  {item.actions.includes("play") && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Play className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("view") && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("download") && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                  {item.actions.includes("share") && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
