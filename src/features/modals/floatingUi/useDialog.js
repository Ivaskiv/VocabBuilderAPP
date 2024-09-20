//UseDialog.js
import { useClick, useDismiss, useInteractions, useRole } from '@floating-ui/react';
import { useFloating } from '@floating-ui/react-dom';
import { useMemo, useState } from 'react';

export function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({ open, onOpenChange: setOpen });
  const context = data.context;

  const click = useClick(context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

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
