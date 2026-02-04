import localFont from 'next/font/local'

export const dirtyline = localFont({
  src: '../public/fonts/Dirtyline.ttf',
  display: 'swap',
  preload: true, // branding critique
  variable: '--font-dirtyline',
})

export const satoshi = localFont({
  src: '../public/fonts/Satoshi/WEB/fonts/Satoshi-Variable.woff2',
  display: 'swap',
  preload: false,
  variable: '--font-satoshi',
})

export const druck = localFont({
  src: '../public/fonts/Druk-Medium-Trial.otf',
  display: 'optional',
  preload: false,
  variable: '--font-druck',
})
