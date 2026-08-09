import { useState } from "react";
import { 
  Users, ShieldCheck, ShieldAlert, Activity, 
  MoreHorizontal, Eye, Download 
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; // Asumsi Anda punya badge, atau pakai span tailwind

// Mock Data (Nanti diganti dengan fetch dari backend)
const chartData = [
  { date: "Sen", safe: 120, threat: 15 },
  { date: "Sel", safe: 132, threat: 22 },
  { date: "Rab", safe: 101, threat: 18 },
  { date: "Kam", safe: 154, threat: 35 },
  { date: "Jum", safe: 180, threat: 28 },
  { date: "Sab", safe: 140, threat: 12 },
  { date: "Min", safe: 160, threat: 20 },
];

const recentAnalyses = [
  { id: 1, type: "URL", target: "http://suspicious-login.com", user: "john@example.com", risk: "high", date: "2 menit lalu" },
  { id: 2, type: "NEWS", target: "Berita Viral: Pemerintah...", user: "jane@example.com", risk: "medium", date: "15 menit lalu" },
  { id: 3, type: "URL", target: "https://google.com", user: "admin@temaxing.com", risk: "safe", date: "1 jam lalu" },
];

const chartConfig = {
  safe: { label: "Aman", color: "var(--color-success)" },
  threat: { label: "Ancaman", color: "var(--color-destructive)" },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground">Pantau statistik dan aktivitas analisis sistem.</p>
        </div>
        <Button variant="brand" size="sm">
          <Download className="mr-2 size-4" /> Export Laporan
        </Button>
      </div>

      {/* 1. Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Pengguna" value="1,234" trend="+12%" up={true} icon={Users} tone="primary" />
        <StatCard label="Total Analisis" value="45,678" trend="+8%" up={true} icon={Activity} tone="primary" />
        <StatCard label="Ancaman Terdeteksi" value="342" trend="+5%" up={false} icon={ShieldAlert} tone="high" />
        <StatCard label="Tingkat Keamanan" value="98.5%" trend="+1.2%" up={true} icon={ShieldCheck} tone="safe" />
      </div>

      {/* 2. Chart & Recent Activity */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Tren Analisis (7 Hari Terakhir)</CardTitle>
            <CardDescription>Perbandingan antara URL/Berita aman dan berbahaya.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={chartData}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="safe" stackId="1" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.2} />
                <Area type="monotone" dataKey="threat" stackId="1" stroke="var(--color-destructive)" fill="var(--color-destructive)" fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Threats List */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Ancaman Terbaru</CardTitle>
            <CardDescription>Membutuhkan perhatian segera.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnalyses.filter(a => a.risk !== 'safe').map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{item.target}</p>
                  <p className="text-xs text-muted-foreground">{item.user} • {item.date}</p>
                </div>
                <Badge variant={item.risk === 'high' ? 'destructive' : 'default'} className="capitalize">
                  {item.risk}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 3. Recent Analyses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Analisis Terbaru</CardTitle>
          <CardDescription>Daftar 10 analisis terakhir yang dilakukan oleh pengguna.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipe</TableHead>
                <TableHead>Target (URL/Judul)</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Tingkat Risiko</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAnalyses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{row.target}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.risk === 'high' ? 'bg-destructive/10 text-destructive' : 
                      row.risk === 'medium' ? 'bg-warning/10 text-warning' : 
                      'bg-success/10 text-success'
                    }`}>
                      {row.risk.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" /> Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <ShieldAlert className="mr-2 size-4" /> Blokir URL
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}