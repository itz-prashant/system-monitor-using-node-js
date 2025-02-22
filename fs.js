// import * as fs from "node:fs";
import * as fs from "node:fs/promises";

// function createFile(pathname) {
//   // Aync api
//   // console.log("1")
//   // fs.writeFileSync(pathname, "Hello node js\n")
//   // console.log("2")
//   // fs.appendFileSync(pathname, "Hello javascript")
//   // console.log("File has been created")

//   // Async Api
//   // Error first call back

//   console.log("File operation start!");

//   fs.writeFile(pathname, "Hello node js\n", function (err) {
//     if (err) {
//       console.log("Something went wrong while creating file");
//       return;
//     }

//     fs.appendFile(pathname, "Hello Javascript", function (err) {
//       if (err) {
//         console.log("Something went wrong while append file");
//         return;
//       }
//       console.log("File has been append asynchoronusly");
//     });

//     console.log("File has been created asynchoronusly");
//   });

//   console.log("File operation done!");
// }

// createFile("./hello.txt");


async function createFile(pathname) {
    
    try {
        await fs.writeFile(pathname, 'Hello node js\n')
        await fs.appendFile(pathname, 'Hello Javascript\n')
    } catch (error) {
        console.log(error)
    }
    console.log('File written !')
}

createFile('./hello-promise.txt')