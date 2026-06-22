/** 
 * Clase encargada de construir las respuestas del api estándar.
 */

export class ResponseHelper {
  /**
   * Respuesta exitosa
   */
  static success( data: any, statusCode: number = 200 ) {
    return { success: true, statusCode, data };
  }
  /**
   * Respuesta de error
   */
  static error( data: any, statusCode: number = 400 ) {
    return { success: false, statusCode, data };
  }

};