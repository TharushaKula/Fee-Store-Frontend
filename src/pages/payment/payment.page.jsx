import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { getOrderById } from "../../services/api/orders";
function PaymentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((e) => {
          setIsError(true);
          setError(e.message);
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [orderId]);

  // const payment = {
  //   sandbox: true,
  //   merchant_id: "121XXXX", // Replace your Merchant ID
  //   return_url: undefined, // Important
  //   cancel_url: undefined, // Important
  //   notify_url: "http://localhost:8000/api/orders/webhook/payment",
  //   order_id: "ItemNo12345",
  //   items: "Door bell wireles",
  //   amount: order.orderProducts.reduce((acc, el) => acc + (parseFloat(el.productId.price) * el.quantity ), 0),
  //   currency: "LKR",
  //   hash: "45D3CBA93E9F2189BD630ADFE19AA6DC", // *Replace with generated hash retrieved from backend
  //   first_name: order.address.fname,
  //   last_name: order.address.lname,
  //   email: order.address.email,
  //   phone: order.address.phone,
  //   address: order.address.line_1,
  //   city: order.address.city,
  //   country: order.address.country,
  //   delivery_address: order.address.delivery_address,
  //   delivery_city: order.address.delivery_city,
  //   delivery_country: order.address.delivery_country,
  //   custom_1: order.address.custom_1,
  //   custom_2: order.address.custom_2,
  // };

  if (isLoading) {
    return (
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Payment</h1>
        <div className="border mt-4"></div>

        <div className="py-8">
          <div className="flex items-center gap-x-4">
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Payment</h1>
        <div className="border mt-4"></div>

        <div className="py-8">
          <div className="flex items-center gap-x-4">
            <p className="text-red-500">Some error happend: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Payment</h1>
        <div className="grid grid-cols-4 gap-x-4 mt-4">
          <button
            type="button"
            onClick={() => {
              toast.success('Cash on delivery order confirmed');  
              navigate("/profile/orders");       
            }}
            className="border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-black hover:text-white transition"
          >
            Cash On Delivery
          </button>
          <button
            type="button"
            onClick={() => {
              // payhere.startPayment(payment)
            }}
            className="border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-black hover:text-white transition"
          >
            Credit Card
          </button>
        </div>
      </section>
    </div>
  );
}

export default PaymentPage;