import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel:Model<Pokemon>
    ){}

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExeptionError( error );
    }
  }

  async findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {

    let pokemon: Pokemon;
    if( !isNaN(+term) )
      pokemon = await this.pokemonModel.findOne({ no: term });

    if( !pokemon && isValidObjectId(term) )
      pokemon = await this.pokemonModel.findById( term );

    if( !pokemon )
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim()});

    if( !pokemon )
      throw new BadRequestException( `No existe el id, no o name para el pokemon ${term} solicitado` );

      return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( term );

    if( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne( updatePokemonDto );
      return { ...pokemon.toJSON(), ...updatePokemonDto }

    } catch (error) {
      this.handleExeptionError( error );
    }
  }

  async remove(id: string) {
    // una manera
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();

    // otra manera
    // return await this.pokemonModel.findByIdAndDelete( id ) ;

    //la más optima porque solo realizo una consulta a la base d e datos. Desestructuro 
    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    if( deletedCount === 0)
      throw new BadRequestException(`no existe un pokemon con el id ${id}`);
    return;

  }

  handleExeptionError(error: any) {
    if(error.code === 11000)
      throw new BadRequestException( `El pokemon ${ JSON.stringify(error.keyValue) } existe en la  db` );
    console.log(error);
    throw new InternalServerErrorException(`No se puede crear pokemon - consultar logs de app`);
  }
}
