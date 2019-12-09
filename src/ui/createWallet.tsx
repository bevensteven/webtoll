import * as React from "react"
import * as xpring from "xpring-js"

class CreateWallet extends React.Component {

    /**
     * Creates a user wallet and saves it to storage.
     */
    handleClick = () => {
        const result = xpring.Wallet.generateRandomWallet()
        const newWallet = result.wallet
        
        console.log(newWallet.getAddress())
        console.log(newWallet.getPublicKey())
        console.log(newWallet.getPrivateKey())

        let data = {
            wallet: newWallet
        }
        chrome.storage.sync.set(data, function() {
            // Notify that the addr has been saved
            chrome.runtime.sendMessage(`${data} has been saved to webtoll`)
        })
    }


    render() {
        return (
            <button onClick={this.handleClick}>
                Create wallet
            </button>
        )
    }
}

export default CreateWallet