import { test, expect } from '@playwright/test';

// ============================================================
// HOME PAGE
// ============================================================

test('home loads recommendations', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.card', { timeout: 15000 });
  const count = await page.locator('.card').count();
  expect(count).toBeGreaterThanOrEqual(10);
});

test('infinite scroll loads more shows', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.card', { timeout: 15000 });
  const initial = await page.locator('.card').count();
  for (let i = 0; i < 2; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
  }
  const after = await page.locator('.card').count();
  expect(after).toBeGreaterThan(initial);
});

test('home vote button toggles on and off', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.card', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const upBtn = page.locator('.card .vote-btn').first();
  await upBtn.click();
  await expect(upBtn).toHaveClass(/active/);
  await upBtn.click();
  await expect(upBtn).not.toHaveClass(/active/);
});

test('home add to watchlist works', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.card', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const watchBtn = page.locator('.card button').last();
  await watchBtn.click();
  await expect(watchBtn).not.toHaveText('+Watch');
});

test('roll ID clears session and reloads', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.card', { timeout: 15000 });
  await page.evaluate(() => localStorage.setItem('test-marker', 'present'));
  await page.getByTitle('New random user ID for testing').click();
  await page.waitForTimeout(1500);
  await page.waitForSelector('.card', { timeout: 15000 });
  const marker = await page.evaluate(() => localStorage.getItem('test-marker'));
  expect(marker).toBeNull();
});

// ============================================================
// SHOW DETAIL PAGE
// ============================================================

test('show detail loads correct show', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await expect(page.locator('h1')).toHaveText('Breaking Bad');
});

test('show detail has tags with vote buttons', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('.tag', { timeout: 15000 });
  const tags = page.locator('.tag');
  expect(await tags.count()).toBeGreaterThanOrEqual(1);
  const tagBtns = page.locator('.tag .vote-btn');
  expect(await tagBtns.count()).toBeGreaterThanOrEqual(2);
});

test('tag vote toggles on and off', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('.tag .vote-btn', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const tagUp = page.locator('.tag .vote-btn').first();
  await tagUp.click();
  await expect(tagUp).toHaveClass(/active/);
  await tagUp.click();
  await expect(tagUp).not.toHaveClass(/active/);
});

test('tag vote persists after reload', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('.tag .vote-btn', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const tagUp = page.locator('.tag .vote-btn').first();
  await tagUp.click();
  await page.waitForTimeout(500);
  await expect(tagUp).toHaveClass(/active/);
  await page.reload();
  await page.waitForSelector('.tag .vote-btn', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await expect(page.locator('.tag .vote-btn').first()).toHaveClass(/active/);
});

test('show vote toggles and persists', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('.vote-btn', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const upBtn = page.locator('.vote-btn').first();
  await upBtn.click();
  await expect(upBtn).toHaveClass(/active/);
  await page.reload();
  await page.waitForSelector('.vote-btn', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await expect(page.locator('.vote-btn').first()).toHaveClass(/active/);
});

test('show detail watchlist toggles add and remove', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const wlBtn = page.getByRole('button', { name: /Watchlist/ });
  await wlBtn.click();
  await page.waitForTimeout(500);
  await expect(wlBtn).toContainText('\u2713');
  await wlBtn.click();
  await page.waitForTimeout(500);
  await expect(wlBtn).toContainText('+');
});

test('show detail has recommendations section', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await expect(page.locator('h2:has-text("Recommendations")')).toBeVisible({ timeout: 10000 });
  const recCards = page.locator('.recs-grid .card');
  expect(await recCards.count()).toBeGreaterThanOrEqual(1);
});

test('back link returns to home', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.click('.back-link');
  await page.waitForSelector('.card', { timeout: 15000 });
  expect(page.url()).not.toContain('/show/');
});

// ============================================================
// WATCHLIST PAGE
// ============================================================

test('watchlist shows empty state', async ({ page }) => {
  await page.goto('/watchlist');
  await page.waitForSelector('h1', { timeout: 15000 });
  await expect(page.locator('h1')).toHaveText('Watchlist');
});

test('watchlist add and remove item', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const wlBtn = page.getByRole('button', { name: /Watchlist/ });
  await wlBtn.click();
  await page.waitForTimeout(500);
  await page.click('a:has-text("Watchlist")');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await expect(page.locator('.card')).toHaveCount(1);
  await expect(page.locator('.card a')).toHaveText('Breaking Bad');
  await page.locator('.card button').last().click();
  await page.waitForTimeout(500);
  await expect(page.locator('.card')).toHaveCount(0);
});

test('watchlist reorder moves item', async ({ page }) => {
  await page.goto('/show/27040');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Watchlist/ }).click();
  await page.waitForTimeout(500);
  await page.goto('/show/10');
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Watchlist/ }).click();
  await page.waitForTimeout(500);
  await page.click('a:has-text("Watchlist")');
  await page.waitForSelector('.card', { timeout: 15000 });
  await page.waitForTimeout(1000);
  const cards = page.locator('.card');
  expect(await cards.count()).toBe(2);
  // Move first item down
  await cards.first().locator('button').nth(1).click();
  await page.waitForTimeout(500);
  // Clean up
  for (let i = 0; i < 2; i++) {
    await page.locator('.card button').last().click();
    await page.waitForTimeout(300);
  }
});
