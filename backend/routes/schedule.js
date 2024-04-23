const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'testdata', 'portnet-20240418120646.json');
let previousData = null;

function findVesselsETA(jsonData, vesselName) {
    for (const portCall of jsonData.portCalls) {
        if (portCall.vesselName === vesselName) {
            const portAreaDetail = portCall.portAreaDetails.find(detail => detail.eta);
            if (portAreaDetail) {
                return portAreaDetail;
            }
        }
    }
    return null;
}

function setupSchedule(io) {
    schedule.scheduleJob('*/1 * * * *', function checkForUpdates() {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Failed to read file:', err);
          return;
        }
        const jsonData = JSON.parse(data);
        const portAreaDetail = findVesselsETA(jsonData, "Finnbreeze");

        io.emit('update', `ETA of vessel 9148128 Emilie to Port of Kokkola: ${portAreaDetail.eta}`);

        if (previousData) {
          if (previousData.eta !== portAreaDetail.eta) {
            const message = `ETA of vessel 9148128 Emilie to Port of Kokkola updated: ${portAreaDetail.eta}`;
            console.log(message);
            io.emit('update', message);
          }
          if (!previousData.ata && portAreaDetail.ata) {
            const message = `ATA of vessel 9148128 Emilie to Port of Kokkola updated: ${portAreaDetail.ata}`;
            console.log(message);
            io.emit('update', message);
          }
        }

        previousData = portAreaDetail.eta;
      });
    });
}

module.exports = setupSchedule;
