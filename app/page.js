import { google } from 'googleapis';
import GoogleFormEmbed from './GoogleFormEmbed';

const formUrls = [
  'https://docs.google.com/forms/d/e/1FAIpQLSeWJ77Z7_--0EIeJmXldnR5k9cUgpZG6-rSt3vZeL43VlzNrQ/viewform',
  'https://docs.google.com/forms/d/e/1FAIpQLSelaW6AvYmbOyQhzdy7oXO4hukJJriP9wCQzjVTTABdAwo7ng/viewform',
  'https://docs.google.com/forms/d/e/1FAIpQLSd922bS9l5YID43w_dlQHb8a0emdaPnqEVTpIa5xB2afdzteQ/viewform',
  'https://docs.google.com/forms/d/e/1FAIpQLSe-DRtlQH7-vClWemkF4ryVfgXC_FCxQt2u4WvOJTHmPrSqjQ/viewform',
];

const sheetNames = ['Sheet1', 'Sheet2', 'Sheet3', 'Sheet4'];

async function fetchAvailableForms() {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const availableForms = [];

  for (let i = 0; i < sheetNames.length; i++) {
    const sheetName = sheetNames[i];

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: `${sheetName}!A:A`, // Check the number of entries in column A
    });

    const numResponses = response.data.values ? response.data.values.length : 0;

    console.log(numResponses)

    // Assuming the first row is a header
    if (numResponses < 31) {
      availableForms.push(formUrls[i]);
    }
  }

  return availableForms;
}

export default async function HomePage() {
  const availableForms = await fetchAvailableForms();

  return (
    <div>
      <GoogleFormEmbed availableForms={availableForms} />
    </div>
  );
}
