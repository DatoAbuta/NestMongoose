import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    lastname: string;
    @Prop({required: true})
    age:number;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    isSmoker: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User)