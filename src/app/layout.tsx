import type { Metadata } from 'next'
import './globals.css'
import '../styles/gooey-background.css'

export const metadata: Metadata = {
  title: 'Michelle Steen - Systems Design Engineer & Product Builder',
  description: 'Systems Design Engineering student at University of Waterloo, product-minded builder, and lover of turning fuzzy problems into thoughtful products.',
  keywords: ['Michelle Steen', 'Systems Design Engineering', 'Product Management', 'University of Waterloo', 'Product Builder'],
  authors: [{ name: 'Michelle Steen' }],
  openGraph: {
    title: 'Michelle Steen - Systems Design Engineer & Product Builder',
    description: 'Systems Design Engineering student at University of Waterloo, product-minded builder, and lover of turning fuzzy problems into thoughtful products.',
    type: 'website',
    url: 'https://michellesteen.netlify.app',
    siteName: 'Michelle Steen Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michelle Steen - Systems Design Engineer & Product Builder',
    description: 'Systems Design Engineering student at University of Waterloo, product-minded builder, and lover of turning fuzzy problems into thoughtful products.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
