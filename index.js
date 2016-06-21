#!/usr/bin/env node

'use strict';

const program = require('commander');
const exec = require('child_process').exec;

// PATCH
program
  .version('0.0.1')
  .command('patch [filename]')
  .description('Generate patch file')
  .action((filename) => {
    const patchFile = filename || 'tutorial';

    function output(error, stdout, stderr) {
      if (error) console.log(`error: ${error}`);
      if (stdout) console.log(`result: ${stdout}`);
      if (stderr) console.log(`stderr: ${stderr}`);
    };

    exec(`git format-patch --stdout $(git log --pretty=format:%H|tail -1) > ${patchFile}.patch`, output);
  });

  // LOG
  program
    .version('0.0.1')
    .command('log [filename]')
    .description('Generate log file')
    .action((filename) => {
      const logFile = filename || 'log';

      function output(error, stdout, stderr) {
        if (error) console.log(`error: ${error}`);
        if (stdout) console.log(`result: ${stdout}`);
        if (stderr) console.log(`stderr: ${stderr}`);
      };

      exec(`git log --oneline --decorate > ${logFile}.txt`, output);
    });



program.parse(process.argv); // notice that we have to parse in a new statement.
