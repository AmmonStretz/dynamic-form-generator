
export interface StatusServiceConfig {
  saveInUrlParameters: boolean;
  saveInCookie: boolean;
}

export class StatusService {

  public loadStatus() {
    let queryParams = new URLSearchParams(window.location.search);
    let a = queryParams.get('status');
  }

  static readParameters(): { [key: string]: any } {
    return null;
  }
  static saveParameters(params: { [key: string]: any }): void {
  }
  /**
   * URL PARAMETERS
   */
  static readFromURL(): { [key: string]: any } {
    let queryParams = new URLSearchParams(window.location.search);
    return null;
  }
  static saveToURL(params: { [key: string]: any }): void {

  }
  /**
   * COOKIES
   */
  static readFromCOOKIES(): { [key: string]: any } {
    return null;
  }
  static saveToCOOKIES(params: { [key: string]: any }): void {

  }
  /**
   * HELPER FUNCTIONS
   */
  public static parseValuesToUrl(values: any): string {
    let params = []
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        if (values[key] != null) {
          params.push(key + '=' + values[key]);
        }
      }
    }
    if (params.length > 0) {
      return '?' + params.join('&')
    }
    return '';
  }
}