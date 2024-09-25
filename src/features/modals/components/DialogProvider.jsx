import { useState } from 'react';
import DialogContext from './DialogContext';

export default function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const openModal = newContent => {
    setOpen(true);
    setContent(newContent);
  };

  const closeModal = () => setOpen(false);
  return (
    <DialogContext.Provider value={{ open, content, setOpen, openModal, closeModal }}>
      {children}
    </DialogContext.Provider>
  );
}
