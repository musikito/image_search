import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import ImageGrid from '@/components/ImageGrid';
import { searchImages } from './lib/db';

export default async function Home() {
  const user = await currentUser()

  let images: any[] = [];
  let error: string | null = null;

  if (user) {
    try {
      images = await searchImages('')
    } catch (e) {
      error = 'Failed to fetch images. Please try again later.'
      console.error('Error fetching images:', e)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Image Search Engine</h1>
      {user ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <SearchForm />
            <Link href="/upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Upload Image
            </Link>
          </div>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ImageGrid images={images} />
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">Please sign in to use the image search engine.</p>
          <Link href="/sign-in" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </div>
      )}
    </main>
  )
}