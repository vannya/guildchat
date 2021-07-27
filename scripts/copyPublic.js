const fs = require('fs-extra');

function copyPublicFolder() {
  fs.copySync('public', 'build', {
    dereference: true,
    filter: (file) => file !== 'public/index.html',
  });
}

copyPublicFolder();
