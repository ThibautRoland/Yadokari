CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    doctorName  VARCHAR(100) NOT NULL,
    -- format: YYYY-MM-DD HH:MI:SS
    dateSearched  TIMESTAMP
);


-- Insert random data into the doctors table
INSERT INTO history (doctorName, dateSearched) VALUES
    ('Doctorx', '2024-02-03 18:00:02');
