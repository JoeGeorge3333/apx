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
import { Badge } from "@/components/ui/badge";
import { useListElectricalFaultsSuspense } from "@/lib/api";
import selector from "@/lib/selector";

export const Route = createFileRoute("/_sidebar/electrical-faults")({
  component: () => <ElectricalFaults />,
});

function ElectricalFaultsContent() {
  const { data: rows } = useListElectricalFaultsSuspense({
    params: { limit: 100 },
    ...selector(),
  });

  const faultLabel = (g?: number, a?: number, b?: number, c?: number) => {
    const parts: string[] = [];
    if (g) parts.push("G");
    if (a) parts.push("A");
    if (b) parts.push("B");
    if (c) parts.push("C");
    return parts.length ? parts.join(",") : "—";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Electrical Fault Validation</h1>
        <CardDescription>
          Ground (G) and phase (A, B, C) fault indicators with voltage and current
          measurements
        </CardDescription>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample faults</CardTitle>
          <CardDescription>
            Showing up to 100 rows. G=ground, A/B/C=phase faults.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Fault</th>
                  <th className="px-4 py-2 text-left font-medium">Ia</th>
                  <th className="px-4 py-2 text-left font-medium">Ib</th>
                  <th className="px-4 py-2 text-left font-medium">Ic</th>
                  <th className="px-4 py-2 text-left font-medium">Va</th>
                  <th className="px-4 py-2 text-left font-medium">Vb</th>
                  <th className="px-4 py-2 text-left font-medium">Vc</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">
                      {faultLabel(r.g ?? 0, r.a ?? 0, r.b ?? 0, r.c ?? 0) !== "—" ? (
                        <Badge variant="destructive" className="text-xs">
                          {faultLabel(r.g ?? 0, r.a ?? 0, r.b ?? 0, r.c ?? 0)}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2">{r.ia ?? "—"}</td>
                    <td className="px-4 py-2">{r.ib ?? "—"}</td>
                    <td className="px-4 py-2">{r.ic ?? "—"}</td>
                    <td className="px-4 py-2">{r.va ?? "—"}</td>
                    <td className="px-4 py-2">{r.vb ?? "—"}</td>
                    <td className="px-4 py-2">{r.vc ?? "—"}</td>
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

function ElectricalFaults() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Failed to load electrical fault data
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
            <ElectricalFaultsContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
