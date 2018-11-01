var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('.', { persistant: true }).on('all', (event, path) => {
    console.log(event, path);
});