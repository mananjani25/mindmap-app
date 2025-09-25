import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";
import { DocumentsContent } from "@/components/documents/DocumentsContent";

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'STUDENT') {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
      <DocumentsContent user={session.user} />
    </MainLayout>
  );
}