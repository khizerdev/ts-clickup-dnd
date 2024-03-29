import AddModal from './components/AddModal'
import './globals.css'

export const metadata = {
  title: 'TypeScript Clickup',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-secondary">
        {children}
        <AddModal></AddModal>
      </body>
    </html>
  )
}
