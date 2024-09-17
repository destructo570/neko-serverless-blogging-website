import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
    description: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;

export const UserProfile = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    id: z.string().optional(),
    email: z.string().optional(),
});

export type UserProfileType = z.infer<typeof UserProfile>;

export const Post = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    description: z.string(),
    createdAt: z.string(),
    published: z.boolean(),
    authorId: z.string(),
    coverImage: z.string(),
    author: UserProfile,
})

export type PostType = z.infer<typeof Post>;

export const createComment = z.object({
    parentId: z.string().optional(),
    message: z.string(),
    userId: z.string().optional(),
    postId: z.string(),
});

export type CreateCommentType = z.infer<typeof createComment>;