"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../hooks/use-agents-filter";
import { DataPagination } from "./components/data-pagination";
export function AgentView() {
  const trpc = useTRPC();
  const [filters ,setFilters] = useAgentsFilters();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data.items} />
        {data.items.length === 0 && (
          <EmptyState
            title="Create your first agent"
            description="Create an agent to join your meeting , Each agent will follow your instructions and can interact with participants during call"
          />
        )}
      </div>
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page: number) => setFilters({ page })}
      />
    </div>
  );
}

export const AgnetsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take few seconds..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Somthing went wrong"
    />
  );
};
