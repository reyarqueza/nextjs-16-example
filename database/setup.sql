-- DDL

BEGIN;

CREATE TABLE formats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    format_id INTEGER NOT NULL REFERENCES formats(id) ON DELETE RESTRICT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT media_items_unique_title_format UNIQUE (title, format_id)
);

-- Insert formats
INSERT INTO formats (name) VALUES ('VHS');
INSERT INTO formats (name) VALUES ('LaserDisc');
INSERT INTO formats (name) VALUES ('DVD');
INSERT INTO formats (name) VALUES ('Blu-ray');
INSERT INTO formats (name) VALUES ('Ultra HD Blu-ray');

END;
