import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { useMemo, useState } from 'react';

export function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();

  const data = useFloating({ open, onOpenChange: setOpen });

  const dismiss = useDismiss(data.context, { outsidePressEvent: 'mousedown' });
  const role = useRole(data.context);
  const click = useClick(data.context, { enabled: controlledOpen == null });

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  );
}
