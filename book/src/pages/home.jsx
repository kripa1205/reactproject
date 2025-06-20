import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './pages/pages';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginSignupPage from './pages/LoginSignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/login" element={<LoginSignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const LoginSignupPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/');
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Login / Sign Up</h2>
      <Form onSubmit={handleLogin} className="w-50 mx-auto">
        <Form.Group controlId="formUsername">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Kripa"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3 w-100" variant="primary">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default LoginSignupPage;




import React, { useEffect, useState } from 'react';
import ProductCard from '../component/productcard';
import { Container, Row, Col } from 'react-bootstrap';

const Pages = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    const storedUser = localStorage.getItem('username');
    if (storedUser) setUser(storedUser);
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Welcome, {user || 'Guest'} 👋</h2>

      {categories.map((category, idx) => (
        <div key={idx} className="mb-5">
          <h4 className="mb-3 text-capitalize">{category}</h4>
          <Row>
            {products
              .filter(product => product.category === category)
              .map(product => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default Pages;




import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>{product.subcategory}</strong>
          <br />
          ₹{product.price}
        </Card.Text>
        <Button variant="success" className="w-100">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;





import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import PaymentOptions from '../component/PaymentOptions';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [paymentMode, setPaymentMode] = useState('');
  const navigate = useNavigate();

  const handlePayment = () => {
    if (paymentMode) {
      navigate('/thankyou');
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4">Checkout</h3>

      <Form>
        <Form.Group className="mb-4">
          <Form.Label>Select Payment Method</Form.Label>
          <PaymentOptions selected={paymentMode} onChange={setPaymentMode} />
        </Form.Group>
        <Button variant="primary" onClick={handlePayment}>
          Pay Now
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;



import React from 'react';
import { Form } from 'react-bootstrap';

const PaymentOptions = ({ selected, onChange }) => {
  return (
    <>
      <Form.Check
        type="radio"
        label="Cash on Delivery"
        value="COD"
        checked={selected === 'COD'}
        onChange={(e) => onChange(e.target.value)}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="UPI / QR Code"
        value="UPI"
        checked={selected === 'UPI'}
        onChange={(e) => onChange(e.target.value)}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="Debit / Credit Card"
        value="Card"
        checked={selected === 'Card'}
        onChange={(e) => onChange(e.target.value)}
        className="mb-3"
      />

      {selected === 'Card' && (
        <>
          <Form.Control placeholder="Card Number" className="mb-2" />
          <Form.Control placeholder="Name on Card" className="mb-2" />
          <Form.Control placeholder="Expiry (MM/YY)" className="mb-2" />
          <Form.Control placeholder="CVV" className="mb-3" />
        </>
      )}
    </>
  );
};

export default PaymentOptions;





import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <Alert variant="success">
        <h2 className="mb-3">🎉 Thank you for your order!</h2>
        <p>Your groceries will be delivered to your address shortly.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Alert>
    </Container>
  );
};

export default ThankYouPage;



backend now :-

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utilities/connectdb');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productroutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});





const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;





const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);




const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productcontrollers');

router.get('/', getProducts);

module.exports = router;

done
