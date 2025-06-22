import { Author } from "./author.model";
import { Edition } from "./edition";
import { Genre } from "./genre";

export interface Book {
    id: number;
    title?: string;
    genreId : number;
    genre?: Genre;
    publishedDate: string;
    numberOfPages: number;
    basePrice: number
    author: Author;
    authorId: number;
    editions: Edition[];
}
