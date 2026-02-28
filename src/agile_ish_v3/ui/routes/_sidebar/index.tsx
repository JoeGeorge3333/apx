import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Zap,
  AlertTriangle,
  User,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPredictiveMaintenanceSummarySuspense } from "@/lib/api";
import selector from "@/lib/selector";

export const Route = createFileRoute("/_sidebar/")({
  component: () => <Index />,
});

function DashboardContent() {
  const { data: summary } = useGetPredictiveMaintenanceSummarySuspense(selector());

  const cards = [
    {
      to: "/nasa-equipment",
      title: "NASA Equipment Degradation",
      description: "Sensor measurements & remaining useful life",
      icon: Activity,
      stat: `${summary.nasa_unique_units} units`,
      sub: `${summary.nasa_row_count.toLocaleString()} rows`,
    },
    {
      to: "/transformer-readings",
      title: "Transformer Monitoring",
      description: "Temperature, voltage & current readings",
      icon: Zap,
      stat: `${summary.transformer_row_count.toLocaleString()} readings`,
      sub: "June 2019 – May 2020",
    },
    {
      to: "/electrical-faults",
      title: "Electrical Fault Detection",
      description: "Phase fault indicators & measurements",
      icon: AlertTriangle,
      stat: `${summary.electrical_fault_row_count.toLocaleString()} records`,
      sub: `${summary.ground_fault_count} ground, ${summary.a_phase_fault_count} A-phase faults`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Predictive Maintenance</h1>
        <p className="text-muted-foreground mt-1">
          Equipment degradation, transformer monitoring & electrical fault detection
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ to, title, description, icon: Icon, stat, sub }) => (
          <Link key={to} to={to}>
            <Card className="h-full transition-colors hover:bg-accent/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-2">{description}</CardDescription>
                <p className="text-2xl font-bold">{stat}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
                <ChevronRight className="mt-2 h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-64" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Failed to load dashboard
                </CardTitle>
                <CardDescription>
                  Ensure DATABRICKS_SQL_WAREHOUSE_ID is set and the Unity Catalog
                  tables exist. Check app logs for details.
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
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
