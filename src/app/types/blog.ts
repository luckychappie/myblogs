export interface Author {
    id: number
    name: string
}

export interface User {
    id: number
    name: string
}

export interface Blog {
    id: number
    title: string
    content: string
    slug: string
    thumbnail: string
    created_at: Date
    author: Author
}

export interface Comment {
    id: number
    message: string
    user: User,
    created_at: Date

}
