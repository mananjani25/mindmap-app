import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";

export default async function StudentsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'STUDENT') {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <header className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Students
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Manage student accounts and track their progress.
          </p>
        </header>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <p className="text-gray-600">Student management coming soon...</p>
        </div>
      </div>
    </MainLayout>
  );
}