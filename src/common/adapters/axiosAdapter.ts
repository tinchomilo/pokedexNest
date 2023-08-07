import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/HttpAdapter.interfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private httpAdapter: AxiosInstance = axios;

    async get<T>( url: string ): Promise<T> {
        try {
            const { data } = await this.httpAdapter.get( url );
            return data;

        } catch (error) {
            console.log(error);
            throw new Error( 'Ocurrio un error - consulte logs de app' );
        }
    }
}