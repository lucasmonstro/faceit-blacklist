export interface FaceitIDToken {
  picture: string;
  email: string;
  birthdate: string;
  nickname: string;
  guid: string;
  locale: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  iss: string;
  aud: string;
}
export interface FaceitJWT {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token: string;
}
