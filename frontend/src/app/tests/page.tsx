import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";
import { TestsContent } from "@/components/tests/TestsContent";

export default async function TestsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <MainLayout>
      <TestsContent user={session.user} />
    </MainLayout>
  );
}