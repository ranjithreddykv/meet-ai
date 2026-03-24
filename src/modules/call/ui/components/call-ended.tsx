"use client";
import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generatedAvatarUri } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const DisabledVideoPreview = () => {
  const { data } = useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generatedAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your borwser a permission to access you camera and
      microphone.
    </p>
  );
};

export const CallEnded = () => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="text-gray-800 flex flex-col gap-y-2 text-center ">
            <h6 className="text-lg font-medium">You have ended the call</h6>
            <p className="text-sm">Summary will appear in a few minutes</p>
          </div>

          <Button asChild>
            <Link href="/meetings">Back to Meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
