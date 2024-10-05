'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/search?q=${encodeURIComponent(query)}`)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Search
            </button>
        </form>
    )
}