import './App.css';
import axios from "axios";
import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  };

  const mainButton = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #8b0000, #b22222)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px"
  };

  const smallButton = {
    padding: "6px 10px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "3px"
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setAdminPassword("");
    } else {
      alert("Wrong Password!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !message) {
      alert("Please fill all fields");
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`http://localhost:8080/api/contact/${editId}`, {
          name, mobile, message
        });
        alert("Order Updated Successfully ✏️");
        setEditId(null);
      } else {
        await axios.post("http://localhost:8080/api/contact", {
          name, mobile, message
        });
        alert("Order Sent Successfully 🙏");
      }

      setName("");
      setMobile("");
      setMessage("");

    } catch (error) {
      alert("Error saving order");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/contact");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/contact/${id}`);
      fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#fafafa" }}>

      {/* HERO */}
      <header style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(to right, #fff7e6, #ffe0b3)"
      }}>
        <h1 style={{ fontSize: "60px", color: "#8b0000" }}>
          Swami Swad
        </h1>
        <p style={{ fontSize: "22px", marginBottom: "40px" }}>
          Authentic White Ukadache Modak
        </p>
        <img
          src="/modak.jpeg"
          alt="Modak"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}
        />
      </header>

      {/* ORDER CARD */}
      <section style={{
        display: "flex",
        justifyContent: "center",
        padding: "60px 20px"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ textAlign: "center" }}>
            {editId ? "Update Order" : "Place Your Order"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name"
              value={name} onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input type="tel" placeholder="Mobile Number"
              value={mobile} onChange={(e) => setMobile(e.target.value)}
              maxLength="10" style={inputStyle}
            />

            <textarea placeholder="Your Order Details"
              value={message} onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, height: "100px" }}
            />

            <button type="submit" disabled={loading} style={mainButton}>
              {loading ? "Processing..." :
                editId ? "Update Order" : "Submit Order"}
            </button>
          </form>
        </div>
      </section>

      {/* ADMIN */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f5f5f5" }}>
        {!isAdmin ? (
          <div style={{ textAlign: "center" }}>
            <h2>Admin Login</h2>
            <input type="password"
              placeholder="Enter Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{ ...inputStyle, maxWidth: "250px", margin: "auto" }}
            />
            <button onClick={handleAdminLogin}
              style={{ ...mainButton, maxWidth: "250px", margin: "10px auto" }}>
              Login
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: "900px", margin: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h2>Admin Dashboard</h2>
              <button onClick={fetchOrders} style={{ ...mainButton, maxWidth: "200px" }}>
                Load Orders
              </button>
              <button onClick={() => setIsAdmin(false)}
                style={{ ...smallButton, backgroundColor: "#777" }}>
                Logout
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
              }}>
                <thead style={{ backgroundColor: "#8b0000", color: "white" }}>
                  <tr>
                    <th style={{ padding: "12px" }}>ID</th>
                    <th style={{ padding: "12px" }}>Name</th>
                    <th style={{ padding: "12px" }}>Mobile</th>
                    <th style={{ padding: "12px" }}>Message</th>
                    <th style={{ padding: "12px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ textAlign: "center" }}>
                      <td style={{ padding: "10px" }}>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.mobile}</td>
                      <td>{order.message}</td>
                      <td>
                        <button
                          onClick={() => {
                            setName(order.name);
                            setMobile(order.mobile);
                            setMessage(order.message);
                            setEditId(order.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          style={{ ...smallButton, backgroundColor: "orange" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          style={{ ...smallButton, backgroundColor: "red" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section style={{
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#fff7e6"
      }}>
        <h2>Contact Us</h2>
        <p><strong>Owner:</strong> Swami Swad</p>
        <p><strong>Phone:</strong> 9876543210</p>
        <p><strong>Email:</strong> swamiswad@gmail.com</p>
        <p><strong>Location:</strong> Your City Name</p>
      </section>

      <footer style={{
        textAlign: "center",
        padding: "15px",
        backgroundColor: "#8b0000",
        color: "white"
      }}>
        © 2026 Swami Swad | Authentic Ukadache Modak
      </footer>

    </div>
  );
}

export default App;
