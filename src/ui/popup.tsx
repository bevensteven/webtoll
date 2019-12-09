import * as React from "react"
import * as ReactDOM from "react-dom"

import ValueInput from "./ValueInput"
import "../styles/popup.css"

class Extension extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
                <ValueInput inputName="url" />
                <ValueInput inputName="target_wallet" />
                <ValueInput inputName="user_wallet" />
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Extension />,
    document.getElementById('root')
)