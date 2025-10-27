import { EnrichedProviderMeasure } from "@/lib/types";
import { Meter } from "@base-ui-components/react";
import { Popover } from "@base-ui-components/react";
import { InfoCircle } from "iconoir-react";

interface StatisticProps {
  measure: EnrichedProviderMeasure,
  compare?: "stateAverage" | "nationalAverage"
}

function Popout({ description }: {description: string}){
  return (
    <Popover.Root openOnHover={true}>
      <Popover.Trigger>
        <InfoCircle color="grey" height={15}/>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-lg bg-background px-4 py-2 text-foreground outline outline-2 shadow-sm outline-foreground-alt transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Popover.Description>{description}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default function Statistic({ measure, compare } : StatisticProps) {
  // Parse the score to get percentage value
  const percentage = parseFloat(measure.score);
  let compPercentage: number | undefined;
  let diff: number | undefined;

  if (compare && measure.nationalAverage && compare === "nationalAverage"){
    compPercentage = parseFloat(measure.nationalAverage);
    diff = parseFloat((percentage - compPercentage).toFixed(1));
  }
  else if (compare && measure.stateAverage && compare === "stateAverage"){
    compPercentage = parseFloat(measure.stateAverage);
    diff = parseFloat((percentage - compPercentage).toFixed(1));
  }
  
  return (
    <Meter.Root value={percentage}>
      <div className="flex">
        <Meter.Label id={measure.measureCode} className="">{measure.measureName ? measure.measureName : measure.measureCode}</Meter.Label>
        <Popout description={measure.measureCode}/>
        <Meter.Value className="flex-1 text-right"/>
        {compPercentage && diff !== undefined &&
          (diff >= 0 ?
            <span className="text-foreground-alt">(+{diff}%)</span> :
            <span className="text-foreground-alt">({diff}%)</span>
          )
        }
      </div>
      <Meter.Track className="bg-foreground-alt h-2 rounded-full">
        {diff && diff < 0 ?
          <Meter.Indicator className="bg-yellow-300 rounded-full"/> :
          <Meter.Indicator className="bg-green-400 rounded-full"/>
        }
      </Meter.Track>
      {compPercentage &&
        <p className="text-foreground-alt">{compare}: {compPercentage}%</p>
      }
    </Meter.Root>
  )
}