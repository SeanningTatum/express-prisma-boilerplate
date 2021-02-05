/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';

declare module 'express-validation' {
    export declare function validate(
        schema: schema, options?: EvOptions, joiRoot?: ValidationOptions
    ): RequestHandler<any, any, any, any>
}
