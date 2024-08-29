export interface IMemberBase {
  name: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
}
export interface IMember extends IMemberBase {
  id: number;
}

export interface MemberTokensBase {
  memberId: number;
  refreshToken: string;
}

export interface MemberTokens extends MemberTokensBase {
  id: number;
}
