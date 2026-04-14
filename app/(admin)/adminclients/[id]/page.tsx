"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DynamicTable from "../../../commonComponents/dynamicTable";
import FallBackUi from "@/app/commonComponents/fallBackUi";
import Clients from "../../../commonComponents/clients";
import { useRouter } from "next/navigation";
import BulkUpload from "../../Components/bulkUpload"
import BackArrow from "../../../commonComponents/icons"
import Loader from "../../../commonComponents/loader"
import { useDispatch } from "react-redux";
import { setToastNotification } from "@/app/reduxStore/features/tostNotification";


const AdminCustomers = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const params = useParams();
  const id = params?.id;


  const columns = ["name", "city", "state"];

  // ✅ FORM CONFIG (🔥 REQUIRED)
  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
  ];

  const initialValues = {
    name: "",
    city: "",
    state: "",
  };

  useEffect(() => {
    if (id) fetchUserClients(id as string);
  }, [id]);

  const fetchUserClients = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${id}/clients`,
        { credentials: "include" }
      );

      const data = await res.json();

      const formattedData = data.map((item: any) => ({
        id: item.client.id,
        name: item.client.name,
        city: item.client.city,
        state: item.client.state,
      }));

      setClients(formattedData);
    } catch (err) {
      setError("Error fetching clients");
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (formData: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/bulk/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            clients: [formData], // ✅ sending as array (bulk)
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }
      setIsOpen(false);
      fetchUserClients(id as string);
      dispatch(setToastNotification({ status: "success", message: data.message }));
    } catch (error) {
      dispatch(setToastNotification({ status: "error", message: "Error during bulk upload." }));
    }
  };

  const uploadBulk = async (file: File) => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:5000/api/clients/bulk/${id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed Bulk Upload");
      }
      console.log("ahdwe", data.message)
      dispatch(setToastNotification({ status: "success", message: data.message }));
      fetchUserClients(id as string);
    } catch (error) {
      console.error(error);
      dispatch(setToastNotification({ status: "error", message: "Error during bulk upload." }));
    }
  };


  const handleDeleteSelected = async (rows: any[]) => {
    try {
      const ids = rows.map((row) => row.id);
      const res = await fetch("http://localhost:5000/api/clients/Clients_delete", {
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
      console.log("Result:", result);

      dispatch(setToastNotification({ status: "success", message: result.message }));
      fetchUserClients(id as string);

    } catch (error) {
      console.error("Delete failed:", error);
      dispatch(setToastNotification({ status: "error", message: "Delete Failed ❌" }));
    }
  };

  const handleRowAction = (row: any) => {
    router.push(`/admincustmors/${row.id}`)
  };

  const handleRouter = () => {
    setIsOpen(true); // 🔥 open slide
  };

  const backNavigation = () => {
    router.back();
  }

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center px-5 ">
        <button
          onClick={backNavigation}
          className="px-3 py-3 rounded-full bg-gray-400 text-white text-sm
                 hover:bg-gray-500 hover:scale-105
                 transition duration-300 ease-in-out
                 shadow-md hover:shadow-lg"
        >
          <BackArrow />
        </button>
        <BulkUpload
          onUpload={uploadBulk}
          expectedHeaders={["name", "city", "state"]}
          lableName="+ Client Uploads"
        />

      </div>
      {clients.length === 0 ? (
        <FallBackUi
          tittle="No clients found"
          description="Try adding new clients or refresh the page"
        />
      ) : (
        <DynamicTable
          title="Client Details"
          columns={columns}
          data={clients}
          actionLabel="View"
          onRowAction={handleRowAction}
          handleRouters={handleRouter}
          routerButtonName="Add Client"
          handleDeleteSelected={handleDeleteSelected}
        />
      )}


      <Clients
        fields={fields}
        initialValues={initialValues}
        showSlide={isOpen}
        closeSlide={() => setIsOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AdminCustomers;