const fs = require('fs');
const emailList = document.getElementById('email-list');

const jsonData = JSON.parse(fs.readFileSync('email.json', 'utf8'));

for (const customer of jsonData.content) {
    const communicationChannels = customer.communicationChannels;
    const emails = communicationChannels.emails;

    if (emails && emails.length > 0) {
        const mainEmail = emails.find(email => email.main === true);

        if (mainEmail && mainEmail.address) {
            const emailAddress = mainEmail.address;
            const li = document.createElement('li');
            li.textContent = emailAddress;
            emailList.appendChild(li);
        }
    }
}
