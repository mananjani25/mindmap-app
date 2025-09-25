import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileContent } from "@/components/profile/ProfileContent";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <MainLayout>
      <ProfileContent user={session.user} />
    </MainLayout>
  );
}