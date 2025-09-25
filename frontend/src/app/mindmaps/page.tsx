import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";
import { MindmapsContent } from "@/components/mindmaps/MindmapsContent";

export default async function MindmapsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'STUDENT') {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
      <MindmapsContent user={session.user} />
    </MainLayout>
  );
}