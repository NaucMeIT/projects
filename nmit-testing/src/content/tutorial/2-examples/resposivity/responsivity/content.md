---
type: lesson
title: Co dělá tester
---
Webové aplikace se nedělají jen pro počítače s velkými obrazovkami, ale i pro tablety či mobily. Nebo jen lidé zmenšují okna, aby se jim vlezlo více na monitor. Proto je dobré zkontrolovat, jak se chová aplikace při zmenšování a zvětšování okna. Takzvanou responsibilitu.

Máš několik možností jak na to:

1. vlastníš strašně moc zařízení, na kterých si astronauty zkusíš
2. máš možnost nasimulovat strašně moc zařízení například v devtools.

Proč není vhodné jen zmenšovaní a zvětšování okna? To může ukázat na prvotní problém, ale jak to zareportuješ? Na jakou velikost jsi zmenšil okno.

Jdi do DevTools. Hned druhá ikonka v horní liště je device emulation (emulace jiného zařízení). Klikni na ni. Objeví se ti prostor, kde si můžeš hrát. Nahoře máš lištu, kde máš měřítko. Zárověň když klikneš na dimensions, objeví se ti select s výběrem mobilních telefonů. 

Tohle slouží pouze pro zkontrolování jak aplikace vypadá na jiném zařízení. Nesimuluje ho to. → Pokud potřebuješ testovat chování tlačítek na mobilu nedělej to v tomto modu. Pokud potřebuješ jen ověřit, jak to bude vypadat, klidně to použij.

A teď  co vlastně testuješ:

1. Ověř responsibilitu záznamů
    - Prerekvizita: alespoň 4 záznamy s astronautem
    - Zkontroluj rozložení záznamů na jiných zařízeních
    - Očekávaný výsledek: Počet zobrazených záznamů v jedné řadě je maximálně 3, minimum je 1. Záznamy mají stejné rozměry.
    

Hotovo → Nějaký žvásty o responsibilitě

vygeneruje se nějaký hezký report a vedle toho report, jak by mohl vypadat
Vypadá tvůj report podobně? 

Dole pod reportem bude tlačítko přejít na další stránku