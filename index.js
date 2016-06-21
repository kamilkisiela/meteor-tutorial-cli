#!/usr/bin/env node

'use strict';

const program = require('commander');
const exec = require('child_process').exec;

function output(error, stdout, stderr) {
  if (error) console.log(`error: ${error}`);
  if (stdout) console.log(`result: ${stdout}`);
  if (stderr) console.log(`stderr: ${stderr}`);
};

// PATCH
program
  .version('0.0.1')
  .command('patch [filename]')
  .description('Generate patch file')
  .action((filename) => {
    const patchFile = filename || 'tutorial';
    exec(`git format-patch --stdout $(git log --pretty=format:%H|tail -1) > ${patchFile}.patch`, output);
  });

// LOG
program
  .version('0.0.1')
  .command('log [filename]')
  .description('Generate log file')
  .action((filename) => {
    const logFile = filename || 'log';
    exec(`git log --oneline --decorate > ${logFile}.txt`, output);
  });

  // New step
  program
    .version('0.0.1')
    .command('step <description> [number]')
    .description('Commit new step')
    .action((description, number) => {
      let stepNumber = number;

      function getLastStep(error, log, stderr) {
        const stepRegex = /Step ([0-9]+\.[0-9]+):/;

        if (error) console.log(`error: ${error}`);
        if (stderr) console.log(`stderr: ${stderr}`);

        if (log) {
          const steps = stepRegex.exec(log);
          if (steps) {
            const parts = steps[1].split('.');

            stepNumber = `${parts[0]}.${parseInt(parts[1]) + 1}`;
          }
        }

        commitStep(stepNumber, description);
      }

      function commitStep(step, descr) {
        exec(`git add . && git commit -m "Step ${step}: ${descr}"`, output);
      }

      if (!stepNumber) {
        exec(`git log --oneline --decorate`, getLastStep);
      } else {
        commitStep(stepNumber, description);
      }
    });




program.parse(process.argv);
