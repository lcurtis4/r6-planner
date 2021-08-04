import React from "react"
import { Route } from "react-router-dom"
import { MapProvider  } from "./providers/mapProvider"
import { OperatorProvider } from "./providers/operatorProvider"
import { SiteProvider } from "./providers/siteProvider"
import { StrategyProvider } from "./providers/stratProvider"
import { StratForm } from "./strat/stratForm"
import { StratList } from "./strat/stratList"

export const ApplicationViews = () => {
    return(
        <>
        <StrategyProvider>
            <MapProvider>
                <SiteProvider>
                    <OperatorProvider>

                        <Route exact path="/form">
                            <StratForm/>
                        </Route>

                        <Route exact path="/">
                            <StratList/>
                        </Route>

                    </OperatorProvider>
                </SiteProvider>
            </MapProvider>
        </StrategyProvider>
        </>
    )
}