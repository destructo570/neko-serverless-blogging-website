import { UserProfileType } from "@repo/common/config"

export interface UserProfileObject {
    profile: UserProfileType;
    is_logged_in: boolean;
}

export interface ApiResponse<T> {
    [key: string] : T;
}