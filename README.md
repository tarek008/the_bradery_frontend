# the_bradery_frontend
The_bradery_frontend est dédié à la gestion d'un système de panier et au processus d'achat en ligne. Il permet aux utilisateurs d'ajouter des articles au panier, assure la mise à jour du stock en temps réel, traite les paiements et enregistre les commandes dans la base de données.

# Preview

Pour voir la version Live de l'application, visitez le site [The_bradery](https://the-bradery-frontend.vercel.app/) site.  
![usage example](https://github.com/tarek008/the_bradery_frontend/blob/main/public/the_bradery_frontend.png)

## Development

1. Configurez la base de données en créant un fichier .env dans le répertoire racine et en ajoutant la configuration suivante :
 ```bash
REACT_APP_API_URL=https://node-mysql-api-thebradery.onrender.com
REACT_APP_STRIPE_KEY=pk_test_51O9ZqyE5zAXDvYrT7TOznIkDU7iK137bz6fOkOOytFBzjD1ae6wbJ9wwAOpJ3m13pwQYGNMravS46QzCjqazryhz00kKATNLdT
```
2. Installez les dépendances requises :
```bash
npm install
```
3. Lancez le projet:
```bash
npm run start
```

Testing :

Pour exécuter la suite de tests du projet, lancez la commande suivante :
```bash
npx cypress open
```
Ceci exécute les tests unitaires situés dans le dossier `cypress/e2e .



# Structure du projet

Une structure de projet très simple :
- `src`: Ce dossier est le conteneur principal de tout le code de votre application.
  - `services` : Responsable de la logique métier principale, c'est ici que sont définies les principales opérations et fonctionnalités. Le traitement des données et les algorithmes complexes se trouvent ici.
  - `components` : Contient les composants réutilisables qui peuvent être utilisés dans plusieurs vues ou dans d'autres composants.  
  - `pages` : Dossier regroupant les interfaces de l'application, chacune associée à une route spécifique  
  - `store` : Ce répertoire sert de centre de gestion d'état pour l'application. Utilisant souvent des outils comme Redux, il permet de centraliser l'état, de gérer les actions et les réducteurs, et de distribuer les mises à jour d'état à travers l'application.  
  - `middleware` :  Agit comme intermédiaire pour traiter les requêtes et offrir des services comme la sécurité et l'authentification


# Features
Panier: Les utilisateurs peuvent ajouter des produits à leur panier, en respectant la limite de stock disponible  
Paiement: Possibilité de faire un paiement et passer une commande.  
Commandes : Les utilisateurs peuvent voir leurs Commandes le prix total et chaque article de la commande  
Authentification : Les utilisateurs peuvent se connecter à l'application.

# Contribution
Les contributions à ce projet sont les bienvenues. Si vous trouvez des problèmes ou avez des suggestions d'amélioration, n'hésitez pas à créer une demande de tirage ou à soumettre un problème sur le dépôt du projet.
