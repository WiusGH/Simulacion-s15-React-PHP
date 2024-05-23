-- Inserts for categoria table
INSERT INTO categoria (nombre, descripcion) VALUES
('Acción', 'Juegos de acción'),
('Aventura', 'Juegos de aventura'),
('Estrategia', 'Juegos de estrategia');

-- Inserts for juego table
INSERT INTO juego (nombre, descripcion, categoria_id_categoria) VALUES
('Blackjack', 'mucho texto', 1),
('Ta te tí', 'Es el ta te tí', 2),
('Juego desconocido', 'Descripción del juego 3', 3);

-- Antes de correr este bloque, hagan el registro del usuario ya sea por login o por postman, sino NO va a funcionar

-- Inserts for puntaje table
INSERT INTO puntaje (usuario_id, juego_id, puntaje, comentario, created_at, updated_at) VALUES
(1, 1, 48448, 'Tuki', NOW(), NOW()),
(1, 2, 195195, 'Me podes vencer?', NOW(), NOW()),
(1, 3, 515159165, 'Increíble puntaje', NOW(), NOW()),
--(1, 1, 1000, 'Buen intento', NOW(), NOW()),
--(2, 1, 2000, 'Sigue intentando', NOW(), NOW()),
--(3, 2, 3000, 'Excelente', NOW(), NOW()),
--(1, 3, 100, 'Primer puntaje del juego 1', NOW(), NOW()),
--(2, 3, 200, 'Segundo puntaje del juego 1', NOW(), NOW()),
--(3, 1, 150, 'Primer puntaje del juego 2', NOW(), NOW()),
--(1, 2, 250, 'Segundo puntaje del juego 2', NOW(), NOW()),
--(2, 1, 300, 'Primer puntaje del juego 3', NOW(), NOW()),
--(3, 2, 350, 'Segundo puntaje del juego 3', NOW(), NOW());


