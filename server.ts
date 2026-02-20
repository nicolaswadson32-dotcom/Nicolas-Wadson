import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("store.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    promo_price REAL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    category TEXT
  )
`);

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, description, price, promo_price, stock, image_url, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const seedProducts = [
    ["Mini Paredão #13", "Sistema de som automotivo em miniatura, detalhes realistas.", 249.99, 137.90, 5, "https://picsum.photos/seed/p13/400/400", "Paredões"],
    ["Mini Paredão #10", "Réplica de paredão de som com iluminação LED.", 249.99, 225.99, 3, "https://picsum.photos/seed/p10/400/400", "Paredões"],
    ["Mini Paredão #9", "Miniatura de som automotivo, alta fidelidade visual.", 249.99, 139.99, 10, "https://picsum.photos/seed/p9/400/400", "Paredões"],
    ["Mini Paredão #1", "O clássico que deu início a tudo.", 249.99, 127.90, 8, "https://picsum.photos/seed/p1/400/400", "Paredões"],
    ["Mini Paredão #8", "Design moderno e agressivo.", 249.99, 179.00, 2, "https://picsum.photos/seed/p8/400/400", "Paredões"],
    ["Mini Paredão #11", "Compacto e potente na aparência.", 249.99, 160.29, 4, "https://picsum.photos/seed/p11/400/400", "Paredões"],
    ["Mini Paredão #7", "Estilo único para sua coleção.", 249.99, 168.89, 6, "https://picsum.photos/seed/p7/400/400", "Paredões"],
    ["Mini Paredão #6", "Cores vibrantes e acabamento premium.", 249.99, 149.99, 7, "https://picsum.photos/seed/p6/400/400", "Paredões"],
    ["Mini Paredão #5", "O favorito dos entusiastas.", 249.99, 120.28, 5, "https://picsum.photos/seed/p5/400/400", "Paredões"],
    ["Mini Paredão #4", "Detalhes que impressionam.", 249.99, 149.99, 9, "https://picsum.photos/seed/p4/400/400", "Paredões"]
  ];

  for (const p of seedProducts) {
    insert.run(...p);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
