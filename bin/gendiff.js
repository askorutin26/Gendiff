#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/showDiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<file1> <file2>')
  .action((file1, file2) => { console.log(genDiff(file1, file2, `${program.opts().format}`)); });
program.parse(process.argv);
