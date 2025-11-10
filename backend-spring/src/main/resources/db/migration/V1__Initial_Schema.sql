-- Create users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create notes table
CREATE TABLE notes (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content_md TEXT,
    visibility VARCHAR(50) NOT NULL DEFAULT 'PRIVATE',
    owner_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create note_tags table for many-to-many relationship
CREATE TABLE note_tags (
    note_id VARCHAR(255) NOT NULL,
    tag VARCHAR(255) NOT NULL,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag)
);

-- Create indexes for better performance
CREATE INDEX idx_notes_owner_id ON notes(owner_id);
CREATE INDEX idx_notes_visibility ON notes(visibility);
CREATE INDEX idx_notes_created_at ON notes(created_at);
CREATE INDEX idx_users_email ON users(email);

