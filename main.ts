/* eslint-disable @typescript-eslint/no-misused-promises */
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { GetFilesFrom } from "./src/services/fileManager";
import FixTags from "./src/services/tagger/Tagger";
import { GetTracks } from "./src/services/track/trackManager";

let win: BrowserWindow | null = null;

const args = process.argv.slice(1),
  serve = args.some((val) => val === "--serve");

const titleBar = () => {
  if (process.platform === "darwin") return "hidden";
  return "default";
};

function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    frame: process.platform !== "linux",
    backgroundColor: "#80FFFFFF",
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: serve ? true : false,
      contextIsolation: false, // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true, // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
      preload: path.join(
        __dirname,
        "node_modules/@marcj/angular-desktop-ui/preload.js"
      ),
      nativeWindowOpen: true,
    },
    titleBarStyle: titleBar(),
  });

  if (serve) {
    win.webContents.openDevTools();

    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  win.setMenuBarVisibility(false);

  // createMenuMain();
  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on("ready", () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on("open-folder", () => {
  dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((result) => GetFilesFrom(result.filePaths[0]))
    .then((files) => GetTracks(files))
    .then((newTracks) => win.webContents.send('new-tracks', newTracks))
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("fix-tags", (e, track) => {
  FixTags(track).then((fixed) => win.webContents.send("update-track", fixed));
});
