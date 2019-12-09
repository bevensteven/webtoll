const axios = require('axios')
const xpring = require('xpring-js')

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

async function run() {
  const seed = await seedFromFaucet()
  const newWallet = xpring.Wallet.generateWalletFromSeed(seed)
          
  console.log(newWallet.getAddress())
  console.log(newWallet.getPublicKey())
  console.log(newWallet.getPrivateKey())
}

run()

