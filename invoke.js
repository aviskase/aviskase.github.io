#!/usr/bin/env node

const { execFile } = require('child_process');
const { program } = require('commander');

program
  .command('draft')
  .description('add a new draft article')
  .requiredOption('-t, --title <article_title>', 'article title')
  .action((opts) => {
        const title = opts.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        const now = new Date();
        const draftPath = `articles/${now.getFullYear()}/${now.toLocaleDateString('en-CA')}-${title}`;

        execFile('hugo', ['new', '--kind', 'article', draftPath], (error, stdout, stderr) => {
            if (error) { throw error; }
            console.log(stdout);
        });
});

program.parse(process.argv);
