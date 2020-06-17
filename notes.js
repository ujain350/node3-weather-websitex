const fs = require('fs')
const chalk = require('chalk')
const getNotes = () =>{
    return "notes.js is calling";
}

const addNotes = (title, body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log('New note added succesfully')
    }else{
        console.log('note title already taken')
    }    
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title
    })
    if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed('No note found!'))
    }else{
        console.log(chalk.bgGreen('Note Removed : ' + title))
    }
    saveNotes(notesToKeep)
}
const listNotes = ()=>{
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note)
    });
}
const readNote = (title)=>{
    const notes = loadNotes()
    const searchNotes = notes.filter((note)=>{
        if(title===note.title) return true
    })
        if(searchNotes.length===0) { console.log('No note found for title: '+ title)}
        else{ console.log(searchNotes) }

}

const saveNotes = (notes)=>{
    const dataJSON =  JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
         return JSON.parse(dataJSON)
     }catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}