-- Create the speciality table
CREATE TABLE speciality (
    speciality_key SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert data into the speciality table
INSERT INTO speciality (name) VALUES
    ('Anesthesiology'),
    ('Neurology'),
    ('Pediatrics'),
    ('Physical medicine and rehabilitation'),
    ('Preventive medicine'),
    ('Psychiatry'),
    ('Radiation oncology'),
    ('Surgery');

-- Create the doctors table with foreign key reference to speciality
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    speciality_key INT REFERENCES speciality(speciality_key)
);

-- Create the user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
);

-- Insert random data into the doctors table
INSERT INTO doctors (name, age, speciality_key) VALUES
    ('Doctor1', 35, 1),
    ('Doctor2', 42, 3),
    ('Doctor3', 28, 7),
    ('Doctor4', 45, 5),
    ('Doctor5', 38, 2),
    ('Doctor6', 32, 6),
    ('Doctor7', 50, 4),
    ('Doctor8', 36, 1),
    ('Doctor9', 29, 3),
    ('Doctor10', 44, 7),
    ('Doctor11', 33, 5),
    ('Doctor12', 48, 2),
    ('Doctor13', 39, 6),
    ('Doctor14', 27, 4),
    ('Doctor15', 46, 1),
    ('Doctor16', 31, 3),
    ('Doctor17', 37, 7),
    ('Doctor18', 49, 5),
    ('Doctor19', 34, 2),
    ('Doctor20', 30, 6);

-- Insert random data into the users table
INSERT INTO users (name, age, gender) VALUES
    ('John Doe', 25, 'Male'),
    ('Jane Smith', 30, 'Female'),
    ('Robert Johnson', 22, 'Male'),
    ('Emily Davis', 40, 'Female'),
    ('Michael Miller', 35, 'Male'),
    ('Olivia Wilson', 28, 'Female'),
    ('David Brown', 33, 'Male'),
    ('Sophia Anderson', 45, 'Female'),
    ('Daniel White', 29, 'Male'),
    ('Emma Martinez', 38, 'Female'),
    ('Matthew Taylor', 41, 'Male'),
    ('Ava Thompson', 27, 'Female'),
    ('Andrew Harris', 36, 'Male'),
    ('Grace Garcia', 31, 'Female'),
    ('William Martinez', 39, 'Male'),
    ('Lily Davis', 44, 'Female'),
    ('James Johnson', 32, 'Male'),
    ('Sophie Wilson', 37, 'Female'),
    ('Alexander White', 42, 'Male'),
    ('Ella Smith', 34, 'Female');