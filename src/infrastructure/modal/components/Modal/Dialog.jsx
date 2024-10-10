// import {
//   useFloating,
//   useClick,
//   useDismiss,
//   useRole,
//   useInteractions,
//   useMergeRefs,
//   FloatingPortal,
//   FloatingFocusManager,
//   FloatingOverlay,
//   useId,
// } from '@floating-ui/react';
// import { createContext, forwardRef, useContext, useMemo, useState, useEffect } from 'react';

// export function useModal({
//   initialOpen = false,
//   open: controlledOpen,
//   onOpenChange: setControlledOpen,
// } = {}) {
//   const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
//   const [labelId, setLabelId] = useState();
//   const [descriptionId, setDescriptionId] = useState();

//   const open = controlledOpen ?? uncontrolledOpen;
//   const setOpen = setControlledOpen ?? setUncontrolledOpen;

//   const data = useFloating({ open, onOpenChange: setOpen });
//   const context = data.context;

//   const click = useClick(context, { enabled: controlledOpen == null });
//   const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
//   const role = useRole(context);

//   const interactions = useInteractions([click, dismiss, role]);

//   return useMemo(
//     () => ({
//       open,
//       setOpen,
//       ...interactions,
//       ...data,
//       labelId,
//       descriptionId,
//       setLabelId,
//       setDescriptionId,
//     }),
//     [open, setOpen, interactions, data, labelId, descriptionId]
//   );
// }

// export const ModalContext = createContext(null);

// export const useModalContext = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error('Modal components must be wrapped in <ModalProvider />');
//   }
//   return context;
// };

// export const ModalProvider = ({ children, initialOpen = false }) => {
//   const modal = useModal({ initialOpen });
//   return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
// };

// export const ModalTrigger = forwardRef(function ModalTrigger({ children, ...props }, ref) {
//   const { getReferenceProps = () => ({}), open } = useModalContext();
//   const buttonRef = useMergeRefs([ref, props.ref]);

//   return (
//     <button
//       ref={buttonRef}
//       {...getReferenceProps({ ...props, 'data-state': open ? 'open' : 'closed' })}
//     >
//       {children}
//     </button>
//   );
// });

// export const ModalContent = forwardRef(function ModalContent({ children, ...props }, ref) {
//   const { open, getFloatingProps, context } = useModalContext();
//   const floatingRef = useMergeRefs([ref, props.ref]);

//   if (!open) return null;

//   return (
//     <FloatingPortal>
//       <FloatingOverlay lockScroll>
//         <FloatingFocusManager context={context}>
//           <div ref={floatingRef} {...getFloatingProps(props)}>
//             {children}
//           </div>
//         </FloatingFocusManager>
//       </FloatingOverlay>
//     </FloatingPortal>
//   );
// });

// export const ModalClose = forwardRef(function ModalClose(props, ref) {
//   const { setOpen } = useModalContext();
//   return <button ref={ref} {...props} onClick={() => setOpen(false)} />;
// });

// export const ModalHeading = ({ children }) => {
//   const { setLabelId } = useModalContext();
//   const id = useId();

//   useEffect(() => {
//     setLabelId(id);
//     return () => setLabelId(undefined);
//   }, [id, setLabelId]);

//   return <h2 id={id}>{children}</h2>;
// };

// export const ModalDescription = ({ children }) => {
//   const { setDescriptionId } = useModalContext();
//   const id = useId();

//   useEffect(() => {
//     setDescriptionId(id);
//     return () => setDescriptionId(undefined);
//   }, [id, setDescriptionId]);

//   return <p id={id}>{children}</p>;
// };
