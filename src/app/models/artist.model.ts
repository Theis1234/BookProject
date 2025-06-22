import { Address } from "./address";
import { ArtistCover } from "./artistcover.model";
import { Award } from "./award";
import { ContactInfo } from "./contact-info";
import { Nationality } from "./nationality";
import { SocialLinks } from "./social-links";

export interface Artist {
    id: number;
    firstName?: string;
    lastName?: string;
    nationalityId : string,
    nationality?: Nationality,
    contactInfo : ContactInfo,
    address? : Address,
    awards? : Award[],
    dateOfBirth: string;
    artistCovers: ArtistCover[]
    socialLinks : SocialLinks
}
