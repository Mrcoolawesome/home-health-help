import { EnrichedProviderMeasure } from "@/lib/types";
import { Meter } from "@base-ui-components/react";
import { Popover } from "@base-ui-components/react";
import { InfoCircle } from "iconoir-react";

function Popout({ description }: {description: string}){
  return (
    <Popover.Root openOnHover={true}>
      <Popover.Trigger>
        <InfoCircle color="grey" height={15}/>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup className="origin-[var(--transform-origin)] border-gray-400 bg-white text-black">
            <Popover.Description>{description}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default function Statistic({ measure } : { measure: EnrichedProviderMeasure }) {
  // Parse the score to get percentage value
  const percentage = parseFloat(measure.score);
  
  return (
    <Meter.Root value={percentage}>
      <div className="flex">
        <Meter.Label id={measure.measureCode} className="">{measure.measureName ? measure.measureName : measure.measureCode}</Meter.Label>
        <Popout description={measure.measureCode}/>
        <Meter.Value className="flex-1 text-right"/>
      </div>
      <Meter.Track className="bg-gray-400 h-2 rounded-full">
        <Meter.Indicator className="bg-green-400 rounded-full"/>
      </Meter.Track>
    </Meter.Root>
  )
}