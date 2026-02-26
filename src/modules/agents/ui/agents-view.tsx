"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns} from "@/modules/agents/ui/components/columns";
import { EmptyState } from "@/components/empty-state";

export function AgentView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  const mockData = getData();
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data } />
        {data.length === 0 && (<EmptyState
        title="Create your first agent"
        description="Create an agent to join your meeting , Each agent will follow your instructions and can interact with participants during call"
        />)}
      </div>
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

function getData(): Payment[] {
  return [
    { id: "2343", amount: 100, status: "pending", email: "jat@gmail.com" },
    { id: "2343", amount: 100, status: "pending", email: "jat@gmail.com" },
    { id: "2343", amount: 100, status: "pending", email: "jat@gmail.com" },
  ];
}
