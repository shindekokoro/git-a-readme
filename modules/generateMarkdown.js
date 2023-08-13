const axios = require('axios');

// License badge created from github api, not called if license doesn't exit.
async function renderLicenseBadge(data) {
  if (!data.license) { return ''; }
  let badgeImage = `https://img.shields.io/github/license/${data.username}/${data.title}`;
  let badgeLink = await renderLicenseLink(data.license);
  return `[![License](${badgeImage})](${badgeLink})`
}

// Returns a link to license, not called if no license.
async function renderLicenseLink(license) {
  let link = await axios.get(`https://api.github.com/licenses/${license}`);
  return link.data.html_url;
}

// Returns the Table of Contents Section
function renderTOC(data) {
  let header = '## Table of Contents\n';
  let description = data.description ? '- [Description](#description)\n' : '';
  let installation = data.installation ? '- [Installation](#installation)\n' : '';
  let usage = data.usage ? '- [Usage](#usage)\n' : '';
  let license = data.license ? '- [License](#license)\n' : '';
  let contributing = data.contributing ? '- [Contributing](#contributing)\n' : '';
  let tests = data.tests ? '- [Tests](#tests)\n' : '';
  let questions = '- [Questions](#questions)\n';

  return header +
    description +
    installation +
    usage +
    license +
    contributing +
    tests +
    questions;
}

function renderSection(section, content) {
  if (!content) { return '' }
  let header = `## ${section}\n`
  return header + content + '\n';
}

// Returns the Usage Section
function renderUsage(data) {
  let header = '## Usage\n';
  return header;
}

// Returns the License Section
function renderLicense(data) {
  let header = '## License\n';
  return header;
}


// TODO: Create a function to generate markdown for README
async function generateMarkdown(data) {
  return '# ' + data.title + '\n' +
    '\n' +
    await renderLicenseBadge(data) + '\n' +
    renderSection('Description', data.description) +
    renderTOC(data) +
    renderSection('Installation', data.installation) +
    renderSection('Usage', data.usage) +
    renderSection('License', data.license) +
    renderSection('Contributing', data.contribution) +
    renderSection('Tests', data.test) +
    renderSection('Questions', data.email);
}

module.exports = generateMarkdown
