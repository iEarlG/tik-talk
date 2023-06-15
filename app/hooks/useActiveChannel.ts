import { useEffect, useState } from "react";
import { Channel, Members } from "pusher-js";

import { pusherClient } from "../libs/pusher";

import useActiveList from "./useActiveList";


const useActiveChannel = () => { 
    const { set, add, removed } = useActiveList();
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
      let channel = activeChannel;

      if (!channel) { 
        channel = pusherClient.subscribe("presence-online");
        setActiveChannel(channel);
      }

      channel.bind("pusher:subscription_succeeded", (members: Members) => {
        const intialMembers: string[] = [];

        members.each((member: Record<string, any>) => intialMembers.push(member.id));
        set(intialMembers);
      });

      channel.bind("pusher:member_added", (member: Record<string, any>) => {
        add(member.id);
      });

      channel.bind("pusher:member_removed", (member: Record<string, any>) => {
        removed(member.id);
      });

      return () => {
        if (activeChannel) {
            pusherClient.unsubscribe("presence-online");
            setActiveChannel(null);
        }
      }

    }, [activeChannel, set, add, removed]);
    
};

export default useActiveChannel;