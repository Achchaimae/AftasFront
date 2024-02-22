export interface AuthenticationResponse {
    user:{
      role:string
    },
    access_token: string,
    refresh_token?: string,
  }
  