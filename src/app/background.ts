import * as xpring from "@xpring-eng/xpring-web"
import 'chrome-extension-async'

const DEFAULT_AMOUNT = BigInt(2000000)

// build xpringClient
const grpcUrl = 'http://grpc.xpring.tech:8080'
const xpringClient = new xpring.XpringClient(grpcUrl)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
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

    // send xrp
    console.log('### BEFORE ###')
    await checkBalances(senderWallet.getAddress(), targetWalletAddr)
    console.log(`Sending ${DEFAULT_AMOUNT} XRP, ${senderWallet.getAddress()} => ${targetWalletAddr}`)

    const transactionHash = await xpringClient.send(
        DEFAULT_AMOUNT,
        targetWalletAddr,
        senderWallet
    )

    console.log('Transaction hash: ', transactionHash)
    console.log('### AFTER ###')
    await checkBalances(senderWallet.getAddress(), targetWalletAddr)
}

async function checkBalances(senderAddr, receiverAddr) {
    let senderBalance = await xpringClient.getBalance(senderAddr)
    let receiverBalance = await xpringClient.getBalance(receiverAddr)
    console.log(`Sender ${senderAddr} has ${senderBalance} XRP`)
    console.log(`Receiver ${receiverAddr} has ${receiverBalance} XRP`)
}
