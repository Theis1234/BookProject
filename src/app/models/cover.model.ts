import { Artistcover } from "./artistcover.model";
import { Book } from "./book.model";

export interface Cover {
    id: number;
    title: string;
    digitalOnly: boolean;
    book?: Book;
    bookId: number;
    artistCovers: Artistcover[];
}
