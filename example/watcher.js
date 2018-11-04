var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('.\/uploads', { persistant: true }).on('all', (event, path) => {
    console.log(event, path);
});