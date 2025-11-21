const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const analyticsRouter = require('./routes/analytics');
const cartsRouter = require('./routes/carts');
const adminRouter = require('./routes/admin');
const ordersRouter = require('./routes/orders');
const adminOrdersRouter = require('./routes/adminOrders');
const adminCartsRouter = require('./routes/adminCarts');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));

app.get('/', (req, res) => res.json({ ok: true, message: 'Backend API for Site Web RealTech' }));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/analytics', analyticsRouter);
// legacy/fallback path used by frontend
app.use('/api/analytics_visits', analyticsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin/orders', adminOrdersRouter);
app.use('/api/admin/carts', adminCartsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
