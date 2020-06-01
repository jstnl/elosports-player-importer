"use strict"

const csv = require('csv-parser');
const fs = require('fs');

const Axios = require('axios');

const wait = (ms) => {
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

fs.createReadStream(process.argv[2])
  .pipe(csv())
  .on('data', (row) => {
    if (row.First_name !== '') {
      Axios.post('https://elosports-backend-staging.herokuapp.com/players/', row)
        .then(res => {
          console.log(res.data.message);
        }).catch(err => {
          console.log(err);
        });

      wait(500);
    }
  })
  .on('end', () => {
    console.log(`Reached the end of file: ${process.argv[2]}`)
  })
