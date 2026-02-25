"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";



export function AgentView() {
  const trpc = useTRPC();
  const { data} = useSuspenseQuery(
    trpc.agents.getMany.queryOptions(),
  );


  return <div>{JSON.stringify(data, null, 2)}</div>;
}


export const AgnetsViewLoading = ()=>{
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take few seconds..."
      />
    );
}

export const AgentsViewError = ()=>{
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Somthing went wrong"
    />
  );
}