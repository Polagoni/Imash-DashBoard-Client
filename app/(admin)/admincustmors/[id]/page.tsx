"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import DynamicTable from "../../../commonComponents/dynamicTable";
import FallBackUi from "@/app/commonComponents/fallBackUi";
import Clients from "../../../commonComponents/clients";
import BulkUpload from "../../Components/bulkUpload";
import BackArrow from "../../../commonComponents/icons"
import Loader from "../../../commonComponents/loader"
import { useDispatch } from "react-redux";
import { setToastNotification } from "@/app/reduxStore/features/tostNotification";

const AdminCustomers = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  // ✅ ONLY REQUIRED FIELDS
  const columns = ["name", "phone", "status"];

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "status", label: "Status", type: "text" },
  ];

  const initialValues = {
    name: "",
    phone: "",
    status: "",
  };

  const handelSetOpen = () => {
    setIsOpen(false)
  }

  // ============================
  // ✅ FETCH MEMBERS
  // ============================
  useEffect(() => {
    if (id) fetchMembers();
  }, [id]);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/members/client/${id}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setClients(data.members || []);

    } catch (err) {
      console.error(err);
      setError("Error fetching members");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // ✅ MANUAL INPUT (FIXED)
  // ============================
  const onSubmit = async (formData: any) => {
    try {
      const name = String(formData.name || "").trim();
      const phone = String(formData.phone || "").trim();
      let status = String(formData.status || "ACTIVE").trim().toUpperCase();

      if (!name || !phone) {
        alert("Name & Phone required");
        return;
      }

      // ✅ only allow valid values
      if (!["ACTIVE", "INACTIVE"].includes(status)) {
        status = "ACTIVE";
      }

      const payload = {
        members: [{ name, phone, status }],
      }

      console.log("Final Payload:", payload);

      const res = await fetch(
        `http://localhost:5000/members/bulk/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setIsOpen(false);
      fetchMembers();
      dispatch(setToastNotification({
        status: "success",
        message: "Member added successfully",
      }));

    } catch (err) {
      dispatch(setToastNotification({
        status: "error",
        message: "Failed to add member",
      }));
    }
  };

  // ============================
  // ✅ FILE UPLOAD (FIXED)
  // ============================
  const uploadBulk = async (file: File) => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      const ext = file.name.split(".").pop()?.toLowerCase();

      if (!["csv", "xlsx", "xls"].includes(ext || "")) {
        alert("Only CSV / Excel files allowed");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `http://localhost:5000/members/bulk/${id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setToastNotification({
        status: "success",
        message: `Uploaded ${data.addedCount} members`,
      }));
      fetchMembers();

    } catch (err) {
      console.error(err);
      dispatch(setToastNotification({
        status: "error",
        message: "Upload failed",
      }));
    }
  };


  const handleDeleteSelected = async (rows: any[]) => {
    try {
      const ids = rows.map((row) => row.id);
      console.log("ids", ids)
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
      console.log("Result:", result);

      dispatch(setToastNotification({
        status: "success",
        message: "Deleted Successfully ",
      }));
      fetchMembers();

    } catch (error) {
      console.error("Delete failed:", error);
      dispatch(setToastNotification({
        status: "error",
        message: "Delete Failed   ",
      }));
    }
  };

  const backNavigation = () => {
    router.back();
  }

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Upload */}
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
          expectedHeaders={["name", "phone", "status"]}
          lableName="+ Customers Uploads"
        />

      </div>

      {/* Table / Empty */}
      {clients.length === 0 ? (
        <FallBackUi
          tittle="No members found"
          description="Add members or upload file"
        />
      ) : (
        <DynamicTable
          title="Customers"
          columns={columns}
          data={clients}
          actionLabel="View"
          routerButtonName="Add Member"
          onRowAction={(row) => router.push(`/adminpolacies/${row.id}`)}
          handleRouters={() => setIsOpen(true)}
          handleDeleteSelected={handleDeleteSelected}
        />
      )}

      {/* Form */}
      {isOpen && (
        <Clients
          fields={fields}
          initialValues={initialValues}
          showSlide={isOpen}
          closeSlide={handelSetOpen}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default AdminCustomers;