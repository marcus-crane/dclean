const fs = require('fs')

fs.readdir('/Users/Sentry/Desktop', (err, files) => {
    if (err) {
        console.log('I guess your username isn\'t the same as mine')
    }

    files = files.filter((filename) => {
        return ignoreSystemFiles(filename)
    })

    files = files.filter((filename) => {
        return ignoreFolders(filename)
    })

    createNewFolder()

    for (let i of files) {
        moveFiles(i)
    }
})

const ignoreSystemFiles = (filename) => {
    if (!ignored_filenames.includes(filename)) {
        return filename
    }
}

const ignoreFolders = (file) => {
    if (!fs.statSync(`/Users/Sentry/Desktop/${file}`).isDirectory()) {
        return file
    }
}

const moveFiles = (file) => {
    fs.renameSync(`/Users/Sentry/Desktop/${file}`, `/Users/Sentry/Desktop/${process.argv[2]}/${file}`)
}

const createNewFolder = () => {
    fs.mkdirSync(`/Users/Sentry/Desktop/${process.argv[2]}`)
}

const ignored_filenames = ['$RECYCLE.BIN', '.DS_Store', '.localized', 'Thumbs.db', 'desktop.ini']

