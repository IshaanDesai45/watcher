#!/usr/bin/env node

const chokidar= require("chokidar");
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const {spawn}= require('child_process');
const inquirer = require('inquirer');
// const readline = require('readline');
const chalk = require('chalk');
// const keypress = require('keypress');
const functionFile =require('./function')

var questions= [
    {
        type:"input",
        name:"show",
        message:"to see the usage option enter w or watch"

    },
    {   
        type:"rawlist",
        name:'mode',
        message:"watch usage",
        choices:[
            {
                key:'m',
                name:'filter modules',
                value:'m'
            },
            {
                key:'p',
                name:'pause watching',
                value:'p'
            },
            {
                key:'r',
                name:'reload configuraion and restart webpack',
                value:'r'
            },
            {
                key:'c',
                name:'clear cache and recompile',
                value:'c'
            },
            {
                key:'e',
                name:'explore mode to interactively walk the module graph to find out whya moduleis included',
                value:'e'
            },
            {
                key:'w',
                name:'select a module and print out wy its included',
                value:'w'
            },
            {
                key:'q',
                name:'quit',
                value:'q'
            },
        ],
        when:function(answers) {
            return (answers.show === 'w' || answers.show==='watch');
          }
    }
];



program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }
    let proc;
    const start = debounce(() => {
        if(proc){
            proc.kill();
        }
        console.log(chalk.blue('process is starting'));
     proc= spawn('node', [name], { stdio: 'inherit' });
      proc.on('exit',()=>{
          inquirer.prompt(questions).then((answers)=>{
              if(answers.mode)
              {
                  functionFile(answers);
              }
          })
      })
    }, 700);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);
