import Image from 'next/image'

type ImageData = {
    id: string
    url: string
    title: string
}

type ImageGridProps = {
    images: ImageData[]
}

export default function ImageGrid({ images }: Readonly<ImageGridProps>) {
    if (!images || images.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No images found.</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <div key={image.id} className="relative aspect-square">
                    <Image
                        src={image.url}
                        alt={image.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                        <p className="text-sm truncate">{image.title}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}