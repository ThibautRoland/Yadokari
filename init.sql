-- Create the speciality table
CREATE TABLE speciality (
    speciality_key SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert data into the speciality table
INSERT INTO speciality (name) VALUES
    ('Anesthesiology'),
    ('Psychiatry'),
    ('Surgery');

-- Create the doctors table with foreign key reference to speciality
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
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
INSERT INTO doctors (name, age, speciality_key, x, y) VALUES
    ('Doctor1', 30, 1, -85.9186, -50.7877),
    ('Doctor2', 35, 2, 69.4744, 110.2259),
    ('Doctor3', 40, 3, -83.4802, 77.0913),
    -- Add 17 more doctors with random data
    ('Doctor4', 28, 1, 52.7484, 59.0248),
    ('Doctor5', 45, 2, -23.1863, 36.4701),
    ('Doctor6', 32, 3, 85.9621, -54.8893),
    ('Doctor7', 38, 1, 49.3141, 0.5470),
    ('Doctor8', 50, 2, 59.6419, -171.2571),
    ('Doctor9', 33, 3, 11.2393, 46.9727),
    ('Doctor10', 29, 1, 85.3684, -52.9191),
    ('Doctor11', 42, 2, -13.2157, -33.4003),
    ('Doctor12', 37, 3, -21.2245, -12.8190),
    ('Doctor13', 31, 1, -16.3825, -2.8588),
    ('Doctor14', 48, 2, 72.5068, -80.1911),
    ('Doctor15', 34, 3, 3.5502, 118.5075),
    ('Doctor16', 39, 1, 81.2487, 156.8244),
    ('Doctor17', 46, 2, 86.6148, 108.2702),
    ('Doctor18', 36, 3, 46.2764, -138.3286),
    ('Doctor19', 41, 1, 17.2367, -120.7380),
    ('Doctor20', 44, 2, -13.3424, -41.5426);

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
