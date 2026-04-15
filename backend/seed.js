const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const DATA = path.join(__dirname, "data");

// Schemas
const PostSchema = new mongoose.Schema({ title: String, author: String, date: String, image: String, excerpt: String, content: String }, { timestamps: true });
const BookSchema = new mongoose.Schema({ title: String, author: String, cover: String, sinopse: String, genero: String, ano: String, isbn: String }, { timestamps: true });
const AuthorSchema = new mongoose.Schema({ nome: String, foto: String, bio: String, obras: [String], genero: String }, { timestamps: true });
const ContentSchema = new mongoose.Schema({ key: String, hero: Object, sobre: Object, contacto: Object });

const Post    = mongoose.model("Post", PostSchema);
const Book    = mongoose.model("Book", BookSchema);
const Author  = mongoose.model("Author", AuthorSchema);
const Content = mongoose.model("Content", ContentSchema);

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA, file), "utf8")); }
  catch(e) { return []; }
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB ligado");

  // Posts
  const posts = readJSON("posts.json");
  if (posts.length) {
    await Post.deleteMany({});
    await Post.insertMany(posts.map(p => ({ title: p.title, author: p.author, date: p.date, image: p.image, excerpt: p.excerpt, content: p.content })));
    console.log(`✓ ${posts.length} posts importados`);
  }

  // Books
  const books = readJSON("books.json");
  if (books.length) {
    await Book.deleteMany({});
    await Book.insertMany(books.map(b => ({ title: b.title, author: b.author, cover: b.cover, sinopse: b.sinopse, genero: b.genero, ano: b.ano, isbn: b.isbn })));
    console.log(`✓ ${books.length} livros importados`);
  }

  // Authors
  const authors = readJSON("authors.json");
  if (authors.length) {
    await Author.deleteMany({});
    await Author.insertMany(authors.map(a => ({ nome: a.nome, foto: a.foto, bio: a.bio, obras: a.obras, genero: a.genero })));
    console.log(`✓ ${authors.length} autores importados`);
  }

  // Site Content
  const content = readJSON("site-content.json");
  if (content && content.hero) {
    await Content.deleteMany({});
    await Content.create({ key: "main", hero: content.hero, sobre: content.sobre, contacto: content.contacto });
    console.log("✓ Conteúdo do site importado");
  }

  console.log("\nImportação concluída!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
