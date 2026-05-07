# Publication GitHub Pages

## Recommandation

Publie `ProjetLD` dans un repo GitHub dédié. Cela évite les conflits avec les autres sites du dépôt actuel et respecte la limite d'un seul site GitHub Pages par repo.

## Option recommandée: repo dédié

1. Crée un nouveau dépôt GitHub, par exemple `ProjetLD`.
2. Copie le contenu de `ProjetLD/` à la racine de ce nouveau dépôt.
3. Pousse les fichiers sur la branche `main` ou `master`.
4. Dans GitHub, ouvre `Settings > Pages`.
5. Choisis la source de publication:
   - soit `Deploy from a branch`
   - soit `GitHub Actions`
6. Si tu publies directement les fichiers statiques, sélectionne la branche et le dossier racine.
7. Attends la génération du site et visite l'URL GitHub Pages.

## Clé Google Maps

Une fois l'URL GitHub Pages connue, restreins la clé API Google Maps à ce domaine:

- `https://<compte>.github.io/*` pour un site utilisateur
- `https://<compte>.github.io/<repo>/*` pour un site projet

Si tu testes aussi en local avec un petit serveur HTTP, ajoute au besoin:

- `http://localhost/*`

## Endpoint de lead

Comme GitHub Pages héberge seulement des fichiers statiques, la réception des leads doit passer par un service externe:

- webhook maison
- Formspree
- Make
- Zapier
- Google Apps Script

Le site est déjà prêt à envoyer du JSON ou du `application/x-www-form-urlencoded` selon `leadWebhookFormat`.

## Si tu veux absolument publier depuis ce dépôt actuel

Ce n'est pas recommandé tant que d'autres sites GitHub Pages vivent dans le même repo. Il faudrait alors:

1. Choisir quel site doit réellement être publié par le repo.
2. Remplacer ou désactiver le workflow/pages existant.
3. Pointer la publication vers `ProjetLD` au lieu de l'autre projet.

Cette approche ferait entrer `ProjetLD` en conflit avec l'autre site déjà présent.
