'use strict'

const TinyAccelerator_ID = "fiddpgbhifocnehnnmkaodlabdbdpbjh"
const Profile = {
    id: "example",
    name: "TinyAcc Example Module",
    author: "laobubu",
    description: "Just a blank example",
    image: `chrome-extension://${chrome.runtime.id}/logo.png`,
    options: `chrome-extension://${chrome.runtime.id}/options/options.html`
}

function createInstance(request) {
    return new Promise(returnInstance => {
        
        // Construct your instance here
        
        var instance = {
            view: "You selected " + request.text,
            button: {
                text: "Example",
                event: {
                    click: "this.view.textContent = 'clicked!'"
                }
            },
            id: request.id
        }
        
        returnInstance(instance)
    })
}

var port = chrome.runtime.connect(TinyAccelerator_ID, { name: "module" })
port.postMessage({
    type: "profile",
    profile: Profile
})

port.onMessage.addListener(function (msg) {
    if (msg.type === "request") {
        var request = msg.request // a InstanceRequest object
        createInstance(request).then((instance) => {
            if (instance !== null) {
                port.postMessage({
                    type: "instance",
                    instance: instance
                })
            }
        })
    }
})
