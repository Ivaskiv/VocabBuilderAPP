// import {
//   FloatingFocusManager,
//   FloatingOverlay,
//   FloatingPortal,
//   useDismiss,
//   useInteractions,
//   useFloating,
// } from '@floating-ui/react';
// import { useModalContext } from './useModalContext';
// import styles from './styles.module.css';

// export function Modal() {
//   const { isOpen, closeModal, modalContent } = useModalContext();
//   const { refs, context } = useFloating({ open: isOpen, onOpenChange: closeModal });
//   const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
//   const { getFloatingProps } = useInteractions([dismiss]);

//   if (!isOpen) return null;

//   return (
//     <FloatingPortal>
//       <FloatingOverlay className={styles.dialog_overlay} lockScroll>
//         <FloatingFocusManager context={context}>
//           <div ref={refs.setFloating} className={styles.dialog} {...getFloatingProps()}>
//             {modalContent}
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </FloatingFocusManager>
//       </FloatingOverlay>
//     </FloatingPortal>
//   );
// }
