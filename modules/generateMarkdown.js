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

async function renderLicenseDescription(license) {
  let link = await axios.get(`https://api.github.com/licenses/${license}`);
  return link.data.description;
}

// Returns the Table of Contents Section
function renderTOC(data) {
  let header = '## Table of Contents\n';
  let description = data.description ? '- [Description](#description)\n' : '';
  let installation = data.installation ? '- [Installation](#installation)\n' : '';
  let usage = data.usage ? '- [Usage](#usage)\n' : '';
  let license = data.license ? '- [License](#license)\n' : '';
  let contributing = data.contribution ? '- [Contributing](#contributing)\n' : '';
  let tests = data.tests ? '- [Tests](#tests)\n' : '';
  let questions = '- [Questions](#questions)\n';

  return header +
    description +
    installation +
    usage +
    license +
    contributing +
    tests +
    questions + '\n';
}

function renderSection(section, content) {
  if (!content) { return ''; }
  let body = '';
  let header = `## ${section}\n`;
  switch (section) {
    case 'Questions':
      body = '**If you have any questions feel free to use the links below:**\n\n' +
        `GitHub Profile: https://github.com/${content.username}\n\n` +
        `Email: ${content.email}`;
      break;
    default:
      body = content;
      break;
  }
  return header + body + '\n';
}

// Generate the README.md(markdown) content.
async function generateMarkdown(data) {
  return '# ' + data.title + '\n' +
    '\n' +
    await renderLicenseBadge(data) + '\n' +
    renderSection('Description', data.description) +
    renderTOC(data) +
    renderSection('Installation', data.installation) +
    renderSection('Usage', data.usage) +
    renderSection('License', `[${data.license}](${await renderLicenseLink(data.license)})\n\n${await renderLicenseDescription(data.license)}`) +
    renderSection('Contributing', data.contribution) +
    renderSection('Tests', data.tests) +
    renderSection('Questions', data);
}

module.exports = generateMarkdown
