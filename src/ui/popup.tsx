import * as React from "react"
import * as ReactDOM from "react-dom"

import ValueInput from "./valueInput"
import CreateWallet from "./createWallet"
import "../styles/popup.css"

class Extension extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>webtoll ✋💸</h1>
                <ValueInput inputName="url" />
                <ValueInput inputName="target_wallet" />
                <CreateWallet />
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Extension />,
    document.getElementById('root')
)