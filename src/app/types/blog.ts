export interface Author {
    id: number
    name: string
}

export interface Blog {
    id: number
    title: string
    content: string
    slug: string
    thumbnail: string
    created_at: string
    author: Author
}