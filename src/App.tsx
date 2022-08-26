import React, {useState} from 'react';
import './App.css';
import SplitterLayout from "react-splitter-layout";
import 'react-splitter-layout/lib/index.css';
import {BillsList} from "./features/bills/BillsList";
import {RouteOnMap} from "./features/routeOnMap/RouteOnMap";

function App() {

    return (
        <SplitterLayout>
            <div id={"layout_left"}>
                <BillsList />
            </div>
            <div id={"layout_right"}>
                <RouteOnMap />
            </div>
        </SplitterLayout>
    );
}

export default App;
