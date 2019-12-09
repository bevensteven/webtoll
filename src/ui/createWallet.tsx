import * as React from "react"
import * as xpring from "xpring-js"
import axios from 'axios'

/**
 * Retrieve a secret from the testnet faucet.
 */
async function seedFromFaucet() {
    const faucetURL = 'https://faucet.altnet.rippletest.net/accounts'
    try {
        const resp = await axios.post(faucetURL)
        if (resp.data.account.secret) {
            return resp.data.account.secret
        }
        throw new Error('Could not generate seed from faucet.')
    } catch (err) {
        console.error(err)
        throw new Error('Error: ' + err)
    }
}

class CreateWallet extends React.Component {

    /**
     * Creates a user wallet and saves it to storage.
     */
    handleClick = async () => {
        const seed = await seedFromFaucet()
        const newWallet = xpring.Wallet.generateWalletFromSeed(seed)
        
        console.log(newWallet.getAddress())
        console.log(newWallet.getPublicKey())
        console.log(newWallet.getPrivateKey())

        let data = {
            wallet: {
                publicKey: newWallet.getPublicKey(),
                privateKey: newWallet.getPrivateKey()
            }
        }
        chrome.storage.sync.set(data, function() {
            // Notify that the addr has been saved
            chrome.runtime.sendMessage(`Created wallet with addr=${newWallet.getAddress()}`)
            console.log('Saved wallet data to storage: ', data)
        })
    }


    render() {
        return (
            <button id="create_wallet" onClick={this.handleClick}>
                Create wallet
            </button>
        )
    }
}

export default CreateWallet