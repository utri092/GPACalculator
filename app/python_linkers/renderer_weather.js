const {spawn} = require("child_process");

const path = require('path');

const ipc = require('electron').ipcRenderer

//@note {}  = require('python-shell') is necessary for PythonShell constructor to work
let {PythonShell} = require('python-shell');
let pip, python, pyEngineDir;

function get_weather() {
  // This is a child_process running Python using your virtualenv. You can
  // communicate with it over stdin/stdout, etc.
  
  const child = spawn(pip, ['install', 'bs4', 'lxml', 'requests']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  var city = document.getElementById("city").value;
  
  var options = {
    scriptPath : pyEngineDir,
    pythonPath: python, //Virtual env python3
    pythonOptions: ['-u'], //Unbuffered stdout
    args : [city]
  }

  let pyshell = new PythonShell("weather_engine.py", options);

  pyshell.on('message', function(message) {
    swal(message);
  })

  document.getElementById("city").value = "";
}


ipc.on("is-app-packaged", function(error, messages){
  const isAppPackaged = messages["isAppPackaged"];

  if (isAppPackaged){
    //Works with asar packaging if app is launched where executable is
    pip = "./../../pyEnv3/bin/pip";
    python = "./../../pyEnv3/bin/python";
    pyEngineDir = "./../../python_engine/";

  }else{
    //Works with development and no asar packaging
    pip = path.join(__dirname, "./../../pyEnv3/bin/pip");
    python = path.join(__dirname, "./../../pyEnv3/bin/python");
    pyEngineDir = path.join(__dirname, "./../../python_engine/");

  }


});