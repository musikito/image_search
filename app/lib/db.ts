import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function searchImages(query: string) {
    try {
        const result = await sql`
      SELECT id, url, title
      FROM images
      WHERE title ILIKE ${`%${query}%`}
      OR description ILIKE ${`%${query}%`}
      LIMIT 20
    `
        return result.rows
    } catch (error) {
        console.error('Error searching images:', error)
        throw new Error('Failed to search images')
    }
}

export async function addImage(userId: string, title: string, description: string, url: string) {
    try {
        const id = uuidv4()
        await sql`
      INSERT INTO images (id, user_id, title, description, url)
      VALUES (${id}, ${userId}, ${title}, ${description}, ${url})
    `
        return id
    } catch (error) {
        console.error('Error adding image:', error)
        throw new Error('Failed to add image')
    }
}