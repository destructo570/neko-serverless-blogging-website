import { Source_Serif_4, Playfair } from 'next/font/google'

 
export const playfair_display = Playfair({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})
 
export const source_serif_4 = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif-4',
})