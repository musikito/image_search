// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import SearchForm from '@/components/SearchForm';
// import ImageGrid from '@/components/ImageGrid'
// import { searchImages } from '../lib/db';

// export default async function SearchPage({
//     searchParams,
// }: {
//     searchParams: { q: string }
// }) {
//     const user = await currentUser()
//     if (!user) {
//         redirect('/sign-in')
//     }

//     const query = searchParams.q
//     const images = await searchImages(query)

//     return (
//         <main className="container mx-auto px-4 py-8">
//             <h1 className="text-4xl font-bold mb-8">Search Results</h1>
//             <SearchForm />
//             <ImageGrid images={images.map(image => ({
//                 id: image.id,
//                 url: image.url,
//                 title: image.title
//             }))} />
//         </main>
//     )
// }
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SearchForm from '@/components/SearchForm'
import ImageGrid from '@/components/ImageGrid'
import { searchImages } from '../lib/db'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q: string }
}) {
    const user = await currentUser()
    if (!user) {
        redirect('/sign-in')
    }

    const query = searchParams.q
    let images: any[] = [];
    let error: string | null = null;

    try {
        images = await searchImages(query)
    } catch (e) {
        error = 'Failed to fetch images. Please try again later.'
        console.error('Error fetching images:', e)
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Search Results</h1>
            <SearchForm />
            {error ? (
                <p className="text-red-500 text-center mt-8">{error}</p>
            ) : (
                <ImageGrid images={images} />
            )}
        </main>
    )
}