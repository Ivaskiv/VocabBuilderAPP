//popover.jsx

import usePopover from './usePopover';
import { PopoverProvider } from './usePopoverContext';

export default function Popover({
  children,
  middleware,
  placement,
  modal = false,
  hoverEnabled = false,
  clickEnabled = true,
  ...restOptions
}) {
  const popover = usePopover({
    modal,
    middleware,
    hoverEnabled,
    clickEnabled,
    placement,
    ...restOptions,
  });
  return <PopoverProvider value={popover}>{children}</PopoverProvider>;
}
