import StatCard from "@/components/dashboard/StatCard";
import OverallSalesCard from "@/components/dashboard/OverallSalesCard";
import RegionalSalesCard from "@/components/dashboard/RegionalSalesCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Sales"
          value="2,420"
          delta="+40%"
          deltaTone="up"
          series={[10, 12, 11, 16, 14, 18, 17, 22, 20, 24, 23, 25]}
        />
        <StatCard
          title="Total Orders"
          value="1,315"
          delta="-20%"
          deltaTone="down"
          series={[22, 21, 20, 19, 18, 19, 17, 16, 15, 14, 14, 13]}
        />
        <StatCard
          title="Store Sessions"
          value="120"
          delta="+10%"
          deltaTone="up"
          series={[6, 7, 7, 8, 9, 10, 9, 11, 12, 12, 13, 14]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <OverallSalesCard />
        </div>
        <div className="lg:col-span-2">
          <RegionalSalesCard />
        </div>
      </div>
    </div>
  );
}
