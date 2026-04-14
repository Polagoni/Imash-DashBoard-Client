import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import SideNavBar from "../commonComponents/sideNavBar";
import ToastNotification from "../commonComponents/toastNotification";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ❌ don't use await
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  // 🔒 No token → redirect
  if (!token) {
    redirect("/");
  }

  try {
    const decoded: any = jwt.verify(token, "shan@polagoni");

    if (decoded.role !== "admin") {
      redirect("/");
    }

  } catch (error) {

    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div>
        <ToastNotification />
      </div>

      <aside className="w-[250px] hidden md:block">
        <SideNavBar />
      </aside>
      <main className="flex-1 p-4 bg-gray-200 overflow-auto">
        {children}
      </main>

    </div>
  );
}