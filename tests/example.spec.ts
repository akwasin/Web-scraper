import { test, expect, Locator } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });

test('scraper', async ({ page }) => {
  const clubs: string[] = ['afc ajax', 'aik fotboll', 'borussia dortmund', 'juventus', 'manchester united'];
  await page.goto('https://avanza.se');
  // const clubs: string[] = ['borussia dortmund'];

  let tmpObj: any;
  let tmpInt: Number | null;
  let tmpVle: string | null;
  let tmpStr: string | null;
  var ticker: Array<{ id: number, name: string, value: string, trend: Boolean }> = Array();
  let elm: any;
  let elmTrend: Array<string>;

  async function asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
  };

await asyncForEach( clubs, async stock => {
  await page.locator('[data-e2e="menuSearchButton"]').click();
  await page.locator('input[type="search"]').fill(stock);
  await page.locator('.title-link .title').click();
  elm = await page.locator('[data-e2e="tbs-quote-change"] > div').getAttribute('class');
  elmTrend = elm.split(' ');
  
  tmpVle = await page.locator('[data-e2e="tbs-quote-latest-value"]').textContent();
  // tmpInt = tmpStr!.match(/([0-9]{2},[0-9]{2})/g); // omit currency
  tmpStr = await page.locator('[data-e2e="tbs-instrument-name"]').textContent();
  tmpObj = {
    stockName: tmpStr,
    quote: tmpVle,
    trend: elmTrend.includes('positive')? 'Positive':'Negative'
  };
  ticker.push(tmpObj);
});

  console.log(ticker);
});

