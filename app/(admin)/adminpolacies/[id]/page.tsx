"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { useParams } from "next/navigation"
// import PolicyProgressChart from "../policyChart"
import DashBoardTable from "../../../commonComponents/dashboardTable"
import BackArrow from "../../../commonComponents/icons"
import { useRouter } from "next/navigation"
import BulkUpload from "../../Components/bulkUpload"
import Loader from "../../../commonComponents/loader"
import Clients from "../../../commonComponents/clients"



type Policy = {
    policyStatus: string
    id: number
    policyNumber: string
    coverageType: string
    effectiveDate: string
    bucket: string
    transactionType: string
    nextAction: string
    expiryDate?: string
    policyOutcome?: string
}

const policyStatusList = [
    "Application",
    "Exposure Review/Values review",
    "Loss Runs/Loss Summary",
    "Submission",
    "Re-Marketing",
    "Quote/ Quote Comparison",
    "Proposal",
    "Customer Confirmation",
    "Binding",
    "Invoice",
    "Policy Issued",
    "Policy Check",
    "Certificates",
    "Endorsements",
    "Cancelled",
    "Reinstated",
    "Rewritten"
];
const policyTransectio = [
    "NEW_BUSINESS",
    "RENEWAL"
]
const policyOutcome = ["PENDING",
    "COMPLETED",
    "CANCELLED"]


const PolaciesDashBoard = () => {
    const params = useParams()
    const router = useRouter()
    const memberId = params?.id as string

    const [policyData, setPolicyData] = useState<Policy[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [memberName, setMemberName] = useState("")

    const [filteredData, setFilteredData] = useState<Policy[] | null>(null)
    const [tableTitle, setTableTitle] = useState("")
    const [searchPolicyNum, setSearchPolicyNum] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [policyChart, setPolicyChart] = useState({
        policyStatus: "",
        policyNumber: ""
    });


    const fields = [
        { name: "customerName", label: "Customer Name", type: "text" },
        { name: "policyNumber", label: "Policy Number", type: "text" },
        { name: "coverageType", label: "Coverage Type", type: "text" },
        { name: "transactionType", label: "Transaction Type", type: "text" },
        { name: "effectiveDate", label: "Effective Date", type: "date" },
        { name: "bucket", label: "Bucket", type: "text" },
        { name: "renewalStatus", label: "Renewal Status", type: "text" },
        { name: "nextAction", label: "Next Action", type: "text" },
        { name: "nextActionDue", label: "Next Action Due", type: "date" },
        { name: "assignedTo", label: "Assigned To", type: "text" },
        { name: "expiryDate", label: "Expiry Date", type: "date" },
        { name: "policyStatus", label: "Policy Status", type: "text" },
        { name: "policyOutcome", label: "Policy Outcome", type: "text" },
        { name: "policyType", label: "Policy Type", type: "text" }
    ];
    const initialValues = {
        customerName: "",
        policyNumber: "",
        coverageType: "",
        transactionType: "",
        effectiveDate: "",
        bucket: "",
        renewalStatus: "",
        nextAction: "",
        nextActionDue: "",
        assignedTo: "",
        expiryDate: "",
        policyStatus: "",
        policyOutcome: "",
        policyType: ""
    };

    const HandelAddPolacies = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        if (!memberId) return

        const fetchPolicyData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/policies/${memberId}`,
                    { credentials: "include" }
                )

                if (!response.ok) throw new Error("Failed to fetch")

                const result = await response.json()
                setPolicyData(result.policies || [])
                setMemberName(result.memberName || "")
            } catch (err) {
                console.error(err)
                setError("Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchPolicyData()
    }, [memberId])


    const onSubmit = async (formData: any) => {
        try {
            // ✅ Clean + normalize values
            const payload = {
                customerName: formData.customerName?.trim(),
                policyNumber: formData.policyNumber?.trim(),
                coverageType: formData.coverageType?.trim(),
                transactionType: formData.transactionType?.trim(),
                effectiveDate: formData.effectiveDate,
                bucket: formData.bucket?.trim(),
                renewalStatus: formData.renewalStatus?.trim(),
                nextAction: formData.nextAction?.trim(),
                nextActionDue: formData.nextActionDue,
                assignedTo: formData.assignedTo?.trim(),
                expiryDate: formData.expiryDate,
                policyStatus: formData.policyStatus?.trim(),
                policyOutcome: formData.policyOutcome?.trim(),
                policyType: formData.policyType?.trim(),
            };

            // ✅ Basic validation
            if (!payload.customerName || !payload.policyNumber) {
                alert("Customer Name & Policy Number are required");
                return;
            }

            console.log("Final Payload:", payload);

            // ✅ API CALL (CREATE POLICY)
            const res = await fetch(
                `http://localhost:5000/api/policies/${memberId}`,
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

            if (!res.ok) {
                throw new Error(data?.message || "Failed to create policy");
            }

            // ✅ Success
            alert("Policy created successfully");

            setIsOpen(false);

            // ✅ Refresh data
            window.location.reload(); // or refetch API

        } catch (error: any) {
            console.error("Submit Error:", error.message);
            alert(error.message || "Something went wrong");
        }
    };

    const policySearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPolicyNum(e.target.value)
    }

    const today = new Date()

    /* =============================
       ✅ ADDED BUCKET LOGIC
       ============================= */

    const getBucketStatus = (policy: Policy) => {
        if (!policy.expiryDate) return "-"
        console.log("expiry Date", policy.policyOutcome)
        const expiry = new Date(policy.expiryDate)
        if (isNaN(expiry.getTime())) return "-"

        const diffDays = Math.ceil(
            (expiry.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        )

        if (policy.policyOutcome?.toLowerCase() === ("CANCELLED").toLowerCase()) {
            return "Cancelled"
        }

        if (diffDays >= 90 && diffDays <= 120) return "Planning"
        if (diffDays >= 60 && diffDays <= 89) return "Exposure Review"
        if (diffDays >= 30 && diffDays <= 59) return "Submission"
        if (diffDays >= 15 && diffDays <= 29) return "Proposal"
        if (diffDays >= 0 && diffDays <= 14) return "Binding"
        if (diffDays < 0) return "Expired"
        return "Active"
    }


    const urgentItems = policyData.filter((item) => {
        if (!item.expiryDate) return false
        const diffDays =
            (new Date(item.expiryDate).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        return diffDays >= 1 && diffDays <= 15
    })

    const proposalItems = policyData.filter((item) => {
        if (!item.expiryDate) return false
        const diffDays =
            (new Date(item.expiryDate).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        return diffDays >= 16 && diffDays <= 30
    })

    const renewalStats = policyData.reduce(
        (acc, item) => {
            if (!item.expiryDate) return acc

            const expiryDateVal = new Date(item.expiryDate)
            if (isNaN(expiryDateVal.getTime())) return acc

            const diffDays = Math.ceil(
                (expiryDateVal.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24)
            )

            if (diffDays <= 90) {
                acc.pendingCount++
                acc.pendingItems.push(item)
            } else {
                acc.completedCount++
                acc.completedItems.push(item)
            }

            return acc
        },
        {
            pendingCount: 0,
            completedCount: 0,
            pendingItems: [] as Policy[],
            completedItems: [] as Policy[],
        }
    )

    const polacyBucket = policyData.filter((item) => {
        if (!item.expiryDate) return false
        const diffDate = (new Date(item.expiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        return diffDate >= 30 && diffDate <= 90
    })

    const cancelledItems = policyData.filter(
        (item) => item.policyOutcome?.toLowerCase() === "cancelled"
    )

    const openTable = (title: string, data: Policy[]) => {
        setTableTitle(title)
        setFilteredData(data)
    }



    const resetFilter = () => {
        setFilteredData(null)
        setTableTitle("")
    }

    const searchFilteredData = policyData.filter((item) =>
        item.policyNumber
            .toLowerCase()
            .includes(searchPolicyNum.toLowerCase())
    )

    const displayData =
        searchPolicyNum.trim() !== ""
            ? searchFilteredData
            : filteredData ?? policyData
    console.log("displayData", displayData)
    if (loading) return <Loader />
    if (error) return <p>{error}</p>


    const handleUpdate = async (
        id: number,
        field: string,
        value: string
    ) => {

        setPolicyData((prev) =>
            prev.map((policy) =>
                policy.id === id
                    ? { ...policy, [field]: value }
                    : policy
            )
        )

        try {

            const response = await fetch(
                `http://localhost:5000/api/policy/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        [field]: value
                    }),
                }
            )

            const data = await response.json()

            if (!data.success) {
                console.error("Update failed")
            }

        } catch (error) {

            console.error("Update error:", error)

        }

    }
    let handelPoliciesUpadates = (e: any, policy: any, field: string) =>
        handleUpdate(
            policy.id,
            field,
            e.target.value
        )


    const polacyChartStatus = (policyStatus: string, policyNumber: string) => {
        setPolicyChart((prev) => ({
            ...prev,
            policyStatus: policyStatus,
            policyNumber: policyNumber
        }));
    };


    const uploadBulk = async (file: File) => {
        try {
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`http://localhost:5000/api/policies/bulk/${memberId}`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert("Upload successful");
            // Refresh logic if needed
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    const backNavigation = () => {
        router.back();
    }

    return (
        <>
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
                    <div className="flex justify-ceter items-center gap-5">
                        <BulkUpload
                            onUpload={uploadBulk}
                            expectedHeaders={["name", "city", "state"]}
                            lableName="+ Client Uploads"
                        />



                        {HandelAddPolacies && (
                            <button
                                onClick={HandelAddPolacies}
                                className="bg-orange-200 py-1 px-3 rounded-[10px]"
                            >
                                Add Policies
                            </button>
                        )}

                    </div>

                </div>
            </div>
            <DashBoardTable
                policySearchHandle={policySearchHandle}
                searchPolicyNum={searchPolicyNum}
                memberName={memberName}
                policyData={policyData}
                urgentItems={urgentItems}
                proposalItems={proposalItems}
                renewalStats={renewalStats}
                cancelledItems={cancelledItems}
                openTable={openTable}
                tableTitle={tableTitle}
                filteredData={filteredData}
                resetFilter={resetFilter}
                displayData={displayData}
                getBucketStatus={getBucketStatus}
                policyTransectio={policyTransectio}
                policyStatusList={policyStatusList}
                policyOutcome={policyOutcome}
                handelPoliciesUpadates={handelPoliciesUpadates}
                polacyChartStatus={polacyChartStatus}
                policyChart={policyChart}
            />
            {isOpen && (

                <Clients
                    fields={fields}
                    initialValues={initialValues}
                    showSlide={isOpen}
                    closeSlide={HandelAddPolacies}
                    onSubmit={onSubmit}
                />


            )}
        </>
    )
}

export default PolaciesDashBoard


