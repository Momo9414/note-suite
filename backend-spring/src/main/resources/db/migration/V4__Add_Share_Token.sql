-- Add share_token column to notes table for shared links
ALTER TABLE notes ADD COLUMN share_token VARCHAR(255) UNIQUE;

-- Create index for share_token lookups
CREATE INDEX idx_notes_share_token ON notes(share_token);

