-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'reader' CHECK (role IN ('reader', 'writer', 'admin')),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stories table
CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    genre VARCHAR(100),
    tags TEXT[], -- PostgreSQL array for tags
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL, -- PDF file URL
    cover_image_url TEXT,
    genre VARCHAR(100),
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    pages INTEGER,
    file_size BIGINT, -- in bytes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE, -- for nested comments
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_content_type CHECK (
        (story_id IS NOT NULL AND book_id IS NULL) OR 
        (story_id IS NULL AND book_id IS NOT NULL)
    )
);

-- Likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, story_id),
    UNIQUE(user_id, book_id),
    CONSTRAINT check_like_type CHECK (
        (story_id IS NOT NULL AND book_id IS NULL) OR 
        (story_id IS NULL AND book_id IS NOT NULL)
    )
);

-- Follows table (for following authors)
CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- Bookmarks table
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, story_id),
    UNIQUE(user_id, book_id),
    CONSTRAINT check_bookmark_type CHECK (
        (story_id IS NOT NULL AND book_id IS NULL) OR 
        (story_id IS NULL AND book_id IS NOT NULL)
    )
);

-- Ad analytics table
CREATE TABLE ad_analytics (
    id SERIAL PRIMARY KEY,
    ad_position VARCHAR(50) NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0.00,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_stories_author ON stories(author_id);
CREATE INDEX idx_stories_genre ON stories(genre);
CREATE INDEX idx_stories_status ON stories(status);
CREATE INDEX idx_stories_created ON stories(created_at DESC);
CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_comments_story ON comments(story_id);
CREATE INDEX idx_comments_book ON comments(book_id);
CREATE INDEX idx_likes_story ON likes(story_id);
CREATE INDEX idx_likes_book ON likes(book_id);
