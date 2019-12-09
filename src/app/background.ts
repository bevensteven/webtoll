import * as xpring from "@xpring-eng/xpring-web"
import 'chrome-extension-async'

const DEFAULT_AMOUNT = BigInt(2)

// build xpringClient
const grpcUrl = 'http://grpc.xpring.tech:8080'
const xpringClient = new xpring.XpringClient(grpcUrl)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background got a message!")
    sendResponse({})
})

// chrome.webNavigation.onCompleted.addListener((details) => {
//     console.log("Background: webNavigation.onCompleted event fired")
//     let url = details.url
//     handleWebNavCompleted(url, sendXrp)
// })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('Tab updated, changeInfo: ', changeInfo)
    var url = changeInfo.url
    handleWebNavCompleted(url, sendXrp)
})

/**
 * Checks if newly opened page is tracked and calls callback
 * if so.
 */
function handleWebNavCompleted(url: string, callback) {
    // lookup stored url
    chrome.storage.sync.get(['url'], function(storedItems) {
        console.log('Found storage object: ', storedItems)
        let storedUrl = storedItems.url
        if (url == storedUrl) {
            console.log(`${url} is stored!`)
            callback()
        }
    })
}

/**
 * Sends XRP from user's wallet to target wallet.
 */
async function sendXrp() {
    // get user wallet and target wallet addr
    let storage = await chrome.storage.sync.get(null)

    let userWallet = storage['wallet']
    let targetWalletAddr = storage['target_wallet']

    // build sender wallet object
    const senderWallet = new xpring.Wallet(
        userWallet['publicKey'],
        userWallet['privateKey']
    )

    // // validate target addr
    // if (xpring.Utils.isValidXAddress(targetWalletAddr)) {
    //     // do nothing
    // } else if (xpring.Utils.isValidClassicAddress(targetWalletAddr)) {
    //     // convert 
    //     targetWalletAddr = xpring.Utils.encodeXAddress(targetWalletAddr, 0)
    // } else {
    //     throw new Error('invalid address format. must be classic or x-address')
    // }

    // send xrp
    console.log(`${DEFAULT_AMOUNT} XRP: ${senderWallet.getAddress()} => ${targetWalletAddr}`)
    const transactionHash = await xpringClient.send(
        DEFAULT_AMOUNT,
        targetWalletAddr,
        senderWallet
    )
    console.log('Transaction hash: ', transactionHash)
}