const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "vertice-secret-2024";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "vertice2024";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ── MongoDB ───────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI, {
  family: 4,
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log("MongoDB ligado"))
  .catch(e => console.error("Erro MongoDB:", e));

// ── Schemas ───────────────────────────────────────────────
const PostSchema = new mongoose.Schema({
  title: String, author: String, date: String,
  image: String, excerpt: String, content: String
}, { timestamps: true });

const BookSchema = new mongoose.Schema({
  title: String, author: String, cover: String,
  sinopse: String, genero: String, ano: String, isbn: String
}, { timestamps: true });

const AuthorSchema = new mongoose.Schema({
  nome: String, foto: String, bio: String,
  obras: [String], genero: String
}, { timestamps: true });

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});

const ManuscriptSchema = new mongoose.Schema({
  nome: String, email: String, telefone: String,
  genero: String, sinopse: String, observacoes: String,
  estado: { type: String, default: "pendente" }
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  nome: String, email: String, servico: String,
  mensagem: String, lida: { type: Boolean, default: false }
}, { timestamps: true });

const ContentSchema = new mongoose.Schema({
  key: { type: String, default: "main" },
  hero: { titulo: String, subtitulo: String },
  sobre: { texto: String, missao: String, visao: String },
  contacto: { morada: String, telefone: String, email: String, facebook: String, instagram: String, whatsapp: String }
});

const Post       = mongoose.model("Post", PostSchema);
const Book       = mongoose.model("Book", BookSchema);
const Author     = mongoose.model("Author", AuthorSchema);
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
const Manuscript = mongoose.model("Manuscript", ManuscriptSchema);
const Contact    = mongoose.model("Contact", ContactSchema);
const Content    = mongoose.model("Content", ContentSchema);

// ── Middleware ────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function auth(req, res, next) {
  var h = req.headers["authorization"];
  if (!h || !h.startsWith("Bearer ")) return res.status(401).json({ error: "Não autorizado." });
  try { req.user = jwt.verify(h.split(" ")[1], JWT_SECRET); next(); }
  catch(e) { res.status(401).json({ error: "Token inválido." }); }
}

var storage = multer.diskStorage({
  destination: function(_q, _f, cb) { cb(null, path.join(__dirname, "uploads")); },
  filename: function(_q, f, cb) { cb(null, Date.now() + path.extname(f.originalname)); }
});
var upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function(_q, f, cb) {
    if (f.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Apenas imagens."));
  }
});

async function sendEmail(opts) {
  if (!resend) return;
  try { await resend.emails.send(opts); } catch(e) { console.error("Email error:", e); }
}

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

// ── Content ───────────────────────────────────────────────
app.get("/api/content", async function(_q, res) {
  try {
    let c = await Content.findOne({ key: "main" });
    if (!c) {
      c = await Content.create({ key: "main",
        hero: { titulo: "A palavra é a semente, a nossa missão é fazê-la florescer.", subtitulo: "Apoiamos autores e transformamos palavras em obras publicadas com excelência, ética e sofisticação cultural." },
        sobre: { texto: "A Editora Vértice Literário, Lda. é uma instituição moçambicana dedicada à promoção e ao desenvolvimento da literatura.", missao: "Apoiar autores emergentes e consolidados.", visao: "Ser uma das editoras de referência em Moçambique." },
        contacto: { morada: "Cidade de Tete, Moçambique.", telefone: "(+258) 83 46 98 880", email: "editoraverticeliterario@gmail.com", facebook: "", instagram: "", whatsapp: "258834698880" }
      });
    }
    res.json(c);
  } catch(e) { res.status(500).json({ error: "Erro." }); }
});
app.put("/api/content", auth, async function(req, res) {
  try {
    const c = await Content.findOneAndUpdate({ key: "main" }, req.body, { new: true, upsert: true });
    res.json(c);
  } catch(e) { res.status(500).json({ error: "Erro ao guardar." }); }
});

// ── Posts ─────────────────────────────────────────────────
app.get("/api/posts", async function(_q, res) {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});
app.post("/api/posts", auth, async function(req, res) {
  const b = req.body;
  if (!b.title || !b.content) return res.status(400).json({ error: "Título e conteúdo obrigatórios." });
  const p = await Post.create({
    title: b.title, author: b.author || "Redacção Vértice",
    date: b.date || new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
    image: b.image || "https://picsum.photos/seed/news/800/450",
    excerpt: b.excerpt || b.content.substring(0, 120) + "...", content: b.content
  });
  res.status(201).json(p);
});
app.put("/api/posts/:id", auth, async function(req, res) {
  const p = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ error: "Post não encontrado." });
  res.json(p);
});
app.delete("/api/posts/:id", auth, async function(req, res) {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ── Books ─────────────────────────────────────────────────
app.get("/api/books", async function(_q, res) {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});
app.post("/api/books", auth, async function(req, res) {
  const b = req.body;
  if (!b.title || !b.author) return res.status(400).json({ error: "Título e autor obrigatórios." });
  const nb = await Book.create({ title: b.title, author: b.author, cover: b.cover || "https://picsum.photos/seed/newbook/400/533", sinopse: b.sinopse, genero: b.genero, ano: b.ano, isbn: b.isbn });
  res.status(201).json(nb);
});
app.put("/api/books/:id", auth, async function(req, res) {
  const b = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!b) return res.status(404).json({ error: "Livro não encontrado." });
  res.json(b);
});
app.delete("/api/books/:id", auth, async function(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ── Authors ───────────────────────────────────────────────
app.get("/api/authors", async function(_q, res) {
  const authors = await Author.find().sort({ createdAt: 1 });
  res.json(authors);
});
app.post("/api/authors", auth, async function(req, res) {
  const b = req.body;
  if (!b.nome) return res.status(400).json({ error: "Nome obrigatório." });
  const a = await Author.create({ nome: b.nome, foto: b.foto || "", bio: b.bio || "", obras: b.obras || [], genero: b.genero || "" });
  res.status(201).json(a);
});
app.put("/api/authors/:id", auth, async function(req, res) {
  const a = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!a) return res.status(404).json({ error: "Autor não encontrado." });
  res.json(a);
});
app.delete("/api/authors/:id", auth, async function(req, res) {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ── Newsletter ────────────────────────────────────────────
app.post("/api/newsletter", async function(req, res) {
  const email = req.body.email;
  if (!email) return res.status(400).json({ error: "Email obrigatório." });
  try {
    await Subscriber.create({ email });
    await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: email, subject: "Bem-vindo à Newsletter", html: "<p>Obrigado por subscrever a newsletter da Editora Vértice Literário!</p>" });
    res.json({ success: true });
  } catch(e) {
    if (e.code === 11000) return res.status(409).json({ error: "Email já subscrito." });
    res.status(500).json({ error: "Erro ao subscrever." });
  }
});
app.get("/api/newsletter", auth, async function(_q, res) {
  const s = await Subscriber.find().sort({ date: -1 });
  res.json({ total: s.length, subscribers: s });
});
app.delete("/api/newsletter/:email", auth, async function(req, res) {
  await Subscriber.deleteOne({ email: decodeURIComponent(req.params.email) });
  res.json({ success: true });
});

// ── Manuscripts ───────────────────────────────────────────
app.post("/api/manuscript", async function(req, res) {
  const b = req.body;
  if (!b.nome || !b.email || !b.genero || !b.sinopse) return res.status(400).json({ error: "Campos obrigatórios em falta." });
  const m = await Manuscript.create({ nome: b.nome, email: b.email, telefone: b.telefone || "", genero: b.genero, sinopse: b.sinopse, observacoes: b.observacoes || "" });
  await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: process.env.EMAIL_TO, replyTo: b.email,
    subject: "[Manuscrito] " + b.genero + " - " + b.nome,
    html: "<div style='font-family:Arial'><h2>Nova Submissão</h2><p><b>Nome:</b> " + b.nome + "</p><p><b>Email:</b> " + b.email + "</p><p><b>Género:</b> " + b.genero + "</p><p><b>Sinopse:</b> " + b.sinopse + "</p></div>" });
  res.json({ success: true });
});
app.get("/api/manuscripts", auth, async function(_q, res) {
  const m = await Manuscript.find().sort({ createdAt: -1 });
  res.json(m);
});
app.put("/api/manuscripts/:id", auth, async function(req, res) {
  const m = await Manuscript.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!m) return res.status(404).json({ error: "Não encontrado." });
  res.json(m);
});
app.delete("/api/manuscripts/:id", auth, async function(req, res) {
  await Manuscript.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ── Contacts ──────────────────────────────────────────────
app.post("/api/contact", async function(req, res) {
  const b = req.body;
  if (!b.nome || !b.email || !b.mensagem) return res.status(400).json({ error: "Campos obrigatórios em falta." });
  await Contact.create({ nome: b.nome, email: b.email, servico: b.servico || "", mensagem: b.mensagem });
  await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: process.env.EMAIL_TO, replyTo: b.email,
    subject: "[Vértice] " + b.servico + " - " + b.nome,
    html: "<div style='font-family:Arial'><p><b>Nome:</b> " + b.nome + "</p><p><b>Email:</b> " + b.email + "</p><p><b>Serviço:</b> " + b.servico + "</p><p><b>Mensagem:</b> " + b.mensagem + "</p></div>" });
  await sendEmail({ from: "Vertice Literario <onboarding@resend.dev>", to: b.email,
    subject: "Recebemos a sua mensagem - Editora Vértice Literário",
    html: "<div style='font-family:Arial;max-width:600px'><div style='background:#1B2A4A;padding:24px;text-align:center'><h2 style='color:#F5A623'>Editora Vértice Literário</h2></div><div style='padding:32px;background:#f9f9f9'><p>Caro/a <b>" + b.nome + "</b>,</p><p>Recebemos a sua mensagem e entraremos em contacto brevemente.</p></div></div>" });
  res.json({ success: true });
});
app.get("/api/contacts", auth, async function(_q, res) {
  const c = await Contact.find().sort({ createdAt: -1 });
  res.json(c);
});
app.put("/api/contacts/:id", auth, async function(req, res) {
  const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!c) return res.status(404).json({ error: "Não encontrado." });
  res.json(c);
});
app.delete("/api/contacts/:id", auth, async function(req, res) {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, function() { console.log("Servidor a correr na porta " + PORT); });
