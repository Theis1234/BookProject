import { ArtistCover } from "./artistcover.model";
import { Book } from "./book.model";

export interface CreateCoverDTO {
    title: string,
    digitalOnly: boolean,
    bookId: number,
    artistIds: number[]
}
