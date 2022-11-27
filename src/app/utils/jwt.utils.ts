interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
}


export class JwtUtils {
  public static getHead<T>(jwt: string): T {
    const payload = jwt.split('.')[0];
    return JSON.parse(atob(payload));
  }


  public static getPayload<T extends JwtPayload>(jwt: string): T {
    const payload = jwt.split('.')[1];
    return JSON.parse(atob(payload));
  }


  public static getSignature<T>(jwt: string): T {
    const payload = jwt.split('.')[2];
    return JSON.parse(atob(payload));
  }


  public static isExpired(jwt: string): boolean {
    if (!jwt) {
      return true;
    }
    const payload = JwtUtils.getPayload(jwt);
    return Date.now() >= payload.exp * 1000;
  }
}
