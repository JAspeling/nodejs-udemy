const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.green('Your notes'));

    if (notes.length === 0) {
        console.log(chalk.inverse.yellow(`No notes added!`))
    } else {
        notes.forEach((note, index) => {
            console.log(chalk.green(`${index + 1}: ${note.title}`));
        });
    }
}

const addNote = (title, body) => {
    console.log(chalk.inverse.green('Adding note'), chalk.green(`${title}:`), chalk.blue(body));

    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
    } else {
        console.log(chalk.inverse.yellow(`${title} already added!`))
    }

};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    console.log(chalk.yellow('Saving notes...'));
    fs.writeFileSync('notes.json', JSON.stringify(notes));

    console.log(chalk.green('Notes saved!'));
}

const removeNote = (title) => {
    console.log(chalk.inverse.green('Removing note'), chalk.yellow(`${title}`));

    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length === notesToKeep.length) {
        console.log(chalk.inverse.yellow(`No note found with '${title}'!`));
    } else {
        saveNotes(notesToKeep);
    }
}

const getNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (!note) {
        console.log(chalk.inverse.yellow(`No note found with '${title}'!`));
    } else {
        console.log(chalk.inverse.green(note.title), note.body);
    }
}

module.exports = {
    getNotes: getNotes,
    getNote: getNote,
    addNote: addNote,
    loadNotes: loadNotes,
    saveNotes: saveNotes,
    removeNote: removeNote
}