import { Given, When, Then } from '@cucumber/cucumber';

let tmpString : string | null;

Given('Bob opens Manabie website', { timeout: 60 * 1000 }, async function () {
  console.log('one');
});

When('Bob opens Manabie website', { timeout: 60 * 1000 }, async function () {
    console.log('two');
});

Then('Bob goes to Careers section', { timeout: 60 * 1000 }, async function () {
    console.log('three');
});


// Given('Bob opens Manabie website', function () {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });

// When('Bob goes to Careers section', function () {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });

// Then('Bob sees all job openings at Manabie', function () {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });