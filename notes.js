const chalk = require('chalk')
const fs = require('fs')
debugger
const addNote = (title, body) =>{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=>  note.title === title)
    const duplicateNote = notes.find((note)=>  note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold("New note added!"))
    } else {
        console.log(chalk.red.bold("Note title taken!"))
       
    }
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =() =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title)=>{
   const notes = loadNotes()
   const notesToKeep = notes.filter((note)=>note.title!=title
   )

   if(notes.length==notesToKeep.length){
       console.log(chalk.red.bold("No Note found"))
   }
   else{
    console.log(chalk.green.bold("Note removed"))
    saveNotes(notesToKeep)
   }
   
}
const listNote= ()=>{
    const notes=loadNotes()
    console.log(chalk.inverse("Your notes"))
    notes.forEach((note) => {
        console.log(note.title)
    });

}

const readNote = (title)=>{
    const notes= loadNotes()
    const duplicateNote = notes.find((note)=>  note.title === title)
    if (duplicateNote) {
        console.log(chalk.green.bold("Note found"))
        console.log(chalk.blue.inverse("Title "+ title))
        console.log(chalk.bgGreenBright.inverse("Body "+ duplicateNote.body))
    } else {
        console.log(chalk.red.bold("Note doesn't exist!"))
  
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote:listNote,
    readNote:readNote
}