INSERT INTO users (username, password, email) VALUES 
('john_doe', 'password123', 'john_doe@example.com'),
('jane_smith', 'password456', 'jane_smith@example.com');

INSERT INTO movies (title, release_year, description, image_url) VALUES 
('Inception', 2010, 'A mind-bending thriller by Christopher Nolan.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'),
('The Matrix', 1999, 'A sci-fi classic about a dystopian future.', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg');

INSERT INTO ratings (user_id, movie_id, rating) VALUES 
(1, 1, 4.5),
(1, 2, 5.0),
(2, 1, 4.0);