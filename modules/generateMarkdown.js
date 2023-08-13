const axios = require('axios');

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license, username, repository) {
  if (!license || !username || !repository) {
    return '';
  } else {
    return `https://img.shields.io/github/license/${username}/${repository}`;
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return '';
  } else {
    // Hard Coded for testing, get link from github api
    return 'https://api.github.com/licenses/mpl-2.0';
  }
}


// Return List of most commonly used licenses from github api
async function getLicenseList() {
  let license = await axios.get('https://api.github.com/licenses');
  return license.data;
}

// Is there already a license file?
function getCurrentLicense() {
  let license = fs.readFile('LICENSE.md', 'utf8', (error, data) => {
    switch (error.code) {
      case 'ENOENT':
        console.error('File doesn\'t exist');
        break;
      case undefined:
        console.log(undefined);
      default:
        console.log(error);
        break;
    }
  });
}


// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = {
  generateMarkdown,
  getLicenseList
}
