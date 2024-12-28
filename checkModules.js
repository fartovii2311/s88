import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(__dirname);

// Leer el package.json para obtener las dependencias
const packageJson = require(path.join(__dirname, './package.json'));

// Fusionar las dependencias y devDependencies en un solo objeto
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

// Función para verificar si un módulo está instalado correctamente
function checkModule(moduleName) {
    try {
        require.resolve(moduleName);
        console.log(`Módulo encontrado: ${moduleName}`);
    } catch (error) {
        console.error(`Falta el módulo: ${moduleName}`);
    }
}

// Verificar cada módulo en las dependencias
for (const moduleName in dependencies) {
    checkModule(moduleName);
}
