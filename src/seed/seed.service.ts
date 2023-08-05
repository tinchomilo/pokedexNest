import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/PokeResponse.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    const salida = data.results.map(({url, name}) => {
      const segments = url.split('/');
      const no = segments[segments.length - 2];
      return {
        name,
        no
      }
    })
    console.log(salida)
    return salida;
  }
}
