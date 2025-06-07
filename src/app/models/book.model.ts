import { Author } from "./author.model";

export interface Book {
    id: number;
    title: string;
    genre: string;
    publishedDate: string;
    numberOfPages: number;
    basePrice: number
    author: Author;
    authorId: number;
}
