"use client";

import { useRef, useState } from "react";
// Import StreamCall - this is the missing piece!
import { StreamTheme, useCall, StreamCall, CallingState } from "@stream-io/video-react-sdk";
import { CallLoby } from "./call-loby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const isJoining = useRef(false);

  const handleJoin = async () => {
    if (!call) {
      console.error("Call object is not initialized yet.");
      return;
    }
    if (isJoining.current) return;

    isJoining.current = true;
    try {
      // It's safer to use getOrCreate here if you aren't sure it exists
      await call.getOrCreate();
      await call.join();
      setShow("call");
    } catch (err) {
      console.error("Join failed:", err);
    } finally {
      isJoining.current = false;
    }
  };

  const handleLeave = async () => {
    if (!call) return;
    try {
      if(call.state.callingState !== CallingState.LEFT){
      await call.leave();
      }
      setShow("ended");
    } catch (err) {
      console.error("Leave failed:", err);
    }
  };

  // Important: components using useCall hooks must be children of StreamCall
  return (
    <StreamTheme className="h-screen">
      {/* We wrap everything in StreamCall so hooks inside children work */}
      
        {show === "lobby" && <CallLoby onJoin={handleJoin} />}
        {show === "call" && (
          <CallActive onLeave={handleLeave} meetingName={meetingName} />
        )}
        {show === "ended" && <p className="text-white"><CallEnded/></p>}
    </StreamTheme>
  );
};
