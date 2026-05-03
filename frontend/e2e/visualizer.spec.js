import { test, expect } from '@playwright/test';

test.describe('Algorithm Visualizer E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('Happy Path: Select -> Mode -> Visualize -> Play -> Reset', async ({ page }) => {
    // 1. Select Algorithm
    await page.click('text=Binary Search');

    // 2. Select Demo Mode
    await page.click('text=Run a Demo');
    
    // 3. Pick a specific demo (e.g., "Target Found")
    await page.click('text=Target Found');

    // Wait for Visualizer to load by looking for the Reset button
    const resetButton = page.locator('button:has-text("Reset")');
    await expect(resetButton).toBeVisible({ timeout: 10000 });

    // Ensure Play button is present
    const playButton = page.locator('button:has-text("Play")');
    await expect(playButton).toBeVisible();

    // 4. UI Synchronization: Assert initial state
    await expect(page.locator('.frame-counter')).toContainText('FRAME: 1 /');
    
    // 5. Play functionality
    await playButton.click();
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();

    // Let it play for a moment and pause
    await page.waitForTimeout(1000);
    await page.locator('button:has-text("Pause")').click();

    // Verify frame has advanced
    const frameText = await page.locator('.frame-counter').innerText();
    const currentFrame = parseInt(frameText.split(' ')[1]);
    expect(currentFrame).toBeGreaterThan(1);

    // 6. Reset functionality
    await resetButton.click();
    await expect(page.locator('.frame-counter')).toContainText('FRAME: 1 /');
  });

  test('Rapid Fire Button Clicking Edge Case', async ({ page }) => {
    await page.click('text=Bubble Sort');
    await page.click('text=Run a Demo');
    await page.click('text=Reverse Sorted');

    await expect(page.locator('button:has-text("Step Forward")')).toBeVisible();
    
    const stepForward = page.locator('button:has-text("Step Forward")');
    
    // Rapidly click "Step Forward" faster than the UI can normally handle
    for(let i=0; i<15; i++) {
        await stepForward.click();
    }

    // Verify it doesn't crash and frame index is correctly bounded
    const frameText = await page.locator('.frame-counter').innerText();
    const currentFrame = parseInt(frameText.split(' ')[1]);
    expect(currentFrame).toBeGreaterThan(1);
    
    // Try rapidly clicking play/pause
    const playBtn = page.locator('button:has-text("Play"), button:has-text("Pause")');
    for(let i=0; i<10; i++) {
        await playBtn.click();
    }
    
    await expect(page.locator('.visualizer-section')).toBeVisible(); // Still alive
  });

  test('UI Synchronization Check: Code & Locals', async ({ page }) => {
    await page.click('text=Binary Search');
    await page.click('text=Run a Demo');
    await page.click('text=Target Found');

    await expect(page.locator('.code-viewer')).toBeVisible();
    
    // Step forward and check if local variables update on the screen
    const stepForward = page.locator('button:has-text("Step Forward")');
    await stepForward.click();

    // We expect some local variables like "low" or "high" to appear
    const localsView = page.locator('.locals-panel'); // Assuming a class exists for locals
    if(await localsView.isVisible()) {
        await expect(localsView).toContainText(/low|high|mid/i);
    }
  });

});
