import { create } from "zustand";

interface AddModalState {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void,
}

export const useModalStore = create<AddModalState>()(set => ({
    isOpen: false,
    openModal: () => set({ isOpen: true, }),
    closeModal: () => set({ isOpen: false, }),
}))
