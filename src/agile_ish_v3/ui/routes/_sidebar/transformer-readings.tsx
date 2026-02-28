import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListTransformerReadingsSuspense } from "@/lib/api";
import selector from "@/lib/selector";

export const Route = createFileRoute("/_sidebar/transformer-readings")({
  component: () => <TransformerReadings />,
});

function TransformerReadingsContent() {
  const { data: rows } = useListTransformerReadingsSuspense({
    params: { limit: 100 },
    ...selector(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transformer Validation Data</h1>
        <CardDescription>
          Oil temperature (OTI), winding temperature (WTI), ambient temperature (ATI),
          voltages and currents
        </CardDescription>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample readings</CardTitle>
          <CardDescription>
            Showing up to 100 rows. June 2019 – May 2020.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Timestamp</th>
                  <th className="px-4 py-2 text-left font-medium">OTI</th>
                  <th className="px-4 py-2 text-left font-medium">WTI</th>
                  <th className="px-4 py-2 text-left font-medium">ATI</th>
                  <th className="px-4 py-2 text-left font-medium">VL1</th>
                  <th className="px-4 py-2 text-left font-medium">IL1</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">
                      {r.device_time_stamp
                        ? new Date(r.device_time_stamp).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2">{r.oti ?? "—"}</td>
                    <td className="px-4 py-2">{r.wti ?? "—"}</td>
                    <td className="px-4 py-2">{r.ati ?? "—"}</td>
                    <td className="px-4 py-2">{r.vl1 ?? "—"}</td>
                    <td className="px-4 py-2">{r.il1 ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {rows.length} rows loaded
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function TransformerReadings() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Failed to load transformer data
                </CardTitle>
                <CardDescription>
                  Check that the Unity Catalog table exists and DATABRICKS_SQL_WAREHOUSE_ID
                  is set.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={resetErrorBoundary}>
                  Try again
                </Button>
              </CardContent>
            </Card>
          )}
        >
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-64 w-full" />
              </div>
            }
          >
            <TransformerReadingsContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
