INSERT INTO users (username, password, email) VALUES 
('john_doe', 'password123', 'john_doe@example.com'),
('jane_smith', 'password456', 'jane_smith@example.com');

INSERT INTO movies (title, release_year, description) VALUES 
('Inception', 2010, 'A mind-bending thriller by Christopher Nolan.'),
('The Matrix', 1999, 'A sci-fi classic about a dystopian future.');

INSERT INTO ratings (user_id, movie_id, rating) VALUES 
(1, 1, 4.5),
(1, 2, 5.0),
(2, 1, 4.0);