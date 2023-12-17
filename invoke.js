#!/usr/bin/env node

const { execFile } = require('child_process');
const { program } = require('commander');
var slug = require('slug')

program
  .command('draft')
  .description('add a new draft article')
  .requiredOption('-t, --title <article_title>', 'article title')
  .action((opts) => {
    if (!opts.title || opts.title.trim() === '') {
      console.error('No title provided');
      process.exitCode = 1;
      return;
    }
    const title = slug(opts.title);
    const now = new Date();
    const draftPath = `articles/${now.getFullYear()}/${now.toLocaleDateString('en-CA')}-${title}`;
    execFile(
      'hugo', 
      ['new', '--kind', 'article', draftPath], 
      { env: { ...process.env, HUGO_TITLE: opts.title } },
      (error, stdout, stderr) => {
        if (error || stderr) { 
          if (error?.message) { console.error(error?.message) };
          if (stderr) { console.error(stderr) }; 
          if (stdout) { console.error(stdout) }; 
          process.exitCode = 1;
          return; 
        }
        console.log(stdout);
      }
    );
});

program.parse(process.argv);
