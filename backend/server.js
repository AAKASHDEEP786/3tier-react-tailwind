const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const client = require('prom-client');

// Collect default Node.js metrics (CPU, memory, event loop etc.)
client.collectDefaultMetrics();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Root route
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// Metrics endpoint (Prometheus will scrape this)
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (err) {
        console.error("Metrics error:", err);
        res.status(500).end();
    }
});

// Database test route
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        console.error("DB Test error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Liveness check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

// Readiness check (DB dependency)
app.get('/ready', async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.status(200).json({
            status: "READY",
            database: "connected",
            timestamp: new Date()
        });
    } catch (err) {
        console.error("Readiness check failed:", err);
        res.status(500).json({
            status: "NOT_READY",
            database: "disconnected",
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});