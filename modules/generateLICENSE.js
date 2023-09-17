const axios = require('axios');

async function renderLicenseBody(data) {
  let response = await axios.get(
    `https://api.github.com/licenses/${data.license}`
  );
  let body = response.data.body;
  let name = data.username;
  let year = new Date().getFullYear();

  // Split body to add year and name if license has it
  switch (data.license) {
    case 'MIT':
      var bodySplit = body.split('[year]');
      bodySplit.splice(1, 0, year);
      body = bodySplit.join('');
      bodySplit = body.split('[fullname]');
      bodySplit.splice(1, 0, name);
      body = bodySplit.join('');
      break;
    case 'Apache-2.0':
      var bodySplit = body.split('[yyyy]');
      bodySplit.splice(1, 0, year);
      body = bodySplit.join('');
      bodySplit = body.split('[name of copyright owner]');
      bodySplit.splice(1, 0, name);
      body = bodySplit.join('');
    default:
      break;
  }

  return body;
}

async function generateLICENSE(license) {
  return await renderLicenseBody(license);
}

module.exports = generateLICENSE;
