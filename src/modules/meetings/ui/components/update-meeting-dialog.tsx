import { ResponsiveDialog } from "@/components/responsive-dialog"
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";

interface NewMeetingDialogProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void
    initialValues:MeetingGetOne
}

export const UpdateMeetingDialog = ({open , onOpenChange , initialValues}:NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog title="Edit Meeting" description="Edit a  meeting" open={open} onOpenChange={onOpenChange}>
      <MeetingForm onSuccess={(id)=>{
        onOpenChange(false);

      }}
      onCancel={()=>onOpenChange(false)}
      initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}

