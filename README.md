# Šangaj Street Food — website

Statički sajt, spreman za GitHub Pages. Bez build koraka.

## Objavljivanje (GitHub Pages)
1. Napravi repozitorijum i ubaci sadržaj ovog foldera u root (index.html mora biti u rootu).
2. Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`.
3. Sajt je na `https://<korisnik>.github.io/<repo>/`.

## Veličina
Svi assets zajedno ~15.7 MB (slike su JPG, optimizovane za web). Najveći fajl je `assets/hero-loop.mp4` (10 MB) — u granicama GitHub limita (100 MB po fajlu).

## Struktura
- `index.html` — cela stranica
- `styles.css` — stilovi i animacije
- `script.js` — preloader, status traka, reveal animacije, parallax, hamburger meni, tabovi menija
- `assets/` — video i slike

## Dodavanje fotografija
Prazna polja pokazuju putanju koju očekuju:
- jela: prazna polja pokazuju putanju (`assets/food/02.jpg`, `07.jpg` … `12.jpg`); popunjene kartice već imaju slike (`sangaj-specijal.jpg`, `hrskava-piletina.jpg`, `gurmanski-sis.jpg`, `smash-burger.jpg`, `cepkano-prase.jpg`)
- galerija: već popunjena (`assets/gallery/`)

Ubaci fajl sa tim imenom i slika se sama pojavi (bez slike se prikazuje putanja).

## Podaci
Adresa Kralja Petra I Karađorđevića 4, Inđija · Telefon +381 62 830 3866 · Instagram @sangajstreetfood · TikTok @sangaj.street.food · TikTok @sangaj.street.food · Dostava samo na teritoriji Inđije.
Radno vreme: pon–čet 09–23, pet–sub 09–00, ned 16–23.
