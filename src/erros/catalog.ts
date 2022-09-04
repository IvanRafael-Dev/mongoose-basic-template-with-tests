export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  message: string
  statusCode: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    statusCode: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    statusCode: 400,
  },
};

export default { teste: 'oi' };