import { getServerSession } from 'next-auth';

export async function isAdmin() {
  const session = await getServerSession();
  if (!session?.user) return false;
  
  const role = (session.user as any).role;
  return role === 'admin';
}

export function isAdminClient(session: any) {
  return session?.user?.role === 'admin';
}
