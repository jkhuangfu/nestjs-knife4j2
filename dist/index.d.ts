import type { INestApplication } from '@nestjs/common';
interface Service {
    name: string;
    url: string;
    swaggerVersion: string;
    location: string;
}
export declare function knife4jSetup(app: INestApplication, services: Service[]): Promise<void>;
export {};
