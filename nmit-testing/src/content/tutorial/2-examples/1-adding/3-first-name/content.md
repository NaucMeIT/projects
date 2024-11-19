---
type: lesson
title: Astronaut nelze přidat s nekorekně vylněnými udaji
---

Teď sis vyzkoušel hladkou happy path a jednu unhappy path. Ale to nestačí. Formulář na kartičce obsahuje spoustu políček, o kterých nevíme, jestli fungují.  Například First name by mělo určitě obsahovat jen písmena

<div style="background-color: var(--tk-background-secondary); padding: 0 0.5rem; margin: 0.5rem 0;">

1. Astronaut nelze přidat s nekorekně vyplněným First name
    - Jdi na úvodní stránku aplikace
    - Klikni na modré tlačítko + ADD
    - Zadej do pole First name nekorektní údaje
    - Zadej povinné údaje (Last name)
    - Klikni na tlačítko ADD
    - Očekávaný výsledek: Formulář nelze potvdit. Input First name je ohraničený červeně a je pod ním hláška: Field allows only letters.

</div>

Otestováno? Pokračuj na další stranu.
