const {app, BrowserWindow} = require('electron')
const path = require('path')


function createWindow(){
    window_to_PDF = new BrowserWindow({show : false});
    window = new BrowserWindow({show : true,
                                width: 800,
                                height: 600,
                                webPreferences: { preload: path.join(__dirname, 'preload.js')},
                                });
    

    try {
        window.loadFile('./index.html');
    } catch (error) {
        console.log(error)
    
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
        mainWindow = null
    })
}

function pdfSettings() {

    var paperSizeArray = ["A4", "A5"];
    var option = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: paperSizeArray["A4"],
    };

  return option;
}

function printPDF(){

    window_to_PDF.loadURL('./index.html'); //give the file link you want to display

    win.webContents.on('did-finish-load', async function(){

        console.log("Inside printPDF");

        window_to_PDF.webContents.printToPDF(pdfSettings(), function(err, data) {
            if (err) {
                //do whatever you want
                console.log(err);
                return;
            }
            try{
                fs.writeFileSync('./gen_pdf.pdf', data);
                console.log("worked");
            }catch(err){
                //unable to save pdf..
                console.log(err);
            }
       
        })
    })
}



document.getElementById("Calculate").onclick = printPDF;

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.