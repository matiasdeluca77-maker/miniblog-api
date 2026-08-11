-- ============================================
-- MiniBlog API - Datos de ejemplo (seed)
-- ============================================

INSERT INTO authors (name, email, bio) VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
  ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
  ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
  ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
  ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);

INSERT INTO comments (content, post_id, author_id) VALUES
  ('¡Excelente introducción, muy clara!', 1, 2),
  ('Me hubiera gustado más ejemplos de código.', 1, 3),
  ('Yo prefiero PostgreSQL por las FKs.', 2, 1),
  ('Buen resumen de los principios REST.', 3, 2);