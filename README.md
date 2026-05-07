# ProjetFZ

ProjetFZ est un projet de site statique trilingue pour promouvoir un code de référence Fizz et convertir du trafic SEO/SEM/GEO vers l'abonnement Fizz.

Le site est conçu pour fonctionner sans serveur: il suffit d'héberger les fichiers statiques sur GitHub Pages, Cloudflare Pages, Netlify ou tout autre hébergeur de fichiers HTML/CSS/JS.

## Objectif

- Obtenir environ 1 conversion Fizz par jour.
- Faire connaître un code de référence Fizz avec un coût d'acquisition bas.
- Capter des recherches intentionnelles comme `code référence fizz`, `code promo fizz`, `forfait mobile fizz québec`, `internet fizz avis`, `économiser fizz`.
- Rester transparent: le site doit dire clairement que le propriétaire reçoit une prime si le code est utilisé.
- Offrir une expérience en français, anglais et espagnol.

## Hypotheses de depart

- Le code de référence Fizz est encore inconnu. Remplacer `InsérerCodeICI` par le vrai code.
- La prime Fizz affichée actuellement est de 25$ pour le parrain et 25$ pour la personne invitée, mais Fizz indique que le montant peut changer sans préavis.
- Le code doit être entré pendant l'activation du premier forfait Fizz. Il ne peut généralement pas être ajouté rétroactivement.
- Le bonus est appliqué après que le nouveau membre a cumulé deux mois de service, selon les conditions Fizz.

Sources officielles à vérifier régulièrement:

- [Programme de référence Fizz](https://fizz.ca/fr/inviter-des-amis)
- [FAQ référence Fizz](https://fizz.ca/fr/faq/comment-inviter-des-amis-chez-fizz)

## Fichiers

- `index.html`: landing page SEO prête à publier.
- `styles.css`: mise en page responsive.
- `script.js`: textes trilingues, copie du code, liens sortants et suivi d'événements local.
- `robots.txt`: directives pour les moteurs de recherche.
- `sitemap.xml`: sitemap à mettre à jour avec le vrai domaine.
- `github-pages.md`: marche à suivre pour publier sur GitHub Pages.
- `marketing-plan.md`: plan SEM, SEO et GEO.
- `keywords.md`: angles de contenu et mots-clés.
- `deploy.md`: options d'hébergement sans serveur.

## Configuration rapide

1. Remplacer tous les `InsérerCodeICI` par ton vrai code de référence Fizz.
2. Remplacer `https://example.com/` dans `index.html`, `robots.txt` et `sitemap.xml` par le futur domaine.
3. Publier le dossier tel quel sur un hébergeur statique.
4. Ajouter Google Search Console et Bing Webmaster Tools apres publication.
5. Si tu fais du SEM, commencer avec un budget test faible et des mots-clés exacts.

Les liens de conversion vers Fizz doivent toujours inclure le paramètre `?referral=TON-CODE`. Le site le fait automatiquement dans `script.js` à partir de `REFERRAL_CODE`.

## Notes importantes

Le site doit éviter de laisser croire qu'il est un site officiel Fizz. Les annonces, titres SEO et pages doivent rester transparents: `site indépendant`, `code de référence`, `prime de parrainage`, pas `coupon officiel` si ce n'est pas fourni officiellement par Fizz.
