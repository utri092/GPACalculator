// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

})

contextBridge.exposeInMainWorld(
  //@note Needs contextIsolation in BrowserWindow webPreferences to be enabled
  //@detail property pdf enables methods inside to be used by renderer processes. In this case it talks with the main process
  //@ref https://www.electronjs.org/docs/api/context-bridge https://codeburst.io/what-is-prototype-pollution-49482fc4b638 
  
  'transcript',
  {  
    generateTranscript: (arg_json) => ipcRenderer.send('generate-transcript', arg_json),
  }
)
