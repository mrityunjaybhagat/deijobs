import React, { useState, useEffect } from "react";
import { getPaymentStatus } from "../../services/profileServices";
import { postData } from "../../services/apiAxios";
import ReactPixel from "react-facebook-pixel";

const PayNowCard = ({ type, BgImge }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("login_token");
  const [showModal, setShowModal] = useState(false);


  // ✅ Make fetchPaymentStatus reusable
  const fetchPaymentStatus = async () => {
    try {
      const response = await getPaymentStatus(userId);
      if (response.code === 200) {
        setPaymentData(response);
      } else {
        setError("No payment data found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment status on component mount
  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  // Razorpay script loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const createOrder = async () => {
    try {
      if (!userId) {
        alert("❌ Please login first to continue");
        return;
      }

      const response = await postData(`payments/create/${userId}`, {});
      if (!response || !response.order_id) {
        alert("⚠️ Could not create order. Please try again later.");
        return;
      }

      const options = {
        key: response.key,
        amount: response.amount * 100,
        currency: response.currency,
        name: "DeiJobs",
        description: "JobSeeker Registration Fee",
        order_id: response.order_id,

        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await postData("payments/verify", {
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              userId: userId,
            });

            if (verifyRes.code === 200 && verifyRes.status === "success") {
              //alert("✅ Payment successful!");
            setShowModal(true);
              // 🔁 Re-fetch payment status to update UI
              setPaymentData(prev => ({ ...prev, status: "success" })); 
// ✅ Facebook Pixel Purchase tracking here
ReactPixel.track("Purchase", {
  value: 499.00,
  currency: "INR",
});

              fetchPaymentStatus(); // confirm updated status
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("⚠️ Payment verification request failed.");
          }
        },

        prefill: {
          name: response.user?.name || "",
          email: response.user?.email || "",
          contact: response.user?.mobile || "",
        },

        theme: { color: "#00559f" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment creation error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {paymentData?.status === "pending" ? (
        <div
          className={`card paynow text-bg-dark w-100 ${type}`}
          style={{
            background: `linear-gradient(0deg, rgba(0, 85, 159, 0.69), rgba(0, 85, 159, 0.69)), url(${BgImge})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p className="card-text">
            Email your resume to <span>5000+ HR Agencies</span> in India at the
            price of a cup of coffee ₹399/- only.
          </p>
          <div className="clearfix" style={{ textAlign: "right" }}>
            <button
              className="btn btn-sm btn-white btn-paynow"
              onClick={createOrder}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <>
        {type === "verticle" && (
        <div className={`w-100 ${type}`}
            style={{
            backgroundColor: '#00559F',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',

          }}>
          ⭐ Premium Member — Your access is active!
        </div>
         )}
      </>

      )}


{/* ✅ Success Modal */}
{showModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-success">Payment Successful 🎉</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body text-center">
          <p>Your payment was completed successfully!</p>
          <p>Thank you for purchasing your JobSeeker registration.</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default PayNowCard;
