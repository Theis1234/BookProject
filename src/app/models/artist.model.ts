import { ArtistCover } from "./artistcover.model";

export interface Artist {
    id: number;
    firstName?: string;
    lastName?: string;
    nationality?: string;
    dateOfBirth: string;
    artistCovers: ArtistCover[]
}
