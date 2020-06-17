const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

//add, remove, read, list
//Create a add command
yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe: 'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv)=>{
        notes.addNotes(argv.title, argv.body)
    }
})
//Create a remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    title:{
        describe: 'Note Title',
        demandOption:true,
        type:'string'
    },
    handler: (argv)=>{
        notes.removeNote(argv.title)
    }
})
//Create a list command
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler: ()=>{
        notes.listNotes()
    }
})
//Create a read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    title:{
        describe:'Note Title',
        demandOption: true,
        type:'string'
    },
    handler: (argv)=>{
        notes.readNote(argv.title)
    }
})
yargs.argv
//console.log(yargs.argv)