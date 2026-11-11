const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { CreateItemPage } = require('./pages/CreateItemPage');

test.describe('Item Management', () => {
  let createItemPage;

  test.beforeEach(async ({ page }) => {
    createItemPage = new CreateItemPage(page);
    await createItemPage.goto();
  });


  test('should successfully create an item with all fields and redirect to home page', async ({ page }) => {
    const itemName = `Laptop_${Date.now()}`;
    const category = 'Electronics';
    const detail = 'High-end developer laptop with 32GB RAM';

    await createItemPage.createItem({
      name: itemName,
      category,
      detail,
    });

    // Submitting redirects to '/'
    await expect(page).toHaveURL('/');

    const homePage = new HomePage(page);
    const itemEntry = homePage.getItemEntry(itemName);
    await expect(itemEntry).toBeVisible();
    await expect(itemEntry).toContainText(itemName);
    await expect(itemEntry).toContainText(category);
    await expect(itemEntry).toContainText('(0 comments)');
  });

  test('should successfully create an item with missing detail fields and redirect to home page', async ({ page }) => {
    const itemName = `Laptop_${Date.now()}`;
    const category = 'Electronics';

    await createItemPage.createItem({
      name: itemName,
      category,
    });

    // Submitting redirects to '/'
    await expect(page).toHaveURL('/');

    const homePage = new HomePage(page);
    const itemEntry = homePage.getItemEntry(itemName);
    await expect(itemEntry).toBeVisible();
    await expect(itemEntry).toContainText(itemName);
    await expect(itemEntry).toContainText(category);
    await expect(itemEntry).toContainText('(0 comments)');
  });

  test('should successfully create a new category', async ({ page }) => {
  const categoryName = `Category_${Date.now()}`;

  await page.goto('/categories/new');
  await page.locator('input[name="name"]').fill(categoryName);

  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().endsWith('/categories') && res.request().method() === 'POST'
    ),
    page.getByRole('button', { name: 'Add Category' }).click(),
  ]);



  await page.goto('/items/new');
  await expect(
    page.locator('select[name="category"] option', { hasText: categoryName })
  ).toHaveCount(1);
});

  test('should silently ignore a duplicate category: no error shown, no duplicate created', async ({ page }) => {
  const categoryName = `Dupe`;

  async function addCategory() {
    await page.goto('/categories/new');
    await page.locator('input[name="name"]').fill(categoryName);
    await page.getByRole('button', { name: 'Add Category' }).click();
  }

  // First creation succeeds
  await addCategory();

  // Second creation with the same name
  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().endsWith('/categories') && res.request().method() === 'POST'
    ),
    addCategory(),
  ]);



  await page.goto('/items/new');
  await expect(
    page.locator('select[name="category"] option', { hasText: categoryName })
  ).toHaveCount(1);
});

  test('should return 404 when navigating to a non-existent item id', async ({ page }) => {
    const response = await page.goto('/items/999999');
    expect(response.status()).toBe(404);
    await expect(page.locator('body')).toContainText('Item not found');
  });
});
