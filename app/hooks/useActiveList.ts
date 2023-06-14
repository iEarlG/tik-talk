import { create } from "zustand";

interface ActiveListStore { 
    members: string[];
    set: (ids: string[]) => void;
    add: (id: string) => void;
    removed: (id: string) => void;
};

const useActiveList = create<ActiveListStore>((set) => ({
    members: [],
    set: (ids) => set({ members: ids }),
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    removed: (id) => set((state) => ({ members: state.members.filter((memberId)=> memberId !== id) }))
}));

export default useActiveList;