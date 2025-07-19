-- Insert sample users
INSERT INTO users (name, email, password_hash, role, bio) VALUES
('Sarah Chen', 'sarah@example.com', '$2b$10$hash1', 'writer', 'Sci-fi enthusiast and storyteller'),
('Raj Patel', 'raj@example.com', '$2b$10$hash2', 'writer', 'Romance novelist from Mumbai'),
('Maya Sharma', 'maya@example.com', '$2b$10$hash3', 'writer', 'Poet and nature lover'),
('Alex Kumar', 'alex@example.com', '$2b$10$hash4', 'writer', 'Digital nomad and travel writer'),
('Priya Singh', 'priya@example.com', '$2b$10$hash5', 'writer', 'Poetry and short story writer'),
('John Reader', 'john@example.com', '$2b$10$hash6', 'reader', 'Avid reader and book reviewer'),
('Emma Wilson', 'emma@example.com', '$2b$10$hash7', 'reader', 'Literature student and critic');

-- Insert sample stories
INSERT INTO stories (title, content, excerpt, author_id, genre, tags, status, views, likes, featured) VALUES
('The Last Library', 'In a world where books are forbidden, one librarian fights to preserve the last collection of human knowledge...', 'In a world where books are forbidden, one librarian fights to preserve...', 1, 'Sci-Fi', ARRAY['dystopian', 'books', 'future'], 'published', 5678, 1234, true),
('Midnight in Mumbai', 'A love story that unfolds through the bustling streets of Mumbai, where two souls find each other in the chaos...', 'A love story that unfolds through the bustling streets of Mumbai...', 2, 'Romance', ARRAY['love', 'mumbai', 'city'], 'published', 3456, 987, true),
('The Poet''s Garden', 'A collection of poems inspired by nature, love, and the human experience...', 'A collection of poems inspired by nature, love, and the human experience...', 3, 'Poetry', ARRAY['nature', 'love', 'poems'], 'published', 2345, 756, true),
('Digital Nomad Diaries', 'Adventures and misadventures of working remotely while traveling the world...', 'Adventures and misadventures of working remotely while traveling...', 4, 'Non-Fiction', ARRAY['travel', 'work', 'lifestyle'], 'published', 4321, 890, false),
('Monsoon Memories', 'Childhood memories captured in verse during the monsoon season...', 'Childhood memories captured in verse during the monsoon season...', 5, 'Poetry', ARRAY['childhood', 'monsoon', 'memories'], 'published', 1234, 567, false);

-- Insert sample books
INSERT INTO books (title, description, author_id, file_url, cover_image_url, genre, tags, status, views, likes, pages) VALUES
('The Startup Chronicles', 'A comprehensive guide to building a successful startup in the digital age', 4, '/books/startup-chronicles.pdf', '/covers/startup-chronicles.jpg', 'Business', ARRAY['startup', 'business', 'entrepreneurship'], 'published', 2100, 345, 250),
('Himalayan Haikus', 'A collection of haikus inspired by the majestic Himalayas', 3, '/books/himalayan-haikus.pdf', '/covers/himalayan-haikus.jpg', 'Poetry', ARRAY['haiku', 'mountains', 'nature'], 'published', 1500, 234, 120);

-- Insert sample comments
INSERT INTO comments (content, user_id, story_id) VALUES
('Amazing story! Loved the dystopian world-building.', 6, 1),
('The characters felt so real. Great work!', 7, 1),
('Beautiful love story. Mumbai comes alive in your words.', 6, 2),
('Your poems always touch my heart.', 7, 3);

-- Insert sample likes
INSERT INTO likes (user_id, story_id) VALUES
(6, 1), (7, 1), (6, 2), (7, 2), (6, 3), (7, 3);

-- Insert sample follows
INSERT INTO follows (follower_id, following_id) VALUES
(6, 1), (6, 2), (6, 3), (7, 1), (7, 2), (7, 3);

-- Insert sample bookmarks
INSERT INTO bookmarks (user_id, story_id) VALUES
(6, 1), (6, 3), (7, 2);

-- Insert sample ad analytics
INSERT INTO ad_analytics (ad_position, impressions, clicks, revenue, date) VALUES
('top', 1000, 25, 12.50, CURRENT_DATE),
('middle', 800, 20, 10.00, CURRENT_DATE),
('sidebar', 600, 15, 7.50, CURRENT_DATE);
