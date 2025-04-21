
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { FileAudio, FileText, FileVideo, Clock, Download, Play } from "lucide-react";

const demoData = {
  audio: [
    { name: "My Song.wav", date: "2025-04-21", type: "Audio", status: "Ready", actions: ["play", "download"] },
  ],
  text: [
    { name: "Translation.txt", date: "2025-04-21", type: "Text", status: "Ready", actions: ["download"] },
  ],
  video: [
    { name: "Animation.mp4", date: "2025-04-21", type: "Video", status: "Processing", actions: [] },
  ],
};

export default function Library() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Library</h1>
        <Tabs defaultValue="audio">
          <TabsList className="mb-4">
            <TabsTrigger value="audio" className="flex gap-2 items-center">
              <FileAudio className="w-4 h-4" /> Audio
            </TabsTrigger>
            <TabsTrigger value="text" className="flex gap-2 items-center">
              <FileText className="w-4 h-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="video" className="flex gap-2 items-center">
              <FileVideo className="w-4 h-4" /> Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="audio">
            <MediaTable data={demoData.audio} />
          </TabsContent>
          <TabsContent value="text">
            <MediaTable data={demoData.text} />
          </TabsContent>
          <TabsContent value="video">
            <MediaTable data={demoData.video} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MediaTable({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              No items yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>
              {item.status === "Ready" ? (
                <span className="text-green-600">Ready</span>
              ) : (
                <span className="text-blue-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {item.status}</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-center">
                {item.actions.includes("play") && <button title="Play"><Play className="w-4 h-4" /></button>}
                {item.actions.includes("download") && <button title="Download"><Download className="w-4 h-4" /></button>}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
