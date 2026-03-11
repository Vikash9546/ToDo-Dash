// Simple JWT-like authentication utility for the frontend
// In production, this would be handled by a backend server

const SECRET_KEY = 'todo-dash-secret-key-2024';

// Simple base64 encode/decode
const base64Encode = (str) => btoa(encodeURIComponent(str));
const base64Decode = (str) => decodeURIComponent(atob(str));

// Generate a simple token
export const generateToken = (user) => {
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64Encode(JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        iat: Date.now(),
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = base64Encode(`${header}.${payload}.${SECRET_KEY}`);
    return `${header}.${payload}.${signature}`;
};

// Decode token
export const decodeToken = (token) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = JSON.parse(base64Decode(parts[1]));
        if (payload.exp < Date.now()) return null; // Token expired
        return payload;
    } catch (err) {
        return null;
    }
};

// Validate token
export const isTokenValid = (token) => {
    if (!token) return false;
    const decoded = decodeToken(token);
    return decoded !== null;
};

// Demo users database (in localStorage)
export const getDemoUsers = () => {
    const users = localStorage.getItem('todoDashUsers');
    if (users) return JSON.parse(users);

    // Initialize with demo users
    const defaultUsers = [
        {
            id: '1',
            name: 'Palak Jain',
            email: 'palak@example.com',
            password: 'password123',
            avatar: null,
            location: 'Rajasthan, India'
        },
        {
            id: '2',
            name: 'Vikash Kumar',
            email: 'vikash@example.com',
            password: 'password123',
            avatar: null,
            location: 'India'
        }
    ];
    localStorage.setItem('todoDashUsers', JSON.stringify(defaultUsers));
    return defaultUsers;
};

// Register user
export const registerUser = (name, email, password) => {
    const users = getDemoUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
        return { success: false, message: 'User already exists' };
    }

    const newUser = {
        id: String(Date.now()),
        name,
        email,
        password,
        avatar: null,
        location: ''
    };

    users.push(newUser);
    localStorage.setItem('todoDashUsers', JSON.stringify(users));

    const token = generateToken(newUser);
    return {
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, location: newUser.location },
        token
    };
};

// Login user
export const loginUser = (email, password) => {
    const users = getDemoUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }

    const token = generateToken(user);
    return {
        success: true,
        user: { id: user.id, name: user.name, email: user.email, location: user.location },
        token
    };
};
