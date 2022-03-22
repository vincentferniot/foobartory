# Foobartory

Il s'agit d'une application créée avec Create React App, pour les commandes [voir plus bas](#create-react-app-commands)

Afin de lancer le minage, il faut choisir quelle opération on souhaite faire effectuer à chaque robot. Une fois le transfert terminé, le robot commence à miner. 
Au départ , on ne peut pas assembler de nouveau robot ou en acheter. Il faut suffisamment de foo et de bar pour que les boutons soient actifs.

Une fois la limite de 20 robots atteinte, tous les robots arrêtent leur tâche en-cours et un bouton permet de recommencer une nouvelle partie.
## Structure de l'application

J'ai choisi de partir sur une gestion du state global via un contexte. Il m'a permis d'avoir une API simple pour gérer les tâches et d'exposer cette API via un hook custom `useMiner`

Le context `miner.tsx` utilise le hook `useReducer` pour gérer les actions d'incrémentation des foos et bars. J'ai d'abord tenté de faire un state "classique" mais les timers aléatoires de minage de bars créaient un comportement hératique au niveau de l'affichage. Le souci venait des fonctions de l'API que je passais, qui mémorisaient la valeur du state à un instant T (comme toute closure) et faisait l'incrément à partir de cette valeur. Le reducer s'est donc imposé de lui-même.

## Helpers

Dans ce dossiers, on retrouve les constantes utilisées dans l'application, un fichier d'utils et surtout des fonctions utilitaires pour les tests. Ces dernières permettent d'englober un composant dans un ou plusieurs Provider suivant les cas de tests.

## Améliorations

Voici quelques axes d'amélioration pour cette application

- Design
- Gestion automatique du minage
- API/service/hook custom pour la fonction `mine` du composant `Foobar`
- State manager pour la gestion du state


# Create React App commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
