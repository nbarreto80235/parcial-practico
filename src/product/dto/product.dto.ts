import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly price: string;

    @IsString()
    @IsNotEmpty()
    readonly type: string;
}
