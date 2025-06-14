import { Artist } from "./artist.model";
import { Cover } from "./cover.model";

export interface ArtistCover {
    artist: Artist
    artistId: number;
    cover: Cover;
    coverId: number;
}
