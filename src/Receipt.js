import React, { useEffect, useState } from "react";
import { Phone, Mail, Globe } from "lucide-react";
import { postData } from "./services/apiAxios";
import Logo from "./components/includes/Logo";

const Receipt = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("login_token");

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const res = await postData("payment-receipt", { userId });
        if (res.code === 200 && res.receipt) {
          setInvoice(res.data);
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, [userId]);


  // ✅ Download PDF (works with your Laravel downloadReceipt method)
const handleDownload = async () => {
  try {
    const res = await postData("download-receipt", { userId });
    if (res.code === 200 && res.data.fileUrl) {
      const link = document.createElement("a");
      link.href = res.data.fileUrl;
      link.download = res.data.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert("Receipt not found or generation failed.");
    }
  } catch (err) {
    console.error("Error downloading receipt:", err);
  }
};
  const iconProps = { size: 18, strokeWidth: 1.5, ariaHidden: false };

  if (loading) return <p>Loading receipt...</p>;
  if (!invoice) return <p>No receipt found.</p>;

  return (
    <section className="content">
      <div className="container">
        <div className="invoice_wrapper text-left p-4">
          <div className="row inv_head clearfix pb-5">
            <div className="col-md-8">
              <Logo />
            </div>
            <div className="col-md-4">
              <p>
                <span style={{ width: "80px", display: "inline-block" }}>
                  Inv No:
                </span>{" "}
                {invoice.no}
              </p>
              <p>
                <span style={{ width: "80px", display: "inline-block" }}>
                  Date:
                </span>{" "}
                {invoice.transactonDate}
              </p>
            </div>
          </div>

          <h1 className="fs-5 text-center">Receipt</h1>

          <div className="p-2">
            <p>
              <span style={{ width: "80px", display: "inline-block" }}>Name:</span>{" "}
              {invoice.name}
            </p>
            <p>
              <span style={{ width: "80px", display: "inline-block" }}>
                Email:
              </span>{" "}
              {invoice.email}
            </p>
            <p>
              <span style={{ width: "80px", display: "inline-block" }}>
                Mobile:
              </span>{" "}
              {invoice.mobile}
            </p>
            {/* <p>
              <span style={{ width: "80px", display: "inline-block" }}>
                Address:
              </span>{" "}
              {invoice.address || "-"}
            </p> */}
          </div>

          <table className="table">
            <thead>
              <tr>
                <th className="text-start">Sr No.</th>
                <th className="text-start">Product</th>
                <th className="text-end amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start">1.</td>
                <td className="text-start">{invoice.product}</td>
                <td className="text-end amount">₹{invoice.productAmount}</td>
              </tr>
            </tbody>
          </table>

          <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-start">Tax (GST)</td>
                    <td className="text-end amount">₹{invoice.tax1}</td>
                  </tr>
                  <tr className="total-row">
                    <td className="text-start">Total Amount</td>
                    <td className="text-end amount">₹{invoice.totalAmount}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      {invoice.textAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-6 pb-4">
            <p>Company info</p>
            <p>
              <Phone {...iconProps} /> +91-22-61672424
            </p>
            <p>
              <Mail {...iconProps} /> feedback@deijobs.in
            </p>
            <p>
              <Globe {...iconProps} />{" "}
              <a href="https://deijobs.in/">https://deijobs.in/</a>
            </p>
          </div>

          <div className="">
            <h4 className="fs-6">Thank You for your Business</h4>
            <p>
              Your payment status:{" "}
              <strong style={{ textTransform: "capitalize" }}>
                {invoice.paymentStatus}
              </strong>
            </p>
            <p>
              You can{" "}
             <button onClick={handleDownload} className="btn btn-primary mt-3">
              Download Invoice PDF
            </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Receipt;
