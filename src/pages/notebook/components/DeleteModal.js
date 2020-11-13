import React from 'react';

import { Modal } from '../../../components/Modal';

export const DeleteModal = ({ onDelete, userData = {}, onCloseModal, isOpen }) => (
    <Modal
        className="deleteContent"
        title="Excluir contato"
        isOpen={isOpen} 
        testId="delete-modal"
        onCancel={onCloseModal}
        onSubmit={() => onDelete(userData)}
        onSubmitText="Excluir"
        canSubmit
    >
        <p>Deseja realmente excluir o contato {userData.name} ?</p>
    </Modal>
        
)