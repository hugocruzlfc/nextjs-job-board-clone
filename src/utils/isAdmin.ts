import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}
