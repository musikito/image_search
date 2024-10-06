import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { currentUser } from '@clerk/nextjs/server'
import { addImage } from '../../lib/db'

export async function POST(request: Request) {
    const user = await currentUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!file || !title) {
        return NextResponse.json({ error: 'File and title are required' }, { status: 400 })
    }

    try {
        const blob = await put(file.name, file, { access: 'public' })
        const imageId = await addImage(user.id, title, description, blob.url)
        return NextResponse.json({ id: imageId, url: blob.url })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
    }
}