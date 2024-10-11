'use client'

import { useModalStore } from "@/stores/modal-store"
import { CreateWalletForm } from "../dashboard/create-wallet-form"
import { Modal } from "@/components/ui/modal"

export function ModalManager() {
    const { isOpen, type, props, closeModal } = useModalStore()

    let ModalContent: React.ComponentType<any> | null = null
    let title = ''

    switch (type) {
        case 'createWallet':
            ModalContent = CreateWalletForm
            title = 'Create New Wallet'
            break
        // case 'confirmDelete':
        //     ModalContent = ConfirmDeleteForm
        //     title = 'Confirm Delete'
        //     break
    }

    if (!ModalContent) return null

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={closeModal}
            title={title}
        >
            <ModalContent {...props} onClose={closeModal} />
        </Modal>
    )
}