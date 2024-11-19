---
type: lesson
title: Co dělá tester
---

Teď sis vyzkoušel hladkou happy path a jednu unhappy path. Ale to nestačí. Formulář na kartičce obsahuje spoustu políček, o kterých nevíme, jestli fungují.  Například First name by mělo určitě obsahovat jen písmena
---
type: lesson
title: Co dělá tester
---
1. Astronaut nelze přidat s nekorekně  vyplněním First name
    - Jdi na úvodní stránku aplikace
    - Klikni na modré tlačítko + ADD
    - Zadej do pole First name nekorektní údaje
    - Zadej povinné údaje (Last name)
    - Klikni na tlačítko ADD
    - Očekávaný výsledek: Formulář nelze potvdit. Input First name je ohraničený červeně a je pod ním hláška: Field allows only letters.

Otestováno? button → Formulář lze uložit a vytvoří se nekorektní záznam. To je bug. Takže hurá na bug report. Už jsi zkušený, takže to zvládneš sám.

formulář

Stručný a výstižný titulek 

Prostředí

Reprostepy

Aktuální výsledek 

Předpokládaný výsledek

Hotovo → vygeneruje se nějaký hezký report a vedle toho report, jak by mohl vypadat

Vypadá tvůj report podobně? 

Takhle bys mohl pokračovat dál s každým polem. Například s daty je to vtipné pořízení. Protože v každé zemi se nepíšou stejně.

Dole pod reportem bude tlačítko přejít na další stránku