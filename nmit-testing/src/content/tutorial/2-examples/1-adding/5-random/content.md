---
type: lesson
title: Přidání astronauta s náhodně vyplněnými údaji
---

1. řidání astronauta s náhodně vyplněnými údaji
    - Jdi na úvodní stránku aplikace
    - Klikni na modré tlačítko + ADD
    - Klikni na tlačítko RANDOM
    - Klikni na tlačítko ADD
    - Očekávaný výsledek: Záznam je úspěšně vytvořen s náhodnými údaji

Hotovo (button) →  Záznam je sice uložený ale je prázdný.  Chyba není, že jde uložit prázný záznam. (tu jsme již reportovali výše). Chyba je už dříve. Kliknutím na tlačítko RANDOM, se nevygenerovali, žádné údaje. Takže je čas na bug report, ale než se do něj pustíš seznámím tě se svým kamarádem. Pro další krok je dobré, abys byl v chrome.

Jdi na stránku s astronauty a zmáčkni ctrl+shift+I. Otevřou se ti vývojářské nástroje (DevTools). Zde můžeš ladit aplikaci, zjišťovat o ni více, sledovat její chování, meřit její rychlost, zpravovat cache (udaje, které má uložené). Pro teď  jdi do záložky Konzole(Console) a klikni znovu na tlačítko RANDOM.

Vyskočí tam nepěkná chyba. Která říká, že nějaká funkce nalezena. Dále v stack trace najdeš víc informací jako že chybu vyhodila funkce onRandom. To tě jako juniora trápit nemusí. Ale pokud dodáš ke svému bug reportu například i obrázek z DevTools, pomůžeš víc než dost.



![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/dc1eb207-4c46-4bd1-af03-4b812591d291/fb6bb588-60aa-413d-8650-1ee7fd185052/Untitled.png)

DevTools nalezneš i v dalších prohlížečích, V každém vypadají trochu jinak. Nejčastěji se testuje na chromu, protože je nejvíc používaný a tým chromu šlape do vývoje DevTools. DevTools jsou jeden z nejdůležitějších nástrojů, pokud se budeš zabývat webovým vývojem.

formulář

Stručný a výstižný titulek

Prostředí

Reprostepy

Aktuální výsledek

Předpokládaný výsledek

Hotovo → vygeneruje se nějaký hezký report a vedle toho report, jak by mohl vypadat

Vypadá tvůj report podobně?
Dole pod reportem bude tlačítko přejít na další stránku
