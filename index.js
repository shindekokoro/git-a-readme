const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const generateMarkdown = require('./modules/generateMarkdown');
const generateLICENSE = require('./modules/generateLICENSE')

// Return List of most commonly used licenses from github api
async function getLicenseList() {
    let license = await axios.get('https://api.github.com/licenses');
    return license.data;
}

// Write File to file system
function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, (error) => {
        error ? console.error(error) : console.log(`${fileName} written successfully.`)
    })
}

// Initialize Application
async function init() {
    // Get list of licenses
    const licenses = await getLicenseList();
    const licenseChoices = licenses.map((license) => {
        return { name: license.name, value: license.spdx_id }
    });

    // Has the user already created an NPM project?
    // Pre-fill questions if so.
    const packageJSON = await (async () => {
        try {
            return await JSON.parse(fs.readFileSync('package.json', 'utf8', data => data))
        } catch (error) {
            return;
        }
    })();

    // Questions for user input
    // Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the Project?',
            default: packageJSON ? packageJSON.name : ''
        },
        {
            type: 'input',
            name: 'description',
            message: (question) => `Description of '${question.title}'?`,
            default: packageJSON ? packageJSON.description : ''
        },
        {
            // type 'editor' is preferred, cannot get to consistently to work correctly on debian.
            // Possible bug with inquirer? https://github.com/SBoudrias/Inquirer.js/issues/794
            type: 'editor',
            name: 'installation',
            message: 'How do you install your project?'
        },
        {
            type: 'editor',
            name: 'usage',
            message: 'Does your project have any special usage information?'
        },
        {
            type: 'input',
            name: 'preview',
            message: 'Is there a \'preview.png\' in your assets folder you would like to have in the README?',
            default: false
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a LICENSE for your project.',
            choices: licenseChoices,
            default: packageJSON ? packageJSON.license : ''
        },
        {
            type: 'confirm',
            name: 'createLicense',
            message: 'Do you want to create a new \'LICENSE\' file?',
            default: true

        },
        {
            type: 'editor',
            name: 'contribution',
            message: (question) => `What are '${question.title}'s contribution guidelines?`
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What environments have the project been tested on?'
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your github username?',
            default: packageJSON ? packageJSON.repository ? packageJSON.repository.type === 'git' ? packageJSON.repository.url.split('/')[3] : '' : '' : ''
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?'
        }
    ];

    await inquirer
        .prompt(questions)
        .then(async (response) => {
            if (response.createLicense) {
                writeToFile('LICENSE', await generateLICENSE(response));
            }
            writeToFile('README.md', await generateMarkdown(response));
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
