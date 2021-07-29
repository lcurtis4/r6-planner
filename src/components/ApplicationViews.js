//import { R6Planner } from "./r6Planner"
import { MapProvider  } from "./providers/mapProvider"
import { OperatorContext, OperatorProvider } from "./providers/operatorProvider"
import { SiteProvider } from "./providers/siteProvider"
import { StrategyProvider } from "./providers/stratProvider"
import { StratForm } from "./strat/stratForm"

export const ApplicationViews = () => {
    return(
        <>
        <StrategyProvider>
            <MapProvider>
                <SiteProvider>
                    <OperatorProvider>
                        <StratForm/>
                    </OperatorProvider>
                </SiteProvider>
            </MapProvider>
        </StrategyProvider>
        </>
    )
}