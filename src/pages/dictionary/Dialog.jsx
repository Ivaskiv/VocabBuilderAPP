// // DialogTrigger.jsx
// import { useFloating, useInteractions, useClick } from '@floating-ui/react';
// import { useModalContext } from './useModalContext';
// import { useId } from '@floating-ui/react';

// export default function Dialog() {
//   const { openModal, closeModal } = useModalContext();
//   const { refs, context } = useFloating({
//     open: false,
//     onOpenChange: () => {},
//   });

//   const click = useClick(context);
//   const { getReferenceProps } = useInteractions([click]);

//   const headingId = useId();
//   const descriptionId = useId();

//   const handleOpen = () => {
//     openModal(
//       <>
//         <h2 id={headingId}>Delete balloon</h2>
//         <p id={descriptionId}>This action cannot be undone.</p>
//         <button
//           onClick={() => {
//             console.log('Deleted.');
//             closeModal();
//           }}
//         >
//           Confirm
//         </button>
//         <button onClick={() => closeModal()}>Cancel</button>
//       </>
//     );
//   };

//   return (
//     <button ref={refs.setReference} {...getReferenceProps()} onClick={handleOpen}>
//       Delete balloon All
//     </button>
//   );
// }
