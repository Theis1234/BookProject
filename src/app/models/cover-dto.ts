import { ArtistCover } from "./artistcover.model";
import { Book } from "./book.model";

export interface CoverDTO {
    title: string,
    digitalOnly: boolean,
    bookId: number,
    artistIds: number[]
}
