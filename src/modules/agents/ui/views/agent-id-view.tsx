"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from '../components/update-agent-dialogue';
interface Props{
    agentId:string;
}

export const AgentIdView = ({agentId}:Props)=>{

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateAgentDailogOpen , setUpdateAgentDialogOpen] = useState(false);
    const {data} = useSuspenseQuery(trpc.agents.getOne.queryOptions({id:agentId}));


    const removeAgent = useMutation(
      trpc.agents.remove.mutationOptions({
        onSuccess:async ()=>{
          await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
          //TODO: Invlaid free tier usage
          router.push("/agents")
        },
        onError:(error)=>{
          toast.error(error.message)
        }
      })
    )
    const [RemoveConfirmation , confirmRemove] = useConfirm("Are you sure?" ,
      `The following action will remove ${data.meetingCount} associated meetings` 
    );

    const handleRemoveAgent = async ()=>{
      const ok = await confirmRemove();
      if(!ok) return;

      await removeAgent.mutateAsync({id:agentId})
    }
   return (
     <>
       <RemoveConfirmation />
       <UpdateAgentDialog
         open={updateAgentDailogOpen}
         onOpenChange={setUpdateAgentDialogOpen}
         initialValues={data}
       />
       <div className="flex-1 py-6 px-4 md:px-10 flex flex-col gap-6">
         <AgentIdViewHeader
           agentId={agentId}
           agentName={data.name}
           onEdit={() => setUpdateAgentDialogOpen(true)}
           onRemove={handleRemoveAgent}
         />

         <div className="bg-white border rounded-xl p-6 shadow-sm">
           {/* Top Section */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <GeneratedAvatar
                 variant="botttsNeutral"
                 seed={data.name}
                 className="size-12"
               />
               <div className="flex flex-col">
                 <h2 className="text-2xl font-semibold tracking-tight">
                   {data.name}
                 </h2>
               </div>
             </div>

             <Badge
               variant="outline"
               className="text-blue-700 flex items-center gap-2 [&>svg]:size-4"
             >
               <VideoIcon />
               {data.meetingCount}{" "}
               {data.meetingCount === 1 ? "meeting" : "meetings"}
             </Badge>
           </div>

           {/* Divider */}
           <div className="my-6 border-t" />

           {/* Instructions Section */}
           <div className="flex flex-col gap-3">
             <p className="text-base font-semibold">Instructions</p>
             <p className="text-neutral-800 leading-relaxed">
               {data.instructions}
             </p>
           </div>
         </div>
       </div>
     </>
   );
}

export const AgnetIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take few seconds..."
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Somthing went wrong"
    />
  );
};
