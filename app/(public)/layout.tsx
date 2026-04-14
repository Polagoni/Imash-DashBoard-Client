import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  // If already logged in → redirect to dashboard
  if (token) {
    redirect("/");
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}