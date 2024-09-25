import { createContext, useState } from 'react';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
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
};

export default DialogContext;
