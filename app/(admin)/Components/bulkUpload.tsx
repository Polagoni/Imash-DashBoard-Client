import React, { ChangeEvent } from "react";

interface BulkUploadProps {
  onUpload: (file: File) => void;
  expectedHeaders?: string[]; // e.g., ["name", "city", "state"]
  lableName?: string;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ onUpload, expectedHeaders, lableName }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      onUpload(file);
    } else {
      alert("Please upload a .csv, .xlsx, or .xls file");
    }

    // Reset input so the same file can be uploaded again if needed
    event.target.value = "";
  };

  return (
    <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition font-medium text-sm flex items-center justify-center">
      {lableName}
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default BulkUpload;
