import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsContent } from "@/components/settings/SettingsContent";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <MainLayout>
      <SettingsContent user={session.user} />
    </MainLayout>
  );
}