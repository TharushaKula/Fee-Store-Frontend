import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function OrderHistoryPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`http://localhost:8000/api/orders/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setOrderHistory(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
          console.error("Failed to fetch order history", error);
        });
    }
  }, [isSignedIn, user]);

  console.log("This is order history",orderHistory);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (isLoading) {
    return <div>Loading your order history...</div>;
  }

  if (isError || orderHistory.length === 0) {
    return <div>No order history available.</div>;
  }

  return (
    <section className="py-8 px-16">
      <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Address:</strong> {order.address.fname} {order.address.lname}, {order.address.city}</p>
            <p><strong>Products:</strong></p>
            <ul className="ml-4">
              {order.orderProducts.map((product) => (
                <li key={product.productId?._id || product._id}>
                  <strong>{product.productId?.name || "Unknown Product"}</strong> - {product.quantity} pcs - ${product.productId?.price || 0}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">
              Total Price: ${order.orderProducts.reduce((acc, item) => acc + (parseFloat(item.productId?.price || 0) * item.quantity), 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderHistoryPage;
