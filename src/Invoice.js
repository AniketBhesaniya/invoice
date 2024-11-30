import React from "react";

const Invoice = ({ data }) => {
  const { name, address, gstin, billNo, date, items, bankDetails, taxes } = data;
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const cgst = (subtotal * taxes.cgst) / 100;
  const sgst = (subtotal * taxes.sgst) / 100;
  const igst = (subtotal * taxes.igst) / 100;
  const total = subtotal + cgst + sgst + igst;

  return (
    <div className="p-6 bg-white border border-gray-300 rounded shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Laxmi Creation</h1>
          <p className="text-sm font-semibold">Narrow Woven Fabric</p>
        </div>
        <div>
          <p className="font-semibold">GSTIN: 24AOKPR5523B1Z5</p>
          <p>PAN No: AOKPR5523B</p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mt-4">
        <p>Name: {name || "________________"}</p>
        <p>Address: {address || "________________"}</p>
        <p>GSTIN: {gstin || "________________"}</p>
        <p>Bill No: {billNo || "________________"}</p>
        <p>Date: {date || "________________"}</p>
      </div>

      {/* Item Table */}
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">No.</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">HSN Code</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1">{item.hsn}</td>
              <td className="border px-2 py-1">{item.qty}</td>
              <td className="border px-2 py-1">{item.rate}</td>
              <td className="border px-2 py-1">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="mt-4">
        <p>Subtotal: {subtotal.toFixed(2)}</p>
        <p>CGST: {cgst.toFixed(2)}</p>
        <p>SGST: {sgst.toFixed(2)}</p>
        <p>IGST: {igst.toFixed(2)}</p>
        <p className="font-bold">Total: {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Invoice;
