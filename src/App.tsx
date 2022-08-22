import React from 'react';
import './App.css';
import SplitterLayout from "react-splitter-layout";
import 'react-splitter-layout/lib/index.css';

function App() {
    return (
        <SplitterLayout>
            <div id={"layout_left"}>LEFT</div>
            <div id={"layout_right"}>RIGHT</div>
        </SplitterLayout>
    );
}

export default App;
