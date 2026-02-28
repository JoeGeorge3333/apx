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
import { useListNasaEquipmentSuspense } from "@/lib/api";
import selector from "@/lib/selector";

export const Route = createFileRoute("/_sidebar/nasa-equipment")({
  component: () => <NasaEquipment />,
});

function NasaEquipmentContent() {
  const { data: rows } = useListNasaEquipmentSuspense({
    params: { limit: 100 },
    ...selector(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">NASA Equipment Degradation</h1>
        <CardDescription>
          Sensor measurements and remaining useful life (RUL) across 709 equipment units
        </CardDescription>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample data</CardTitle>
          <CardDescription>
            Showing up to 100 rows. Columns: id, cycle, operational settings, sensor
            measurements, remaining useful life.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">ID</th>
                  <th className="px-4 py-2 text-left font-medium">Cycle</th>
                  <th className="px-4 py-2 text-left font-medium">RUL</th>
                  <th className="px-4 py-2 text-left font-medium">OpSet1</th>
                  <th className="px-4 py-2 text-left font-medium">Sensor1</th>
                  <th className="px-4 py-2 text-left font-medium">Sensor2</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{r.id}</td>
                    <td className="px-4 py-2">{r.cycle}</td>
                    <td className="px-4 py-2 font-medium">{r.remaining_useful_life}</td>
                    <td className="px-4 py-2">{r.op_set1 ?? "—"}</td>
                    <td className="px-4 py-2">{r.sensor_measure1 ?? "—"}</td>
                    <td className="px-4 py-2">{r.sensor_measure2 ?? "—"}</td>
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

function NasaEquipment() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Failed to load NASA equipment data
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
            <NasaEquipmentContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
