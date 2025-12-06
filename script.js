/**
 * Kisaan Connect - Main Application Logic
 * Vanilla JS, No Libraries
 */

// --- Constants & Config ---
const STORAGE_KEYS = {
    USERS: 'kc_users',
    PRODUCTS: 'kc_products',
    ORDERS: 'kc_orders',
    CURRENT_USER: 'kc_current_user'
};

// --- Dummy Data ---
const DUMMY_USERS = [
    { id: 1, name: 'Admin User', email: 'admin@kisaan.com', password: 'password', role: 'admin' },
    { id: 2, name: 'Ramesh Farmer', email: 'ramesh@kisaan.com', password: 'password', role: 'farmer', location: 'Punjab' },
    { id: 3, name: 'Sita Consumer', email: 'sita@kisaan.com', password: 'password', role: 'consumer' }
];

const DUMMY_PRODUCTS = [
    { id: 1, farmerId: 2, name: 'Organic Wheat', price: 2500, unit: 'quintal', quantity: 50, location: 'Punjab', description: 'High quality organic wheat from fresh harvest.' },
    { id: 2, farmerId: 2, name: 'Basmati Rice', price: 4500, unit: 'quintal', quantity: 20, location: 'Punjab', description: 'Premium long grain Basmati rice.' },
    { id: 3, farmerId: 2, name: 'Fresh Tomatoes', price: 40, unit: 'kg', quantity: 100, location: 'Punjab', description: 'Farm fresh red tomatoes.' }
];

const DUMMY_ORDERS = [
    { id: 1, productId: 1, consumerId: 3, farmerId: 2, quantity: 2, status: 'pending', date: '2023-10-25', message: 'Need urgent delivery.' },
    { id: 2, productId: 3, consumerId: 3, farmerId: 2, quantity: 10, status: 'accepted', date: '2023-10-20', message: '' }
];

// --- Data Store (LocalStorage Wrapper) ---
const Store = {
    get(key, defaultVal) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultVal;
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            this.set(STORAGE_KEYS.USERS, DUMMY_USERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            this.set(STORAGE_KEYS.PRODUCTS, DUMMY_PRODUCTS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            this.set(STORAGE_KEYS.ORDERS, DUMMY_ORDERS);
        }
    }
};

// --- Auth Service ---
const Auth = {
    login(email, password) {
        const users = Store.get(STORAGE_KEYS.USERS, []);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            Store.set(STORAGE_KEYS.CURRENT_USER, user);
            return user;
        }
        return null;
    },
    register(user) {
        const users = Store.get(STORAGE_KEYS.USERS, []);
        if (users.find(u => u.email === user.email)) {
            throw new Error('Email already exists');
        }
        user.id = Date.now();
        users.push(user);
        Store.set(STORAGE_KEYS.USERS, users);
        return user;
    },
    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    },
    getCurrentUser() {
        return Store.get(STORAGE_KEYS.CURRENT_USER, null);
    },
    requireRole(role) {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return false;
        }
        if (role && user.role !== role) {
            alert('Unauthorized access');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
};

// --- UI Helpers ---
const UI = {
    showToast(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`; // Use styled classes if defined, or just toast
        toast.style.backgroundColor = type === 'error' ? '#d32f2f' : '#333';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    renderHeader() {
        const user = Auth.getCurrentUser();
        const nav = document.getElementById('main-nav');
        if (!nav) return;

        let links = `<li><a href="index.html">Home</a></li>`;
        
        if (user) {
            if (user.role === 'farmer') {
                links += `
                    <li><a href="farmer_dashboard.html">Dashboard</a></li>
                    <li><a href="farmer_products.html">My Products</a></li>
                    <li><a href="farmer_orders.html">Orders</a></li>
                `;
            } else if (user.role === 'consumer') {
                links += `
                    <li><a href="consumer_dashboard.html">Dashboard</a></li>
                    <li><a href="all_products.html">Browse</a></li>
                    <li><a href="my_requests.html">My Requests</a></li>
                `;
            } else if (user.role === 'admin') {
                links += `
                    <li><a href="admin_dashboard.html">Dashboard</a></li>
                    <li><a href="admin_users.html">Users</a></li>
                `;
            }
            links += `<li><a href="#" id="logout-btn">Logout (${user.name})</a></li>`;
        } else {
            links += `
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html" class="btn btn-primary btn-small">Register</a></li>
            `;
        }
        nav.innerHTML = links;

        // Attach logout listener
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
            });
        }
    }
};

// --- Initialization ---
(function() {
    Store.init();
    document.addEventListener('DOMContentLoaded', () => {
        UI.renderHeader();
    });
})();

// Export to window for inline usage if needed, though modules are better
window.App = {
    Store,
    Auth,
    UI,
    Constants: { STORAGE_KEYS }
};
