# Mon Projet Fullstack (Laravel + React)

Ce projet est une application web fullstack utilisant Laravel pour le backend et React pour le frontend.

## Prérequis
Avant de commencer, assurez-vous que vous avez installé les éléments suivants sur votre machine :
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/) (version 8.0 ou supérieure)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/land22/application_web.git
cd application_web
```
### 2. Installer le backend (Laravel)
#### 2.1. Accédez au dossier backend :
```bash
cd backend
```
#### 2.2. Installer les dépendances Composer :
```bash
composer install
```
#### 2.3. Copier le fichier .env.example et le renommer en .env :
```bash
cp .env.example .env
```
#### 2.4. Générer la clé de l'application :
```bash
php artisan key:generate
```
#### 2.5. Configurer la base de données dans le fichier .env :
Assurez-vous d'avoir une base de données prête et de modifier les informations de connexion dans le fichier .env.
#### 2.6. Lancer les migrations (optionnel si nécessaire) :
```bash
php artisan migrate
```
#### 2.7. Démarrer le serveur de développement Laravel :
```bash
php artisan serve
```
### 2. Installer le frontend (React)
#### 3.1. Accédez au dossier frontend :
```bash
cd ../frontend
```
#### 3.2. Installer les dépendances npm ou Yarn :
 ```bash
 npm install
  # ou
  yarn install
```
#### 3.3. Démarrer le serveur de développement React :
 ```bash
 npm start
# ou
yarn start
```
### Lancer le projet en production
Pour lancer le projet en production, assurez-vous de configurer votre serveur avec les environnements nécessaires (par exemple, Apache ou Nginx pour Laravel et un service de déploiement pour React).
#### Build du frontend pour la production
```bash
 npm run build
# ou
yarn build
```
Cela générera un dossier build/ que vous pourrez servir sur un serveur web.
### Notes supplémentaires
Variables d'environnement : Assurez-vous que les variables d'environnement dans le fichier .env sont correctement configurées pour la production.
Serveur : Pour un déploiement sur un serveur, configurez votre serveur web (Apache, Nginx) pour pointer vers le dossier public/ de Laravel.
