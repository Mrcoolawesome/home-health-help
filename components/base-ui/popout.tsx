import { Popover } from "@base-ui-components/react";
import React from "react";

interface popoutProps {
  description: string,
  children: React.ReactNode,
}

export default function Popout({ description, children }: popoutProps){
  return (
    <Popover.Root openOnHover={true}>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup className="origin-[var(--transform-origin)] max-w-[500px] rounded-lg bg-background px-4 py-2 text-foreground outline outline-2 shadow-sm outline-foreground-alt transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Popover.Description>{description}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}