import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { ScanTable } from "@/components/history/scan-table";
import { scanHistory } from "@/data/dashboard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 6;

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    let filtered = scanHistory.filter(
      (item) =>
        (type === "all" || item.type === type) &&
        (item.target.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase()))
    );

    switch (sort) {
      case "highest":
        filtered.sort((a, b) => b.score - a.score);
        break;

      case "lowest":
        filtered.sort((a, b) => a.score - b.score);
        break;

      default:
        break;
    }

    return filtered;
  }, [query, type, sort]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const visibleRows = rows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            All Scans
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} results · Every analysis you have run using
            Temaxing Scan.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-4 shadow-soft md:flex-row md:items-center">

          <div className="relative flex-1">

            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search scan history..."
              className="h-11 w-full rounded-xl border border-border bg-muted/50 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-secondary/50 focus:bg-surface focus:ring-4 focus:ring-secondary/10"
            />

          </div>

          <Select
            value={type}
            onValueChange={(value) => {
              setType(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-11 w-full rounded-xl md:w-[180px]">
              <SelectValue placeholder="Filter Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Phishing">
                Phishing
              </SelectItem>
              <SelectItem value="Fake News">
                Fake News
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => setSort(value)}
          >
            <SelectTrigger className="h-11 w-full rounded-xl md:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="recent">
                Most Recent
              </SelectItem>

              <SelectItem value="highest">
                Highest Risk
              </SelectItem>

              <SelectItem value="lowest">
                Lowest Risk
              </SelectItem>
            </SelectContent>
          </Select>

        </div>
                <ScanTable rows={visibleRows} targetLabel="Input" />

        <div className="flex items-center justify-between">

          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                setPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={
                    pageNumber === currentPage
                      ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium"
                      : "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  }
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() =>
                setPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>

        </div>

      </div>
    </>
  );
}