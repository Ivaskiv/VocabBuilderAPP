import { usePopoverContext } from './usePopoverContext';

export function ArrowTooltip({ arrowRef }) {
  const { context } = usePopoverContext();
  const { middlewareData } = context;
  const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

  const staticSide =
    {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[context.placement.split('-')[0]] || '';

  return (
    <div
      ref={arrowRef}
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: 'inherit',
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [staticSide]: '-5px',
        transform: 'rotate(45deg)',
      }}
    />
  );
}
