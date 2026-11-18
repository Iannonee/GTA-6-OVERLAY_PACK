# Vice City Live — GTA VI inspired overlay pack

Pacchetto fan-made di scene HTML/CSS per OBS Studio e GitHub Pages. Grafica originale ispirata all'atmosfera neon di Vice City; non è un prodotto ufficiale Rockstar Games.

## Contenuto
- `index.html`: hub con collegamenti a tutte le scene.
- `pages/starting-soon.html`: schermata di attesa con countdown.
- `pages/just-chatting.html`: talk / chiacchiere con webcam e pannello chat.
- `pages/gameplay.html`: overlay trasparente da sovrapporre al gameplay, con webcam e chat.
- `pages/brb.html`: pausa.
- `pages/alerts.html`: alert follow/sub/donazione configurabile via URL.
- `assets/css/styles.css`: stile condiviso.
- `assets/js/config.js`: configurazione centrale (nome canale, social, colori, layout e alert).
- `assets/js/app.js`: applica la configurazione, gestisce countdown e anteprima alert.

## Pubblicazione su GitHub Pages
1. Crea una repository GitHub, ad esempio `vice-city-live`.
2. Carica il contenuto di questa cartella nella root della repository (non caricare la cartella contenitore come sottocartella).
3. Vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona `main` e `/ (root)`, poi salva.
6. Dopo la pubblicazione, apri l'URL GitHub Pages della repository.

## OBS Studio
Aggiungi una sorgente **Browser** per ogni scena:
- Width: `1920`
- Height: `1080`
- URL: l'URL GitHub Pages della singola pagina, ad esempio `https://TUO-UTENTE.github.io/TUA-REPO/pages/gameplay.html`

Per `gameplay.html`, aggiungi la Browser Source sopra la sorgente della capture card/PS5. La pagina è trasparente: lascia visibile il gameplay sotto. La cornice webcam è un segnaposto grafico: posiziona la sorgente webcam OBS sopra il riquadro, ritagliandola e ridimensionandola.

Per `just-chatting.html`, la pagina è ora trasparente: metti la webcam OBS a schermo intero (1920×1080) SOTTO la Browser Source. Il pannello chat è predisposto graficamente; per mostrare i messaggi reali aggiungi una Browser Source separata con il widget chat di Twitch/StreamElements e allineala al pannello.

## Countdown
La schermata Starting Soon parte da 10 minuti. Puoi modificare `data-minutes="10"` in `pages/starting-soon.html`.
Puoi anche passare i minuti nell'URL: `starting-soon.html?minutes=5`.

## Alert
Esempi di URL:
- `alerts.html?preview=1` — anteprima follow.
- `alerts.html?type=sub&name=NomeUtente`
- `alerts.html?type=donation&name=NomeUtente`

Questa pagina è la grafica dell'alert, non un sistema di notifiche collegato automaticamente a Twitch. Per gli alert live, configura il widget alert del tuo provider (es. StreamElements) e usa questa grafica come riferimento oppure integra il provider nel passaggio successivo.

## Personalizzazione rapida
- Colori, layout e dimensioni: `assets/css/styles.css`.
- Testi e titoli: modifica direttamente le pagine in `pages/`.
- Social: sostituisci le etichette Twitch/YouTube/TikTok con i tuoi handle o icone.

## Nota tecnica
Le pagine scena sono canvas 1920×1080. I font Google vengono caricati online; per una resa identica offline, installa/localizza i font Barlow Condensed, DM Sans e Pacifico e modifica l'import in `styles.css`.

## Configurazione centralizzata
Apri `assets/js/config.js`: è l'unico file da modificare per personalizzare il pacchetto.

- `channelName`, `tagline`, `slogan`, `streamerName`: identità del canale (`streamerName` è la scritta Br3nDy4R sotto la webcam).
- `social`: handle Twitch, YouTube e TikTok.
- `colors`: palette CSS globale.
- `layout`: abilita/disabilita webcam, chat e HUD gameplay (`true` / `false`).
- `startingSoon.minutes`: durata predefinita del countdown.
- `alerts`: testi degli alert.

Dopo aver modificato il file, tutte le pagine useranno automaticamente i nuovi valori. I campi social sono predisposti per gli handle; per aggiungere/rimuovere piattaforme occorre intervenire anche nel markup delle pagine.
