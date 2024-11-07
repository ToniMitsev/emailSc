const fs = require('fs');
const jsonInput = document.getElementById('json-input');
const uploadButton = document.getElementById('upload-button');
const uploadStatus = document.getElementById('upload-status');
const getEmailButton = document.getElementById('get-email-button');
const emailTable = document.getElementById('email-table');

uploadButton.addEventListener('click', () => {
    const jsonData = jsonInput.value;

    // Write JSON data to email.json
    fs.writeFile('email.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            uploadStatus.textContent = 'Upload failed.';
        } else {
            uploadStatus.textContent = 'Successfully uploaded!';
        }
    });
});

getEmailButton.addEventListener('click', () => {
    fs.readFile('email.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        // Clear the table
        emailTable.querySelector('tbody').innerHTML = '';

        // Populate the table
        for (const customer of jsonData.content) {
            const communicationChannels = customer.communicationChannels;
            const emails = communicationChannels.emails;

            if (emails && emails.length > 0) {
                const mainEmail = emails.find(email => email.main === true);

                if (mainEmail && mainEmail.address) {
                    const emailAddress = mainEmail.address;
                    const row = document.createElement('tr');
                    const cell = document.createElement('td');
                    cell.textContent = emailAddress;
                    row.appendChild(cell);
                    emailTable.querySelector('tbody').appendChild(row);
                }
            }
        }
    });
});
