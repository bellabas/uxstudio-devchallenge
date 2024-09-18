CREATE TABLE IF NOT EXISTS Contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    email_address VARCHAR(255),
    profile_pic_base64 CLOB
);
