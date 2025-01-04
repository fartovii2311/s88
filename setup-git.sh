#!/bin/bash
# Cargar variables desde el archivo .env
export $(grep -v '^#' .env | xargs)

# Configurar Git con las credenciales
git config --global user.name "$GIT_USERNAME"
git config --global user.email "$GIT_USERNAME@github.com"
git config --global credential.helper store

# Agregar token a la URL remota
git remote set-url origin https://$GIT_USERNAME:$GIT_TOKEN@github.com/Manuel12yt/dark-ai.git

echo "Configuración de Git completada con éxito."
