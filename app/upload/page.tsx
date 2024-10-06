import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import UploadForm from '@/components/UploadForm'

export default async function UploadPage() {
    const user = await currentUser()
    if (!user) {
        redirect('/sign-in')
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Upload Image</h1>
            <UploadForm />
        </main>
    )
}