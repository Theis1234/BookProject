import { ArtistCover } from "./artistcover.model";

export interface CreateArtistDTO {
    firstName: string,
    lastName: string,
    nationality: string,
    dateOfBirth: string;
}
