"use client";
import { useEffect, useState } from "react";
import DynamicTable from "../../commonComponents/dynamicTable";
import { useRouter } from "next/navigation";
import Loader from "../../commonComponents/loader"
import FallBackUi from "@/app/commonComponents/fallBackUi";
import { useDispatch } from "react-redux";
import { setToastNotification } from "@/app/reduxStore/features/tostNotification";

const AadminDhboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const columns = ["name", "role"];

  const hadnelRegistartion = () => {
    router.push("/registration")
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async (rows: any[]) => {
    try {
      const ids = rows.map((row) => row.id);
      const res = await fetch("http://localhost:5000/api/admin/members_delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids }),


      });

      console.log("Response:", res);

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      const result = await res.json();

      dispatch(setToastNotification({ status: "success", message: result.message }));
      fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error);
      dispatch(setToastNotification({ status: "error", message: "Delete Failed ❌" }));
    }
  };

  // ✅ Row action handler
  const handleRowAction = (row: any) => {
    router.push(`/adminclients/${row.id}`)
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {users.length === 0 ? (
        <FallBackUi
          tittle="No users found"
          description="Try adding new users or refresh the page"
        />
      ) : (
        <DynamicTable
          title="Users Data"
          columns={columns}
          data={users}
          actionLabel="Clients"
          onRowAction={handleRowAction}
          handleRouters={hadnelRegistartion}
          routerButtonName="Add Users"
          handleDeleteSelected={handleDeleteSelected}

        />
      )}
    </div>
  );
};

export default AadminDhboard;