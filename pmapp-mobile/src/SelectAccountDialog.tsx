// アカウントを選択するモーダルダイアログ
import React, { useState } from 'react';
import { Listbox } from './listbox';
import { Caption } from './caption';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: string[];
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, accounts }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
        <Caption caption="アカウントを選択" />
        <Listbox items={accounts} />
        <button onClick={onClose}>閉じる</button>
    </div>
  );
};

interface SelectAccountDialogProps {
  accounts: string[];
}

const SelectAccountDialog: React.FC<SelectAccountDialogProps> = ({ accounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>アカウントを選択</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} accounts={accounts}>
        <p>ここにアカウント選択の内容を追加します。</p>
      </Modal>
    </div>
  );
};

export default SelectAccountDialog;