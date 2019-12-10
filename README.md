# webtoll ✋💸

This is a Google Chrome extension built off of Duo Lab's `chrome-extension-boilerplate` [here](https://github.com/duo-labs/chrome-extension-boilerplate). It also utilizes Xpring's [`xpring-js` client library](https://github.com/xpring-eng/Xpring-JS/). Please note that this is a prototype and requires extensive work to turn it into a consumer ready extension. See the *Contributing* section for how we can get there.

![](https://media.giphy.com/media/3ov9jNziFTMfzSumAw/giphy.gif)

See slide deck for this project [here](https://docs.google.com/presentation/d/1jYo8RV8hFho-oK-p2wL3qJ-ZDgc9yJj6VOyEisS5hEY/edit?usp=sharing). In these slides, you can learn more about `webtoll`'s concept, inspiration, and potential future roadmap.

## 📝 Concept

With `webtoll` you can digitally tax yourself to form new habits, contribute to a cause, or for no reason at all!

For instance, I spend way too much time on `https://knowyourmeme.com/`. With `webtoll`, at least I can browse memes and 💩-post while contributing to a charitable cause or even paying out a friend who's "accountable" for weening me away from the website. The extension itself is quite flexible; it taxes you whenever you consume levied content and sends said tax to a receiver of your choice. Thus, you can adopt it for more tailored use-cases too.

## 🧰 Installation

To install this extension, follow these steps:
1. Clone this repository.
2. Run `yarn run build` to build the project. The build will be present as `webtoll/dist`.
3. Open Google Chrome and go to `chrome://extensions`
4. Turn on *Developer Mode*.
5. Click *Load Unpacked* and select the `dist` folder that you built in (2). The extension should now be loaded.

## 🖥 Usage

After installing the extension, you can begin configuring it. A typical flow will look like:
1. *Create wallet*: create your XRP wallet from which webtoll will tax you.
2. Choose*where* you want to send your "taxes" to. Achieve this by inputting a destination address to the *Target wallet* input in the extension popup.
3. Specify what URL you want to enable `webtoll` for. For example, if you want to get taxed everytime you go to `http://markzuckerburg.com`, enter that URL into the *Url* input in the extension popup.

Once `webtoll` has been configured, you can check that it works by opening the *background view* for the extension to check the extension's logs. To get here, go to `webtool`'s extension settings under `chrome://extensions` and click on *background page* under *Inspect views*.

## 👋 Contributing

Please file a project issue and include some context and explanation of your change in the issue's description. Some good places to start:
* Support for taxing multiple URLs and sending to multiple receivers.
* Adding receiver "sets" or "groups". For example, a group of documentation focused receivers can be `[wikipedia, stackoverflow, learnxinyminutes]`.
* Implement *actual* security for this extension.
* Implement payment *streaming* – likely using ILP – for the extension.
* Support other wallet address formats – i.e. ILP style *payment pointers*.
* Design and implement more sophisticated and reasonable toll rates and logic.
* Add features that analyze user activity and dynamically update `webtoll` logic accordingly.
* Many other great ideas out there!
