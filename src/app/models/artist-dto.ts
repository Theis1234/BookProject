import { Address } from "./address";
import { ArtistCover } from "./artistcover.model";
import { Award } from "./award";
import { ContactInfo } from "./contact-info";
import { NationalityDTO } from "./nationality-dto";
import { SocialLinks } from "./social-links";

export interface ArtistDTO {
    firstName: string,
    lastName: string,
    nationality: NationalityDTO,
    contactInfo: ContactInfo,
    address : Address,
    awards : Award[],
    socialLinks : SocialLinks,
    dateOfBirth : string
}
