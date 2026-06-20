export function sanitizeUser(user: any) {
  const { authUser, ...userData } = user;

  return {
    ...userData,
    email: authUser?.email,
  };
}
