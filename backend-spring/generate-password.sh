#!/bin/bash
# Script pour générer le hash BCrypt du mot de passe

# On utilise Python pour générer le hash BCrypt
python3 << 'PYTHON'
import bcrypt

password = "password123"
salt = bcrypt.gensalt(rounds=10)
hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
print(hashed.decode('utf-8'))
PYTHON
