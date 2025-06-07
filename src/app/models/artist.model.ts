import { Artistcover } from "./artistcover.model";

export interface Artist {
    id: number;
    firstName?: string;
    lastName?: string;
    nationality?: string;
    dateOfBirth: string;
    artistCovers: Artistcover[]
}
