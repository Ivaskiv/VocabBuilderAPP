import { usePopover } from '../floatingUi';
import { PopoverContext } from '../repository';

export default function PopoverProvider({ children, modal = false, ...restOptions }) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
}
