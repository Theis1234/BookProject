import { Address } from "./address";
import { Biography } from "./biography";
import { ContactInfo } from "./contact-info";

export interface AuthorDTO {
    firstName?: string;
    lastName?: string;
    numberOfBooksPublished: number;
    lastPublishedBook?: string;
    dateOfBirth: string;
    nationalityId: number;
    publisherId : number;
    biography : Biography;
    address : Address;
    contactInfo : ContactInfo;
    educationId : number;
}
