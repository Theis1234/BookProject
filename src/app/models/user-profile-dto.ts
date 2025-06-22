export interface UserProfileDTO {
    id : number,
    username : string,
    firstName? : string,
    lastName? : string,
    role: string,
    age : Number,
    pictureUrl? : string,
    bio? : string
}
