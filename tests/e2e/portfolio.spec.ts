import { test, expect, type Page } from '@playwright/test'

async function enter(page: Page) {
  await page.goto('/')
  const splash = page.locator('dialog[open]')
  await expect(splash).toBeVisible()
  await splash.getByRole('button').click()
  await expect(splash).toHaveCount(0)
  await expect(page.locator('[data-main-menu="about"]')).toBeFocused()
}

async function openSection(page: Page, id: string) {
  await page.locator(`[data-main-menu="${id}"]`).click()
  await expect(page.getByRole('button', { name: /VOLVER AL MENÚ/ })).toBeFocused()
}

test('six sections, keyboard selection, return focus and responsive bounds', async ({ page }) => {
  test.setTimeout(90_000) // Recorrido completo de seis entradas y seis salidas con animaciones reales.
  await enter(page)
  await page.keyboard.press('End')
  await expect(page.locator('[data-main-menu="resume"]')).toBeFocused()
  await page.keyboard.press('Home')
  await expect(page.locator('[data-main-menu="about"]')).toBeFocused()
  for (const id of ['about', 'projects', 'skills', 'social', 'timeline', 'resume']) {
    await openSection(page, id)
    await expect(page.locator('#section-content h1')).toBeVisible()
    const overflow = await page.locator('#section-content').evaluate(node => node.scrollWidth > node.clientWidth + 1)
    expect(overflow, `${id} horizontal overflow`).toBe(false)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false)
    await page.keyboard.press('Escape')
    await expect(page.locator(`[data-main-menu="${id}"]`)).toBeFocused()
  }
})

test('project dialog loads gallery and Escape restores focus without leaving section', async ({ page }) => {
  await enter(page)
  await openSection(page, 'projects')
  const opener = page.getByRole('button', { name: 'Ver detalle de P3R Portfolio' })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: /CERRAR/ })).toBeFocused()
  const images = dialog.locator('figure img')
  await expect(images).toHaveCount(2)
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  expect(await dialog.evaluate(node => node.scrollWidth > node.clientWidth + 1)).toBe(false)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
})

test('mobile navigation closes before leaving the section', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1280) > 768, 'Compact navigation only')
  await enter(page)
  await openSection(page, 'about')
  const toggle = page.locator('.mobile-menu-toggle')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(toggle).toBeFocused()
  await expect(page.locator('#about-title')).toBeVisible()
  await toggle.click()
  await page.getByRole('navigation', { name: 'Secciones del portafolio' }).getByRole('button', { name: 'SKILLS' }).click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#section-content h1')).toHaveText('SKILLS')
})

test('reduced motion avoids video download and silence survives reload', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const videos: string[] = []
  page.on('request', request => { if (request.url().endsWith('.webm')) videos.push(request.url()) })
  await enter(page)
  await page.getByRole('button', { name: 'Silenciar sonidos de la interfaz' }).click()
  await openSection(page, 'social')
  await expect(page.locator('[data-reduced="true"]')).toBeVisible()
  await expect(page.locator('#social-detail video')).not.toHaveAttribute('src')
  expect(videos).toHaveLength(0)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Activar sonidos de la interfaz' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('[data-main-menu="about"]')).toBeVisible()
  await expect(page.locator('dialog[open]')).toHaveCount(0)
})

test('audio downloads only when used and stays unloaded for a muted session', async ({ page }) => {
  const sounds: string[] = []
  page.on('request', request => { if (request.url().includes('/audio/')) sounds.push(request.url()) })
  await page.goto('/')
  const splash = page.getByRole('dialog', { name: 'Pantalla de bienvenida' })
  await expect(splash).toBeVisible()
  await page.waitForLoadState('networkidle')
  expect(sounds).toHaveLength(0)
  await splash.getByRole('button').click()
  await expect.poll(() => sounds.some(url => url.endsWith('/open.mp3'))).toBe(true)
  await expect(splash).not.toBeVisible()
  await page.getByRole('button', { name: 'Silenciar sonidos de la interfaz' }).click()
  sounds.length = 0
  await page.reload()
  await page.waitForLoadState('networkidle')
  await openSection(page, 'about')
  await page.waitForLoadState('networkidle')
  expect(sounds).toHaveLength(0)
})

test('Oguri playback, pause, loop and exclusive portrait', async ({ page }) => {
  await enter(page)
  await openSection(page, 'social')
  const video = page.locator('#social-detail video')
  await video.scrollIntoViewIfNeeded()
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThan(0.1)
  // El punto corresponde al fondo vacío del recurso, no a la silueta.
  const alpha = await video.evaluate(node => {
    const media = node as HTMLVideoElement
    const canvas = document.createElement('canvas')
    canvas.width = media.videoWidth
    canvas.height = media.videoHeight
    const context = canvas.getContext('2d')!
    context.drawImage(media, 0, 0)
    return context.getImageData(500, 10, 1, 1).data[3]
  })
  expect(alpha, 'El fondo del video debe conservar transparencia').toBe(0)
  const pause = page.getByRole('button', { name: 'Pausar animación de Oguri' })
  await pause.click()
  const time = await video.evaluate(node => (node as HTMLVideoElement).currentTime)
  await page.waitForTimeout(200) // Comprueba que el tiempo permanece fijo durante una pausa real.
  expect(await video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBe(time)
  await pause.click()
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThan(time)
  await video.evaluate(node => { const media = node as HTMLVideoElement; media.currentTime = media.duration - 0.2 })
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeLessThan(1)
  expect(await video.evaluate(node => (node as HTMLVideoElement).muted)).toBe(true)
  await page.locator('[aria-labelledby="social-title"] nav button').nth(1).click()
  await expect(page.locator('#social-detail-name')).toHaveText('Leon S. Kennedy')
  await expect(video).toHaveCount(0)
})
