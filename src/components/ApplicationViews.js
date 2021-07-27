//import { R6Planner } from "./r6Planner"
import { MapProvider  } from "./providers/mapProvider"
import { StrategyProvider } from "./providers/stratProvider"
import { StratForm } from "./strat/stratForm"

export const ApplicationViews = () => {
    return(
        <>
        <StrategyProvider>
            <MapProvider>
                    <StratForm/>
            </MapProvider>
        </StrategyProvider>
        </>
    )
}