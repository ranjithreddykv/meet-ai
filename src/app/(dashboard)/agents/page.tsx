import {
  AgentsViewError,
  AgentView,
} from "@/modules/agents/server/ui/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { AgnetsViewLoading } from "../../../modules/agents/server/ui/agents-view";
import { ErrorBoundary } from "react-error-boundary";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  
  
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgnetsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
