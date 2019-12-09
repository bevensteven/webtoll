import * as React from "react"

interface ValueInputProps {
    inputName: string
}

interface ValueInputState {
    value: string
}

class ValueInput extends React.Component<ValueInputProps, ValueInputState> {
    inputName: string;

    constructor(props: any) {
        super(props)
        this.inputName = props.inputName
        this.state = {
            value: ''
        }

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
    updateStorage(value: string) {
        // validate string
        // add string to storage
        let data = {
            inputName: value
        }
        chrome.storage.sync.set(data, function() {
                // Notify that the URL has been saved
                chrome.runtime.sendMessage(`${data} has been saved to webtoll`)
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
                    {this.inputName}:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ValueInput