import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Pokemon extends Document {

    @Prop({
        type: String,
        unique: true,
        index: true
    })
    name;

    @Prop({
        type: Number,
        unique: true,
        index: true
    })
    no;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
