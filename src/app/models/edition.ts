import { Book } from "./book.model";

export interface Edition {
    id : number,
    format : string,
    releaseDate : string,
    bookId : number,
    book : Book
}
