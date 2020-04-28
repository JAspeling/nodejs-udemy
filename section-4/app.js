const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// add, remove, read, list

// Create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'The title of the note to remove.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
});

yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    handler: () => notes.getNotes()
});

yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'The title of the note to retrieve',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.getNote(argv.title)
});


yargs.parse();