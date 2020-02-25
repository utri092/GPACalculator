// Modules to control application life and create native browser window
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

////////////////###########################\\\\\\\\\\\\\\\\\
const ipc = electron.ipcMain; // Communicate with with window renderers

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let window_to_PDF;
let needDevTools;


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: true,
      devTools: needDevTools
    }
  })


  // and load the index.html of the app.
  try {
    mainWindow.loadFile('./assets/html/index.html');
  } catch (error) {
    console.log(error);
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    
  })
 
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

console.log('App is running…Electron app!');

app.on('ready', function(){
  //Determine if app is in development/production
  app.isPackaged ? needDevTools = false : needDevTools = true;
  createWindow();
});



// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('generate-transcript', function (error, messages) {
//@ref https://www.brainbell.com/javascript/ipc-communication.html 
   
    window_to_PDF = new BrowserWindow({show: false, 
      webPreferences: {nodeIntegration: true, devTools: needDevTools},
      parent: mainWindow});

    window_to_PDF.reload();
    window_to_PDF.webContents.clearHistory();  

    window_to_PDF.loadFile('./assets/html/transcript.html').then(()=>{
                                     
                                  
      window_to_PDF.webContents.openDevTools();
      window_to_PDF.webContents.send("print-pdf", messages);
    }).catch(error => {
        console.log(error)
    })
      
    window_to_PDF.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window_to_PDF = null;
    })

});
    
   
ipc.on('print-pdf-done', function(){

  window_to_PDF.webContents.print({}, function(success, errorType){
    if (!success) console.log(errorType);
    window_to_PDF.close();
    window_to_PDF = null;
  })

})

ipc.on('python-get-weather', function(error, data){
  
  weatherWindow = new BrowserWindow({show: true, 
    webPreferences: {nodeIntegration: true, devTools: needDevTools},
    parent: mainWindow});


  weatherWindow.loadFile('./assets/html/weather.html').then(()=>{
                                                              
    weatherWindow.webContents.openDevTools();

    const messages = {'isAppPackaged': app.isPackaged};

    weatherWindow.webContents.send("is-app-packaged", messages);

  }).catch(error => {
      console.log(error)
  })

  weatherWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    weatherWindow = null;
  })
})


  
  
