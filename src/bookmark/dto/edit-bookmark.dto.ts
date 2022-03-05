import { IsNotEmpty, IsOptional, IsString } from "class-validator"

// Since we edit here, everything can be optional! 
export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string
    
    @IsString() 
    @IsOptional()
    description?: string 

    @IsString() 
    @IsOptional()
    link: string 
}