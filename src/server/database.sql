-- Create the user_auth database if it doesn't exist
CREATE DATABASE IF NOT EXISTS user_auth;
USE user_auth;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(50) NOT NULL
);

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    address TEXT,
    education TEXT,
    work_experience TEXT,
    skills TEXT,
    linkedin_profile VARCHAR(255),
    github_profile VARCHAR(255),
    profile_image LONGBLOB,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the templates table
CREATE TABLE IF NOT EXISTS templates (
    template_id INT AUTO_INCREMENT PRIMARY KEY,
    template_name VARCHAR(100),
    template_data LONGBLOB,
    template_image LONGBLOB
);
