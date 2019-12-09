import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

class UrlInput extends React.Component {
    state: any;
    constructor(props: any) {
        super(props)
        this.state = {value: ''}

        // bind functions
        this.updateStorage = this.updateStorage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Updates Chrome storage when user adds a URL.
     * 
     * TODO: add support for adding and storing multiple URLs.
     */
    updateStorage(url: string) {
        // validate string
        // add string to storage
        chrome.storage.sync.set({'value': url}, function() {
                // Notify that the URL has been saved
                chrome.runtime.sendMessage(`${url} has been saved to webtoll`)
        })
        // handle error
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('URL was submitted: ' + this.state.value);
        this.updateStorage(this.state.value)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    URL:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

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