import React from "react";

function Footer() {
  return (
    <div
      style={{
        background: "#222",
        color: "white",
        padding: "30px 20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <div style={{ width: "250px" }}>
          <h2 style={{ marginBottom: "10px" }}>Sambalpuri Bazaar</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
            Authentic Sambalpuri Handloom Clothing —  
            Men, Women & Kids Collection.
          </p>
        </div>

        {/* Middle Links */}
        <div>
          <h3>Quick Links</h3>
          <p><a href="/men" style={{ color: "white", textDecoration: "none" }}>Men</a></p>
          <p><a href="/women" style={{ color: "white", textDecoration: "none" }}>Women</a></p>
          <p><a href="/kids" style={{ color: "white", textDecoration: "none" }}>Kids</a></p>
          <p><a href="/custom" style={{ color: "white", textDecoration: "none" }}>Custom Orders</a></p>
        </div>

        {/* Contact Section */}
        <div>
          <h3>Contact Us</h3>
          <p>Email: support@sambalpuribazaar.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Sambalpur, Odisha</p>
        </div>
      </div>

      <hr style={{ marginTop: "30px", marginBottom: "10px", borderColor: "#555" }} />

      <p style={{ textAlign: "center", fontSize: "14px" }}>
        © {new Date().getFullYear()} Sambalpuri Bazaar — All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
