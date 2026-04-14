import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideNavBar from "../commonComponents/sideNavBar";
import LogOut from "./logout";


export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/userlogin");
  }
  return (
    <div className="flex gap-7 h-screen">
      <SideNavBar />
      
      <main className="pt-6 overflow-y-auto">
        {children}
      </main>
    </div>

  );
}
