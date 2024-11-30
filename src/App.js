import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./Invoice";

const App = () => {
  const invoiceRef = useRef(); // Ref for Invoice Component

  const [invoiceData, setInvoiceData] = useState({
    name: "",
    address: "",
    gstin: "",
    billNo: "",
    date: "",
    items: [],
    bankDetails: {
      bankName: "AXIS BANK Magob-Surat (GJ) 395010 Surat",
      accountNo: "916020029029992",
      ifscCode: "UTIB0001060",
    },
    taxes: { cgst: 2.5, sgst: 2.5, igst: 0 },
  });

  const [item, setItem] = useState({
    description: "",
    hsn: "",
    qty: "",
    rate: "",
  });
  console.log(invoiceData.currents);
  const handlePrint = useReactToPrint({
    
    content: () => invoiceRef.current, // Reference to the Invoice Component
  });

  const handleAddItem = () => {
    const amount = Number(item.qty) * Number(item.rate);
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { ...item, amount }],
    }));
    setItem({ description: "", hsn: "", qty: "", rate: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>

      {/* Invoice Details Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={invoiceData.name}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, name: e.target.value })
            }
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={invoiceData.address}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, address: e.target.value })
            }
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="GSTIN"
            value={invoiceData.gstin}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, gstin: e.target.value })
            }
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Bill No."
            value={invoiceData.billNo}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, billNo: e.target.value })
            }
            className="border px-4 py-2 rounded"
          />
          <input
            type="date"
            value={invoiceData.date}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, date: e.target.value })
            }
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Item Addition Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Add Item</h2>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="HSN Code"
              value={item.hsn}
              onChange={(e) => setItem({ ...item, hsn: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.qty}
              onChange={(e) => setItem({ ...item, qty: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
              className="border px-4 py-2 rounded"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Invoice Preview */}
      <div ref={invoiceRef}>  
        <Invoice data={invoiceData} />
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default App;
