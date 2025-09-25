import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <header className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            User Management
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Manage all user accounts and permissions.
          </p>
        </header>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <p className="text-gray-600">User management coming soon...</p>
        </div>
      </div>
    </MainLayout>
  );
}