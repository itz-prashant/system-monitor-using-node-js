// import * as fs from "node:fs";
import * as fs from "node:fs/promises";
import path from "node:path";


function createFile(pathname) {
  // Aync api
  // console.log("1")
  // fs.writeFileSync(pathname, "Hello node js\n")
  // console.log("2")
  // fs.appendFileSync(pathname, "Hello javascript")
  // console.log("File has been created")

  // Async Api
  // Error first call back

  console.log("File operation start!");

  fs.writeFile(pathname, "Hello node js\n", function (err) {
    if (err) {
      console.log("Something went wrong while creating file");
      return;
    }

    fs.appendFile(pathname, "Hello Javascript", function (err) {
      if (err) {
        console.log("Something went wrong while append file");
        return;
      }
      console.log("File has been append asynchoronusly");
    });

    console.log("File has been created asynchoronusly");
  });

  console.log("File operation done!");
}

// createFile("./hello.txt");


async function createFile2(pathname) {
    
    try {
        await fs.writeFile(pathname, 'Hello node js\n')
        await fs.appendFile(pathname, 'Hello Javascript\n')
    } catch (error) {
        console.log(error)
    }
    console.log('File written !')
}


// createFile('./hello-promise.txt')

export async function createFolder(foldername) {
    await fs.mkdir(foldername, {recursive: true})
}

export async function writeFile(pathname, content='') {
    await fs.writeFile(pathname, content)
}

export async function appendFile(pathname, content='') {
    await fs.appendFile(pathname, content)
}

async function readFile(pathname) {
    const data = await fs.readFile(pathname, 'utf-8')
    console.log(data)
}

export async function deleteFile(filepath) {
    await fs.unlink(filepath)
}

export async function deleteFolder(filepath) {
    await fs.rm(filepath, {recursive: true})
}

async function getFileInfo(filepath) {
    const stat = await fs.stat(filepath)
    return{
        size: `${(stat.size / 1024).toFixed(2)} kb`,
        createed: stat.birthtime.toLocaleString(),
        modified: stat.mtime.toLocaleString()
    }
} 

export async function listItem(listpath = './') {
    const items = await fs.readdir(listpath, {withFileTypes: true})
    return items.map(item => {
        return {
            name: item.name,
            type: item.isDirectory() ? "Folder" : "File",
            path : path.join(import.meta.dirname, item.name)
        }
    })
}

// writeFile('./hello.txt', 'Hello NodeJs \n')
// createFolder('./content/image/logo')
// readFile('./hello.txt')
// deleteFile('./hello.txt')
// deleteFolder('./content/image')
const fileStats = await getFileInfo('./hello.txt')
console.log(fileStats)