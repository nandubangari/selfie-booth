const { app, BrowserWindow } = require('electron')
require ('custom-env').env('staging')
console.log(process.env.name)
function createWindow () {

  // Create the browser window.
  const win = new BrowserWindow({
    width:1280,
    height:768,
    frame:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  if(process.env.setup==undefined)
  win.loadFile('dist/view/admin.html')
  else
  win.loadFile('dist/view/login.html')
  win.maximize();

  // Open the DevTools.
//win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})