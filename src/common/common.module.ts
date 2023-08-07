import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axiosAdapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
