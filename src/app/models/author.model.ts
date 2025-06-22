import { Address } from "./address";
import { Biography } from "./biography";
import { ContactInfo } from "./contact-info";
import { Education } from "./education";
import { Nationality } from "./nationality";
import { Publisher } from "./publisher";

export interface Author {
    id: number;
    firstName?: string;
    lastName?: string;
    numberOfBooksPublished: number;
    lastPublishedBook?: string;
    dateOfBirth: string;
    nationalityId: number;
    nationality? : Nationality
    biography?: Biography;
    address?: Address;
    contactInfo?: ContactInfo;
    publisherId: number;
    publisher? : Publisher;
    educationId: number;
    education?: Education
}
