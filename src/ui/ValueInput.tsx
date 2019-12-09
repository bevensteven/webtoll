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
        let key = this.inputName
        let data = {}
        data[key] = value
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
        alert(`${this.inputName} was submitted: ` + this.state.value);
        this.updateStorage(this.state.value)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label >
                    {this.inputName.toUpperCase()[0] + this.inputName.replace('_', ' ').slice(1)}:
                </label>
                <input type="text" value={this.state.value} onChange={this.handleChange} className='yolo'/>
                <div className='button'>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default ValueInput