const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const DATA = path.join(__dirname, "data");
const POSTS_FILE      = path.join(DATA, "posts.json");
const BOOKS_FILE      = path.join(DATA, "books.json");
const SUBS_FILE       = path.join(DATA, "subscribers.json");
const CONTENT_FILE    = path.join(DATA, "site-content.json");
const MANUSCRIPTS_FILE = path.join(DATA, "manuscripts.json");
const CONTACTS_FILE   = path.join(DATA, "contacts.json");
const JWT_SECRET  = process.env.JWT_SECRET  || "vertice-secret-2024";
const ADMIN_USER  = process.env.ADMIN_USER  || "admin";
const ADMIN_PASS  = process.env.ADMIN_PASS  || "vertice2024";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmail(opts) {
  if (!resend) return;
  try { await resend.emails.send(opts); } catch(e) { console.error("Email error:", e); }
}

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function readJSON(f, fallback) {
  try { return JSON.parse(fs.readFileSync(f, "utf8")); }
  catch(e) { return fallback !== undefined ? fallback : []; }
}
function writeJSON(f, d) { fs.writeFileSync(f, JSON.stringify(d, null, 2)); }

function auth(req, res, next) {
  var h = req.headers["authorization"];
  if (!h || !h.startsWith("Bearer ")) return res.status(401).json({ error: "Nao autorizado." });
  try { req.user = jwt.verify(h.split(" ")[1], JWT_SECRET); next(); }
  catch(e) { res.status(401).json({ error: "Token invalido." }); }
}

var storage = multer.diskStorage({
  destination: function(_q, _f, cb) { cb(null, path.join(__dirname, "uploads")); },
  filename: function(_q, f, cb) { cb(null, Date.now() + path.extname(f.originalname)); }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function(_q, f, cb) {
    if (f.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Apenas imagens."));
  }
});


// ── Upload ────────────────────────────────────────────────
app.post("/api/upload", auth, upload.single("image"), function(req, res) {
  if (!req.file) return res.status(400).json({ error: "Nenhum ficheiro." });
  res.json({ url: req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename });
});

// ── Login ─────────────────────────────────────────────────
app.post("/api/login", function(req, res) {
  if (req.body.username === ADMIN_USER && req.body.password === ADMIN_PASS)
    res.json({ token: jwt.sign({ username: req.body.username }, JWT_SECRET, { expiresIn: "8h" }) });
  else res.status(401).json({ error: "Credenciais incorrectas." });
});

// ── Site Content ──────────────────────────────────────────
app.get("/api/content", function(_q, res) {
  try { res.json(JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"))); }
  catch(e) { res.json({}); }
});
app.put("/api/content", auth, function(req, res) {
  try {
    var cur = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
    var upd = Object.assign({}, cur, req.body);
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(upd, null, 2));
    res.json(upd);
  } catch(e) { res.status(500).json({ error: "Erro ao guardar." }); }
});

// ── Posts ─────────────────────────────────────────────────
app.get("/api/posts", function(_q, res) { res.json(readJSON(POSTS_FILE)); });
app.post("/api/posts", auth, function(req, res) {
  var b = req.body;
  if (!b.title || !b.content) return res.status(400).json({ error: "Titulo e conteudo obrigatorios." });
  var posts = readJSON(POSTS_FILE);
  var p = { id: Date.now(), title: b.title, author: b.author || "Redacao Vertice",
    date: b.date || new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
    image: b.image || "https://picsum.photos/seed/news/800/450",
    excerpt: b.excerpt || b.content.substring(0, 120) + "...", content: b.content };
  posts.unshift(p); writeJSON(POSTS_FILE, posts); res.status(201).json(p);
});
app.put("/api/posts/:id", auth, function(req, res) {
  var posts = readJSON(POSTS_FILE);
  var i = posts.findIndex(function(p) { return p.id === Number(req.params.id); });
  if (i === -1) return res.status(404).json({ error: "Post nao encontrado." });
  posts[i] = Object.assign({}, posts[i], req.body); writeJSON(POSTS_FILE, posts); res.json(posts[i]);
});
app.delete("/api/posts/:id", auth, function(req, res) {
  var posts = readJSON(POSTS_FILE);
  var f = posts.filter(function(p) { return p.id !== Number(req.params.id); });
  if (f.length === posts.length) return res.status(404).json({ error: "Post nao encontrado." });
  writeJSON(POSTS_FILE, f); res.json({ success: true });
});

// ── Books ─────────────────────────────────────────────────
app.get("/api/books", function(_q, res) { res.json(readJSON(BOOKS_FILE)); });
app.post("/api/books", auth, function(req, res) {
  var b = req.body;
  if (!b.title || !b.author) return res.status(400).json({ error: "Titulo e autor obrigatorios." });
  var books = readJSON(BOOKS_FILE);
  var nb = { id: Date.now(), title: b.title, author: b.author,
    cover: b.cover || "https://picsum.photos/seed/newbook/400/533",
    sinopse: b.sinopse, genero: b.genero, ano: b.ano, isbn: b.isbn };
  books.push(nb); writeJSON(BOOKS_FILE, books); res.status(201).json(nb);
});
app.put("/api/books/:id", auth, function(req, res) {
  var books = readJSON(BOOKS_FILE);
  var i = books.findIndex(function(b) { return b.id === Number(req.params.id); });
  if (i === -1) return res.status(404).json({ error: "Livro nao encontrado." });
  books[i] = Object.assign({}, books[i], req.body); writeJSON(BOOKS_FILE, books); res.json(books[i]);
});
app.delete("/api/books/:id", auth, function(req, res) {
  var books = readJSON(BOOKS_FILE);
  var f = books.filter(function(b) { return b.id !== Number(req.params.id); });
  if (f.length === books.length) return res.status(404).json({ error: "Livro nao encontrado." });
  writeJSON(BOOKS_FILE, f); res.json({ success: true });
});


// ── Newsletter ────────────────────────────────────────────
app.post("/api/newsletter", async function(req, res) {
  var email = req.body.email;
  if (!email) return res.status(400).json({ error: "Email obrigatorio." });
  var subs = readJSON(SUBS_FILE);
  if (subs.find(function(s) { return s.email === email; })) return res.status(409).json({ error: "Email ja subscrito." });
  subs.push({ email: email, date: new Date().toISOString() });
  writeJSON(SUBS_FILE, subs);
  try { await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: email, subject: "Bem-vindo a Newsletter", html: "<p>Obrigado por subscrever a newsletter da Editora Vertice Literario!</p>" }); } catch(e) { console.error(e); }
  res.json({ success: true });
});
app.get("/api/newsletter", auth, function(_q, res) { var s = readJSON(SUBS_FILE); res.json({ total: s.length, subscribers: s }); });
app.delete("/api/newsletter/:email", auth, function(req, res) {
  var subs = readJSON(SUBS_FILE).filter(function(s) { return s.email !== decodeURIComponent(req.params.email); });
  writeJSON(SUBS_FILE, subs); res.json({ success: true });
});

// ── Manuscripts ───────────────────────────────────────────
app.post("/api/manuscript", async function(req, res) {
  var b = req.body;
  if (!b.nome || !b.email || !b.genero || !b.sinopse) return res.status(400).json({ error: "Campos obrigatorios em falta." });
  var items = readJSON(MANUSCRIPTS_FILE);
  var entry = { id: Date.now(), nome: b.nome, email: b.email, telefone: b.telefone || "",
    genero: b.genero, sinopse: b.sinopse, observacoes: b.observacoes || "",
    data: new Date().toISOString(), estado: "pendente" };
  items.unshift(entry); writeJSON(MANUSCRIPTS_FILE, items);
  try {
    await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: process.env.EMAIL_TO, replyTo: b.email,
      subject: "[Manuscrito] " + b.genero + " - " + b.nome,
      html: "<div style='font-family:Arial'><h2>Nova Submissao</h2><p><b>Nome:</b> " + b.nome + "</p><p><b>Email:</b> " + b.email + "</p><p><b>Genero:</b> " + b.genero + "</p><p><b>Sinopse:</b> " + b.sinopse + "</p></div>" });
  } catch(e) { console.error(e); }
  res.json({ success: true });
});
app.get("/api/manuscripts", auth, function(_q, res) { res.json(readJSON(MANUSCRIPTS_FILE)); });
app.put("/api/manuscripts/:id", auth, function(req, res) {
  var items = readJSON(MANUSCRIPTS_FILE);
  var i = items.findIndex(function(m) { return m.id === Number(req.params.id); });
  if (i === -1) return res.status(404).json({ error: "Nao encontrado." });
  items[i] = Object.assign({}, items[i], req.body); writeJSON(MANUSCRIPTS_FILE, items); res.json(items[i]);
});
app.delete("/api/manuscripts/:id", auth, function(req, res) {
  var items = readJSON(MANUSCRIPTS_FILE).filter(function(m) { return m.id !== Number(req.params.id); });
  writeJSON(MANUSCRIPTS_FILE, items); res.json({ success: true });
});

// ── Contacts ──────────────────────────────────────────────
app.post("/api/contact", async function(req, res) {
  var b = req.body;
  if (!b.nome || !b.email || !b.mensagem) return res.status(400).json({ error: "Campos obrigatorios em falta." });
  var items = readJSON(CONTACTS_FILE);
  var entry = { id: Date.now(), nome: b.nome, email: b.email, servico: b.servico || "",
    mensagem: b.mensagem, data: new Date().toISOString(), lida: false };
  items.unshift(entry); writeJSON(CONTACTS_FILE, items);
  try {
    await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: process.env.EMAIL_TO, replyTo: b.email,
      subject: "[Vertice] " + b.servico + " - " + b.nome,
      html: "<div style='font-family:Arial'><p><b>Nome:</b> " + b.nome + "</p><p><b>Email:</b> " + b.email + "</p><p><b>Servico:</b> " + b.servico + "</p><p><b>Mensagem:</b> " + b.mensagem + "</p></div>" });
    await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: b.email,
      subject: "Recebemos a sua mensagem - Editora Vertice Literario",
      html: "<div style='font-family:Arial;max-width:600px'><div style='background:#1B2A4A;padding:24px;text-align:center'><h2 style='color:#F5A623'>Editora Vertice Literario</h2></div><div style='padding:32px;background:#f9f9f9'><p>Caro/a <b>" + b.nome + "</b>,</p><p>Recebemos a sua mensagem e entraremos em contacto brevemente.</p></div></div>" });
  } catch(e) { console.error(e); }
  res.json({ success: true });
});
app.get("/api/contacts", auth, function(_q, res) { res.json(readJSON(CONTACTS_FILE)); });
app.put("/api/contacts/:id", auth, function(req, res) {
  var items = readJSON(CONTACTS_FILE);
  var i = items.findIndex(function(c) { return c.id === Number(req.params.id); });
  if (i === -1) return res.status(404).json({ error: "Nao encontrado." });
  items[i] = Object.assign({}, items[i], req.body); writeJSON(CONTACTS_FILE, items); res.json(items[i]);
});
app.delete("/api/contacts/:id", auth, function(req, res) {
  var items = readJSON(CONTACTS_FILE).filter(function(c) { return c.id !== Number(req.params.id); });
  writeJSON(CONTACTS_FILE, items); res.json({ success: true });
});

app.listen(PORT, function() { console.log("Servidor a correr na porta " + PORT); });
