import { useState } from "react";
import { 
  Search, Filter, Download, MoreHorizontal, Eye, 
  Ban, Trash2, Link as LinkIcon, FileText, Calendar 
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockHistory = [
  {
    id: "H-001",
    user: { name: "Budi Santoso", email: "budi@gmail.com" },
    type: "url",
    target: "http://phishing-bank-login.com/verify",
    risk_score: 85,
    risk_level: "high",
    date: "2024-08-07 10:30",
    ai_summary: "Terdeteksi sebagai situs phishing yang meniru halaman login bank resmi. Indikator: Domain baru, SSL tidak valid, dan pola URL mencurigakan."
  },
  {
    id: "H-002",
    user: { name: "Siti Aminah", email: "siti@yahoo.com" },
    type: "news",
    target: "Viral: Pemerintah Akan Membagikan Bantuan Rp 10 Juta...",
    risk_score: 75,
    risk_level: "high",
    date: "2024-08-07 09:15",
    ai_summary: "Berita ini memiliki ciri-ciri hoax: judul clickbait, tidak ada sumber resmi yang dikutip, dan menggunakan bahasa yang terlalu emosional."
  },
  {
    id: "H-003",
    user: { name: "Admin Utama", email: "admin@temaxing.com" },
    type: "url",
    target: "https://www.google.com",
    risk_score: 5,
    risk_level: "safe",
    date: "2024-08-06 14:20",
    ai_summary: "URL ini aman. Memiliki reputasi baik di semua provider keamanan (VirusTotal, Google Safe Browsing) dan sertifikat SSL valid."
  },
  {
    id: "H-004",
    user: { name: "Joko Widodo", email: "joko@test.com" },
    type: "news",
    target: "Tips Menjaga Kesehatan Jangka Panjang",
    risk_score: 15,
    risk_level: "safe",
    date: "2024-08-06 11:00",
    ai_summary: "Konten bersifat informatif dan edukatif. Tidak ditemukan indikasi misinformasi atau bahasa yang menyesatkan."
  }
];

const RiskBadge = ({ level, score }: { level: string; score: number }) => {
  const styles = {
    safe: "bg-success/10 text-success border-success/20",
    low: "bg-info/10 text-info border-info/20", // Pastikan warna info ada di CSS, atau ganti ke blue
    medium: "bg-warning/10 text-warning border-warning/20",
    high: "bg-destructive/10 text-destructive border-destructive/20",
  };
  
  const labels = { safe: "Aman", low: "Rendah", medium: "Sedang", high: "Tinggi" };
  const currentStyle = styles[level as keyof typeof styles] || styles.safe;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums ${currentStyle}`}>
      {score}/100 • {labels[level as keyof typeof labels]}
    </span>
  );
};

export default function UserHistoryManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof mockHistory[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Filter data berdasarkan Tab dan Search
  const filteredData = mockHistory.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch = 
      item.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleViewDetail = (item: typeof mockHistory[0]) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* 1. Header & Breadcrumb */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Riwayat Analisis</h1>
            <p className="text-muted-foreground">Pantau, filter, dan kelola seluruh riwayat pemindaian yang dilakukan pengguna.</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" /> Export CSV
          </Button>
        </div>

        {/* 2. Filter & Search Bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="news">Berita</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari URL, judul, atau nama user..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 3. Data Table */}
        <div className="rounded-xl border border-border bg-card">
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tipe</TableHead>
                  <TableHead>Target Analisis</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Tingkat Risiko</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
                              {row.type === "url" ? <LinkIcon className="size-4 text-brand" /> : <FileText className="size-4 text-brand" />}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Analisis {row.type === "url" ? "URL" : "Berita"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="max-w-[250px] truncate font-medium text-foreground">{row.target}</p>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>{row.target}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{row.user.name}</span>
                          <span className="text-xs text-muted-foreground">{row.user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RiskBadge level={row.risk_level} score={row.risk_score} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5" />
                          {row.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewDetail(row)}>
                              <Eye className="mr-2 size-4" /> Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Ban className="mr-2 size-4" /> Blokir User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 size-4" /> Hapus Riwayat
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Tidak ada riwayat yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* 4. Pagination */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-medium text-foreground">1</span> sampai <span className="font-medium text-foreground">{filteredData.length}</span> dari <span className="font-medium text-foreground">{filteredData.length}</span> data
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 5. Detail Sheet (Side Panel) */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-xl">
                {selectedItem?.type === "url" ? <LinkIcon className="size-5 text-brand" /> : <FileText className="size-5 text-brand" />}
                Detail Analisis
              </SheetTitle>
              <SheetDescription>
                ID Referensi: <span className="font-mono text-foreground">{selectedItem?.id}</span>
              </SheetDescription>
            </SheetHeader>

            {selectedItem && (
              <ScrollArea className="mt-6 h-[calc(100vh-150px)] pr-4">
                <div className="space-y-6">
                  {/* Target Info */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Target</p>
                    <p className="mt-1 break-all text-sm font-medium text-foreground">{selectedItem.target}</p>
                  </div>

                  {/* User Info */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Dianalisis Oleh</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{selectedItem.user.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedItem.user.email}</p>
                  </div>

                  {/* Risk Score */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Skor Risiko Keseluruhan</span>
                      <RiskBadge level={selectedItem.risk_level} score={selectedItem.risk_score} />
                    </div>
                    {/* Progress bar mock */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div 
                        className={`h-full transition-all ${selectedItem.risk_level === 'high' ? 'bg-destructive' : 'bg-success'}`} 
                        style={{ width: `${selectedItem.risk_score}%` }} 
                      />
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Kesimpulan AI (Gemini)</h4>
                    <div className="rounded-lg border border-brand/20 bg-brand/5 p-4">
                      <p className="text-sm leading-relaxed text-foreground">{selectedItem.ai_summary}</p>
                    </div>
                  </div>

                  {/* Action Buttons in Sheet */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="destructive" className="flex-1">
                      <Ban className="mr-2 size-4" /> Blokir URL/User
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 size-4" /> Unduh Laporan
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}