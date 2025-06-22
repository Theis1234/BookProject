import { Artist } from "./artist.model";

export interface Award {
    id : number,
    name : string,
    dateReceived : string,
    description?: string,
    artistId : number,
    artist : Artist

}
