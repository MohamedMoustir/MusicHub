
# 🎵 MusicStream – Application de Gestion et Lecture de Musique Locale

## 📌 Contexte du projet

**MusicStream** est une application web développée avec **Angular**, permettant aux utilisateurs d’écouter et d’organiser leur musique locale.
L’application vise à offrir une **expérience utilisateur fluide**, tout en respectant une **architecture Angular maintenable**, avec une gestion efficace des états grâce aux **Services Angular + RxJS / Signals**.

---

## 🎯 Objectifs

* Créer une application musicale simple et fonctionnelle
* Gérer efficacement les fichiers audio locaux et leurs métadonnées
* Mettre en place une architecture Angular moderne (services, lazy loading, état réactif)

---

## ✨ Fonctionnalités principales

### 🎼 Gestion des tracks (CRUD)

Pour chaque track :

* Nom de la chanson (max 50 caractères)
* Nom du chanteur
* Description optionnelle (max 200 caractères)
* Date d’ajout (automatique)
* Durée de la chanson (calculée automatiquement)
* Catégorie musicale (pop, rock, rap, etc.)

### 📄 Pages principales

* **Page Bibliothèque**

  * Liste des tracks
  * Barre de recherche
  * Filtres par catégorie
* **Page Track**

  * Détails du track sélectionné
  * Lecture audio

### ▶️ Lecteur audio

* Play / Pause
* Next / Previous
* Contrôle du volume
* Barre de progression
* Implémentation via **HTMLAudioElement / Web Audio API**

---

## 🧩 Architecture & Services

### 🔹 AudioPlayerService

Gestion de l’état du lecteur :

* États : `playing`, `paused`, `buffering`, `stopped`
* Contrôles : play, pause, next, previous, volume, progression
* Gestion réactive avec **BehaviorSubject ou Signals**

### 🔹 TrackService

Gestion CRUD des tracks :

* États : `loading`, `success`, `error`
* Opérations : create, read, update, delete
* Communication avec `StorageService`

### 🔹 StorageService

Persistance côté client :

* Stockage des métadonnées
* Stockage des fichiers audio
* Gestion des erreurs de lecture/écriture
* Interface uniforme pour le stockage

---

## 💾 Gestion des fichiers audio

* Technologie utilisée : **IndexedDB** (adaptée aux fichiers volumineux)
* Formats supportés : **MP3, WAV, OGG**
* Taille maximale : **10 MB par fichier**

---

## ✅ Validations & Gestion des erreurs

* Validation des champs (Reactive Forms)
* Validation des formats audio et images
* Limitation de taille des fichiers
* Messages d’erreur UI selon les états
* Gestion des erreurs de stockage

---

## ⚙️ Technologies utilisées

* **Angular 17+**
* **TypeScript**
* **RxJS / Observables**
* **Signals (Angular 17+)**
* **Reactive Forms**
* **Routing avec Lazy Loading**
* **Injection de dépendances**
* **Tailwind CSS / Bootstrap**

---

## 🧠 Concepts Angular mis en œuvre

* Components & Modules
* Services avec RxJS / Signals
* Data Binding
* Pipes
* Observables & Async Pipe
* Routing & Lazy Loading

---

## ⭐ Bonus implémentables

* Image de couverture pour chaque track (PNG / JPEG)
* Drag & Drop pour réorganiser les tracks
* Tests unitaires (Jasmine / Karma)
* Intégration API Lyrics
* Dockerisation de l’application

---

## 📦 Livrables

* 🔗 Lien GitHub : *à compléter*
* 🔗 Lien Jira : *à compléter*
* 📄 README.md

---

## 📅 Modalités pédagogiques

* Projet individuel
* Durée : **10 jours**
* Période : du **05/01/2026 au 16/01/2026**
* Deadline : **16/01/2026 avant minuit**

---

## 🏁 Critères de performance

* CRUD complet fonctionnel
* Architecture Angular respectée
* Gestion d’état avec Services + RxJS / Signals
* Validations et gestion d’erreurs opérationnelles
* Code propre et conforme aux standards Angular / TypeScript

---


