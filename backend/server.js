import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { SignJWT, jwtVerify } from 'jose';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Secret key for signing JWTs
const SECRET = new TextEncoder().encode('project-m-jwt-secret-key-2026');
const ISSUER = 'project-m';
const AUDIENCE = 'project-m-app';

// Token durations
const ACCESS_TOKEN_EXPIRY = '1h';   // 1 hour
const REFRESH_TOKEN_EXPIRY = '7d';  // 7 days

// Simulated user database
const USERS_DB = [
  {
    id: 'usr_001',
    email: 'palak@example.com',
    password: 'password123',
    name: 'Palak Jain',
    role: 'Project Manager',
    avatar: 'PJ',
  },
  {
    id: 'usr_002',
    email: 'vikash@example.com',
    password: 'password123',
    name: 'Vikash Kumar',
    role: 'Full Stack Developer',
    avatar: 'VK',
  },
];

async function generateAccessToken(user) {
  return await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    type: 'access',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(SECRET);
}

async function generateRefreshToken(user) {
  return await new SignJWT({
    sub: user.id,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(SECRET);
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = USERS_DB.find((u) => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password. Use demo credentials.' });
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const { password: _, ...safeUser } = user;
  res.json({
    user: safeUser,
    accessToken,
    refreshToken
  });
});

app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const { payload } = await jwtVerify(refreshToken, SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    if (payload.type !== 'refresh') {
      return res.status(401).json({ message: 'Invalid token type' });
    }

    const user = USERS_DB.find((u) => u.id === payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const newAccessToken = await generateAccessToken(user);
    const { password: _, ...safeUser } = user;

    res.json({
      user: safeUser,
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ message: error.code === 'ERR_JWT_EXPIRED' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const user = USERS_DB.find((u) => u.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });
    
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    res.status(401).json({ message: error.code === 'ERR_JWT_EXPIRED' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID' });
  }
});

let currentTasks = null;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  if (currentTasks) {
    socket.emit('sync_state', currentTasks);
  }

  socket.on('redux_action', (data) => {
    const { action, tasksState } = data;
    if (tasksState) {
      currentTasks = tasksState;
    }
    socket.broadcast.emit('redux_action', action);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running closely on http://localhost:${PORT}`);
});
