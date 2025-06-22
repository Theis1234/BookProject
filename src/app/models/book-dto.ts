import { Edition } from "./edition";

export interface BookDTO {
    title: string;
    genreId: number;
    publishedDate: string;
    numberOfPages: number;
    basePrice: number;
    authorId: number;
    editions: Edition[];
}
