# Backend Cats API

este es un backend en nestjs que se conecta a la api pública [thecatapi.com] https://thecatapi.com/v1

## características

- obtener todas las razas de gatos  
- buscar una raza por id  
- buscar razas por query  
- transforma los datos de la api al modelo interno `Breed`  
- sigue principios de clean architecture y SOLID  
- incluye pruebas unitarias para el service principal  

## endpoints

- `GET /cats/breeds` → devuelve todas las razas  
- `GET /cats/breeds/:breed_id` → devuelve una raza específica  
- `GET /cats/breeds/search?q=QUERY` → busca razas según la query  

## instalación

# Clonar el repositorio  
git clone <url-del-repo>

npm install

cd <nombre-del-proyecto>
instalar dependencias


npm install

# crear un archivo .env en la raíz con las variables de entorno del .env.example