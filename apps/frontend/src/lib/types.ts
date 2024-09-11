import { UserProfileType } from "@repo/common/config"

export interface UserProfileObject {
    profile: UserProfileType;
}

export interface ApiResponse<T> {
    [key: string] : T;
}