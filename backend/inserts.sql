-- Inserts for categoria table
INSERT INTO categoria (nombre, descripcion) VALUES
('Acción', 'Juegos de acción'),
('Aventura', 'Juegos de aventura'),
('Estrategia', 'Juegos de estrategia');

-- Inserts for puntaje table
INSERT INTO puntaje (puntaje, comentario) VALUES
(48448, 'Tuki'),
(195195, 'Me podes vencer?'),
(515159165, '{comentario}');

-- Inserts for juego table
INSERT INTO juego (nombre, descripcion, categoria_id_categoria, puntaje_id_puntaje) VALUES
('Blackjack', 'mucho texto', 1, 1),
('Ta te tí', 'Es el ta te tí', 2, 2),
('Juego desconocido', 'Descripción del juego 3', 3, 3);
