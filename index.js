const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./modules/generateMarkdown');

// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
async function init() {
    // Get list of licenses 
    const licenses = await generateMarkdown.getLicenseList();

    // Questions for user input
    // Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the Project?'
        },
        {
            type: 'input',
            name: 'description',
            message: (question) => `Description of '${question.title}'?`
        },
        {
            type: 'input',
            name: 'installation',
            message: 'How do you install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Does your project have any special usage information?'
        },
        {
            type: 'input',
            name: 'contribution',
            message: (question) => `What are '${question.title}'s contribution guidelines?`
        },
        {
            type: 'input',
            name: 'test',
            message: 'Are there any specific test instructions?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a LICENSE for your project.',
            choices: licenses.map(license => license.name)
        }
    ];


    inquirer
        .prompt(questions)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error('Prompt cannot be rendered in the current environment.');
            } else {
                console.error('Something went wrong %s', error);
            }
        });
}

// Function call to initialize app
init();