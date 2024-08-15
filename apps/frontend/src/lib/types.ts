import { UserProfileType } from "../../../../packages/common/dist"

export interface UserProfileObject {
    profile: UserProfileType;
    is_logged_in: boolean;
}

export interface ApiResponse<T> {
    [key: string] : T;
}