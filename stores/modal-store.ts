// stores/modalStore.ts
import { create } from 'zustand'

type ModalType = 'createWallet' | 'confirmDelete' | 'editWallet'

interface ModalState {
    isOpen: boolean
    type: ModalType | null
    props: Record<string, any>
    openModal: (type: ModalType, props?: Record<string, any>) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    type: null,
    props: {},
    openModal: (type, props = {}) => set({ isOpen: true, type, props }),
    closeModal: () => set({ isOpen: false, type: null, props: {} }),
}))