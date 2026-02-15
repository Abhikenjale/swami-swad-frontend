import './App.css';
import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://swami-swad-backend.onrender.com";

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

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        username: "admin",
        password: adminPassword
      });

      if (response.status === 200) {
        setIsAdmin(true);
        setAdminPassword("");
      }
    } catch (error) {
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
        await axios.put(`${BASE_URL}/api/contact/${editId}`, {
          name, mobile, message
        });
        alert("Order Updated Successfully ✏️");
        setEditId(null);
      } else {
        await axios.post(`${BASE_URL}/api/contact`, {
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
      const response = await axios.get(`${BASE_URL}/api/contact`);
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
      await axios.delete(`${BASE_URL}/api/contact/${id}`);
      fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#fafafa" }}>

      <header style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(to right, #fff7e6, #ffe0b3)"
      }}>
        <h1 style={{ fontSize: "60px", color: "#8b0000" }}>
          Swami Swaad
        </h1>
        <p style={{ fontSize: "22px", marginBottom: "40px" }}>
          Authentic White Ukadache Modak
        </p>
        <img
          src="/modak.jpeg"
          alt="Fresh White Ukadache Modak - Traditional Indian Sweet"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}
        />
      </header>

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

      {/* Certificates Section */}
      <section style={{
        padding: "60px 20px",
        backgroundColor: "#fff",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "36px", color: "#8b0000", marginBottom: "40px" }}>
          Our Certifications
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Certificate 1 - Replace /certificate1.jpg with your actual certificate image */}
          <div style={{
            flex: "1 1 400px",
            maxWidth: "450px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}>
            <img
              src="/certificate1.jpg"
              alt="Food Safety Certificate - Swami Swaad"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ddd"
              }}
            />
            <p style={{ marginTop: "15px", fontSize: "16px", color: "#555" }}>
              Certificate 1
            </p>
          </div>

          {/* Certificate 2 - Replace /certificate2.jpg with your actual certificate image */}
          <div style={{
            flex: "1 1 400px",
            maxWidth: "450px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}>
            <img
              src="/certificate2.jpg"
              alt="Quality Certificate - Swami Swaad"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ddd"
              }}
            />
            <p style={{ marginTop: "15px", fontSize: "16px", color: "#555" }}>
              Certificate 2
            </p>
          </div>
        </div>
      </section>

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

      {/* Contact Info Section */}
      <section style={{
        padding: "40px 20px",
        backgroundColor: "#fff7e6",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "32px", color: "#8b0000", marginBottom: "30px" }}>
          Contact Us
        </h2>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "2"
        }}>
          <p style={{ fontSize: "18px", color: "#333" }}>
            📞 <strong>Phone:</strong> <a href="tel:+919876543210" style={{ color: "#8b0000", textDecoration: "none" }}>+91 7709055577</a>
          </p>
          <p style={{ fontSize: "18px", color: "#333" }}>
            📧 <strong>Email:</strong> <a href="mailto:info@swamiswaad.com" style={{ color: "#8b0000", textDecoration: "none" }}>info@swamiswaad.com</a>
          </p>
          <p style={{ fontSize: "18px", color: "#333" }}>
            📍 <strong>Address:</strong> Dhanori-pune, Maharashtra, India
          </p>
          <p style={{ fontSize: "18px", color: "#333", marginTop: "20px" }}>
            🕒 <strong>Business Hours:</strong> 9:00 AM - 8:00 PM (All Days)
          </p>
        </div>
      </section>

      <footer style={{
        textAlign: "center",
        padding: "15px",
        backgroundColor: "#8b0000",
        color: "white"
      }}>
        © 2026 Swami Swaad | Authentic Ukadache Modak
      </footer>

    </div>
  );
}

export default App;