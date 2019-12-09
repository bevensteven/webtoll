import * as React from "react"
import * as ReactDOM from "react-dom"

import "./UrlInput"
import "../styles/popup.css"

class Extension extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
                {/* Form input to add URLs */}
                <UrlInput/>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Extension />,
    document.getElementById('root')
)