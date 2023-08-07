import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/PokeResponse.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axiosAdapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
    // const pokemonToInsertPromise = [];
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({url, name}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({name, no});
      // pokemonToInsertPromise.push(this.pokemonModel.create({name, no}));
    })
    // await Promise.all(pokemonToInsertPromise);
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';

  }
}
