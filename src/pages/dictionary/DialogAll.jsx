// import {
//   useFloating,
//   FloatingFocusManager,
//   FloatingOverlay,
//   FloatingPortal,
//   useClick,
//   useDismiss,
//   useInteractions,
//   useRole,
//   useId,
// } from '@floating-ui/react';
// import { useState } from 'react';
// import styles from './styles.module.css';

// export default function DialogAll() {
//   const [isOpen, setIsOpen] = useState(false);

//   const { refs, context } = useFloating({
//     open: isOpen,
//     onOpenChange: setIsOpen,
//   });

//   const click = useClick(context);
//   const role = useRole(context);
//   const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

//   const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

//   const headingId = useId();
//   const descriptionId = useId();

//   return (
//     <>
//       <button ref={refs.setReference} {...getReferenceProps()}>
//         Delete balloon All
//       </button>
//       <FloatingPortal>
//         {isOpen && (
//           <FloatingOverlay className={styles.dialog_overlay} lockScroll>
//             <FloatingFocusManager context={context}>
//               <div
//                 className={styles.dialog}
//                 ref={refs.setFloating}
//                 aria-labelledby={headingId}
//                 aria-describedby={descriptionId}
//                 {...getFloatingProps()}
//               >
//                 <h2 id={headingId}>Delete balloon</h2>
//                 <p id={descriptionId}>This action cannot be undone.</p>
//                 <button
//                   onClick={() => {
//                     console.log('Deleted.');
//                     setIsOpen(false);
//                   }}
//                 >
//                   Confirm
//                 </button>
//                 <button onClick={() => setIsOpen(false)}>Cancel</button>
//               </div>
//             </FloatingFocusManager>
//           </FloatingOverlay>
//         )}
//       </FloatingPortal>
//     </>
//   );
// }
