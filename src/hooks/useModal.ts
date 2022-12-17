import { useState, useCallback } from 'react';

interface ModalHook {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useModal = (initialState = false): ModalHook => {
  const [isOpen, setIsOpen] = useState(initialState);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};
