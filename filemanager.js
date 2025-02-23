#!/usr/bin/env node

import * as readline from 'node:readline/promises'
import {stdin, stdout} from 'node:process'
import chalk from "chalk"

import { createFolder , writeFile, appendFile, deleteFolder, deleteFile, listItem} from './fs.js'


const rl = readline.createInterface({
    input : stdin, 
    output : stdout
})

async function menu(params) {
    console.clear()
    console.log(chalk.blue.bold(`\n📁 File system manager\n`))

    const options = [
        'Create Folder',
        'Create File',
        'Write to File',
        'Delete Folder',
        'Delete File',
        'List Items',
        'Exit'
    ]

    options.forEach((opt, i)=>{
        console.log(chalk.yellow(`${i + 1}`) + " " + chalk.white(`${opt}`))
    })

    const answer = await rl.question(chalk.cyan('\nSelect option : '))
    
    switch(answer){
        case '1': 
        const folderPath = await rl.question(chalk.cyan('Folder path : '))
        await createFolder(folderPath)

        console.log(chalk.green('✅ Folder created'))
        break;

        case '2':
        const filePath = await rl.question(chalk.cyan('Folder path : '))
        const initialContent = await rl.question(chalk.cyan('Initial Content : '))
        await writeFile(filePath, initialContent)

        console.log(chalk.green('✅ File created'))
        break;

        case '3':
        const appendfilePath = await rl.question(chalk.cyan('Folder path : '))
        const appendContent = await rl.question(chalk.cyan('Initial Content : '))
        await appendFile(appendfilePath, `\n${appendContent}`)

        console.log(chalk.green('✅ File content added'))
        break;

        case '4':
        const deleteFolderPath = await rl.question(chalk.cyan('Folder path : '))
        await deleteFolder(deleteFolderPath)

        console.log(chalk.green('✅ Folder deleted'))
        break;

        case '5':
        const deleteFilePath = await rl.question(chalk.cyan('Folder path : '))
        await deleteFile(deleteFilePath)

        console.log(chalk.green('✅ File deleted'))
        break;

        case '6':
        const listPath = await rl.question(chalk.cyan('Folder path (Enter for current) : '))
        const items = await listItem(listPath || './')

        console.log(chalk.blue('\nContents : '))

        items.forEach(item => {
            const icon  = item.type == 'Folder' ? '📁': '📄'
            console.log(`${icon} ${chalk.yellow(item.name)}`)
        })
        break;

        case '7':
        rl.close()
        return;

        default:
            console.log(chalk.red('⚠ Invalid option'))
    }

    await rl.question(chalk.gray('\nPress Enter to Continue....'))

    menu()
}

menu()