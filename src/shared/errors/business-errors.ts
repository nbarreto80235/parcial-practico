/*
export function BusinessLogicException(message: string, type: number) {
    this.message = message;
    this.type = type;  
  } 
*/

export class BusinessLogicException extends Error {
    public type: BusinessError;
  
    constructor(message: string, type: BusinessError) {
      super(message);
      this.name = 'BusinessLogicException';
      this.type = type;
    }
  
    static validateTypeProduct(type: string): void {
      if (!['Perecedero', 'No perecedero'].includes(type)) {
        throw new BusinessLogicException('The type of product must be "Perecedero" or "No perecedero"', BusinessError.BAD_REQUEST);
      }
    }
    
  }  
  
  export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST
  }