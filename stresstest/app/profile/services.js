const { expect } = require('@playwright/test');
const path = require('path');

const addProfileImage = async (page, filename) => {
  await page.locator('//*[@id="__next"]/div/nav/div/div/div[3]/div/button').click();
  await page.locator('//*[@id="__next"]/div/nav/div/div/div[3]/div/div/button[1]').click();
  console.log(page.url());

  const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('//*[starts-with(@id, "radix-:r")]/div/div/div/div[2]/button'),
  ]);
  
  await fileChooser.setFiles(path.join(__dirname + filename));
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(3000);
  
  console.info('Profile image added');
};

module.exports = { addProfileImage };
