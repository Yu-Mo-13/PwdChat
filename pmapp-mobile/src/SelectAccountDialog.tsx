// アカウントを選択するモーダルダイアログ
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div>
        {children}
      </div>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

const SelectAccountDialog: React.FC = () => {
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p>ここにアカウント選択の内容を追加します。</p>
      </Modal>
    </div>
  );
};

export default SelectAccountDialog;