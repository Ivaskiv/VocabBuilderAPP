import { useClick, useDismiss, useInteractions, useRole, useFloating } from '@floating-ui/react';
import { useMemo, useState } from 'react';

export default function usePopover({ middleware = [], placement = 'bottom' }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const floatingData = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware,
    placement,
  });

  const { refs, floatingStyles, context } = floatingData;

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
      refs,
      floatingStyles,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      context,
    }),
    [isPopoverOpen, refs, floatingStyles, interactions]
  );
}
