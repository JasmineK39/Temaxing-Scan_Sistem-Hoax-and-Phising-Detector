import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ShieldCheck, ShieldAlert, Info } from "lucide-react";

interface AnalysisDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any; // Ganti dengan tipe data DTO Anda
}

export function AnalysisDetailSheet({ open, onOpenChange, data }: AnalysisDetailSheetProps) {
  if (!data) return null;

  const isDangerous = data.risk_score >= 70;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {isDangerous ? <ShieldAlert className="text-destructive" /> : <ShieldCheck className="text-success" />}
            Detail Analisis
          </SheetTitle>
          <SheetDescription>
            Informasi mendalam mengenai hasil pemindaian.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Target Info */}
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase">Target</p>
            <p className="mt-1 break-all text-sm font-medium text-foreground">{data.url || data.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">Dianalisis oleh: {data.user_email}</p>
          </div>

          {/* Risk Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Skor Risiko</span>
              <span className={`text-sm font-bold ${isDangerous ? 'text-destructive' : 'text-success'}`}>
                {data.risk_score}/100
              </span>
            </div>
            <Progress value={data.risk_score} className={isDangerous ? "[&>div]:bg-destructive" : "[&>div]:bg-success"} />
          </div>

          {/* AI Explanation */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Penjelasan AI ({data.ai_model})</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.ai_explanation}
            </p>
          </div>

          {/* Provider Results (Using HoverCard) */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Hasil Provider Keamanan</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(data.provider_results || {}).map(([key, value]: [string, any]) => (
                <HoverCard key={key}>
                  <HoverCardTrigger asChild>
                    <div className="flex cursor-help items-center justify-between rounded-md border border-border bg-surface p-3 text-sm">
                      <span className="capitalize">{key.replace('_', ' ')}</span>
                      <Info className="size-4 text-muted-foreground" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{key.replace('_', ' ')}</h4>
                      <p className="text-xs text-muted-foreground">
                        {JSON.stringify(value, null, 2)}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}