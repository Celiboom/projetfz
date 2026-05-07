# Publication sur GitHub Pages

Ce projet est prêt pour GitHub Pages avec GitHub Actions. Le workflow publie seulement le dossier `ProjetFZ`, même si le dépôt local contient d'autres fichiers.

## 1. Avant de publier

Remplacer:

- `InsérerCodeICI` dans `index.html` et `script.js` par ton vrai code Fizz.
- `https://example.com/` dans `index.html`, `robots.txt` et `sitemap.xml` par l'URL GitHub Pages ou ton futur domaine.

Si tu n'as pas encore de domaine personnalisé, l'URL GitHub Pages ressemblera à:

```text
https://TON-USAGER.github.io/NOM-DU-REPO/
```

## 2. Créer le dépôt GitHub

1. Aller sur GitHub.
2. Creer un nouveau repository, par exemple `projetfz`.
3. Le laisser public si tu veux utiliser GitHub Pages gratuitement sans friction.
4. Ne pas ajouter de README depuis GitHub si tu vas pousser ce dossier local.

## 3. Connecter le dépôt local

Depuis `C:\Users\yrichard\Documents\New project`, exécuter:

```powershell
git add ProjetFZ .github/workflows/deploy-projetfz-pages.yml
git commit -m "Add ProjetFZ GitHub Pages site"
git remote add origin https://github.com/TON-USAGER/projetfz.git
git push -u origin master
```

Si GitHub crée le dépôt avec la branche `main`, utiliser plutôt:

```powershell
git branch -M main
git push -u origin main
```

## 4. Activer GitHub Pages

Dans le dépôt GitHub:

1. Aller dans Settings.
2. Aller dans Pages.
3. Dans Build and deployment, choisir Source: `GitHub Actions`.
4. Aller dans Actions et vérifier que `Deploy ProjetFZ to GitHub Pages` se termine correctement.
5. Revenir dans Settings > Pages pour cliquer sur `Visit site`.

Selon la documentation GitHub, la publication peut prendre quelques minutes après un push.

## 5. Apres publication

- Mettre l'URL finale dans `index.html`, `robots.txt` et `sitemap.xml`.
- Ajouter le site a Google Search Console.
- Ajouter le site a Bing Webmaster Tools.
- Vérifier que le bouton copie bien ton code Fizz.
- Tester le clic vers Fizz sur mobile.
- Tester les URL de langue: `?culture=fr-CA`, `?culture=en-US` et `?culture=es-ES`.

## Source officielle

- GitHub Docs: https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
