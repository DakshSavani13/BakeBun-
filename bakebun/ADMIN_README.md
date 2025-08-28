# BakeBun Admin Panel

A comprehensive admin panel for managing the BakeBun website with user management, statistics, and administrative functions.

## Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected admin routes
- Secure password hashing

### 📊 Dashboard
- Real-time statistics
- User count overview
- Admin vs regular user breakdown
- New user registrations (last 7 days)

### 👥 User Management
- View all registered users
- Search and filter users
- Edit user roles (Admin/User)
- Delete users
- User registration date tracking

### 🎨 Modern UI
- Material-UI components
- Responsive design
- Mobile-friendly interface
- Professional admin layout

## Getting Started

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 2. Create Admin User
```bash
cd server
npm run create-admin
```

This creates a default admin user:
- **Email**: admin@pizza.com
- **Password**: admin123
- **Role**: admin

### 3. Frontend Setup
```bash
cd bakebun
npm install
npm run dev
```

## Admin Panel Access

### Login as Admin
1. Go to `/login` page
2. Use admin credentials:
   - Email: `admin@bakebun.com`
   - Password: `admin123`
3. You'll be automatically redirected to `/admin`

### Admin Routes
- `/admin` - Main dashboard with statistics
- `/admin/users` - User management page
- `/admin/menu` - Menu items management
- `/admin/orders` - Order management
- `/admin/settings` - System settings

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Admin (Protected)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/menu` - Get all menu items
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get order by ID
- `PUT /api/admin/orders/:id/status` - Update order status
- `DELETE /api/admin/orders/:id` - Delete order

## User Management Features

### View Users
- Complete user list with pagination
- User details: name, email, phone, role, join date
- Role-based color coding (Admin/User)

### Search & Filter
- Search by name, email, or phone
- Filter by user role
- Clear filters option

### Edit Users
- Change user roles (Admin ↔ User)
- Confirmation dialogs for actions
- Real-time updates

### Delete Users
- Confirmation before deletion
- Immediate UI updates
- Error handling

## Menu Management Features

### View Menu Items
- Complete menu item list with details
- Item information: name, description, price, category, availability
- Visual indicators for vegetarian, spicy, and allergen information

### Search & Filter
- Search by name or description
- Filter by category and availability
- Clear filters option

### Add/Edit Menu Items
- Comprehensive form with all item details
- Category selection (pizza, beverages, sides, desserts, appetizers)
- Allergen management
- Availability and dietary preference toggles

### Delete Menu Items
- Confirmation before deletion
- Immediate UI updates
- Error handling

## Order Management Features

### View Orders
- Complete order list with customer details
- Order information: items, total, status, payment status
- Customer contact information

### Search & Filter
- Search by customer name, email, or order ID
- Filter by order status and payment status
- Clear filters option

### Update Order Status
- Change order status through workflow
- Status options: pending, confirmed, preparing, ready, out_for_delivery, delivered, cancelled
- Real-time updates

### Delete Orders
- Confirmation before deletion
- Immediate UI updates
- Error handling

## Settings Management

### General Settings
- Site name and description
- Contact information
- Business hours configuration

### Order Settings
- Minimum order amounts
- Delivery fees and thresholds
- Preparation times
- Delivery distance limits

### Payment Settings
- Payment method toggles
- Tax rate configuration

### Notification Settings
- Email and SMS notification toggles
- Order confirmation settings
- Marketing preferences

### Security Settings
- Verification requirements
- Session timeout configuration
- Login attempt limits

## Security Features

### Authentication Guard
- Automatic redirect to login for non-admin users
- Token validation
- Session management

### Role-Based Access
- Admin-only routes
- Protected API endpoints
- Frontend route guards

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (optional),
  role: String (enum: ['user', 'admin']),
  address: Object,
  createdAt: Date
}
```

### MenuItem Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: ['pizza', 'beverages', 'sides', 'desserts', 'appetizers']),
  image: String (required),
  isAvailable: Boolean (default: true),
  isVegetarian: Boolean (default: false),
  isSpicy: Boolean (default: false),
  allergens: [String],
  preparationTime: Number (default: 15),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: 'User'),
  items: [{
    menuItem: ObjectId (ref: 'MenuItem'),
    name: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number,
  status: String (enum: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: String (enum: ['cash', 'card', 'online']),
  deliveryAddress: Object,
  deliveryInstructions: String,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Adding New Admin Features
1. Create backend route in `server/routes/admin.js`
2. Add frontend component in `bakebun/src/pages/`
3. Update `AdminLayout.tsx` navigation
4. Add route to `App.tsx`

### Styling
- Uses Material-UI theme
- Consistent color scheme
- Responsive breakpoints

## Troubleshooting

### Common Issues
1. **Admin access denied**: Ensure user has 'admin' role
2. **Token expired**: Re-login to get new token
3. **CORS errors**: Check backend CORS configuration
4. **MongoDB connection**: Verify MongoDB is running

### Debug Mode
- Check browser console for errors
- Verify API endpoints are accessible
- Confirm JWT token is valid

## Future Enhancements

- [ ] Menu item management
- [ ] Order management
- [ ] Analytics dashboard
- [ ] User activity logs
- [ ] Bulk user operations
- [ ] Email notifications
- [ ] Advanced reporting

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check network connectivity
