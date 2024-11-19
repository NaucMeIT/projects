---
type: lesson
title: Co dělá tester
---

Podíváme se na některou z unhappy path. Scénář, který by neměl projít.

1. Astronaut nelze přidat bez údajů
    - Jdi na úvodní stránku aplikace
    - Klikni na modré tlačítko + ADD
    - Klikni na tlačítko ADD
    - Očekávaný výsledek: Záznam není vytvořen, objevila se hláška: Fill in first and last name.

Hotovo(button) → Záznam se uložil. Podle zadání to není správné chování. Našel jsi bug.

Pokud právě ověřuji nově naprogramovanou funkci ADD, tak kontaktuji daného vývojáře a prodiskutuji s ním, že jsem nalezla chybu, kterou je potřeba upravit.

Pokud například dělám regresní testování, tedy zpětně ověřuji, že systém funguje, musím založit report. 

Každý report má určité náležitosti. Ukážeme si základní.  

- **Titulek (Title)** - krátký výstižný titulek, který vypovídá, o čem je chyba.
- **Prostředí** **(Environment)** - pro vývojáře je důležité mít informace o prostředí, kde nastala chyba. Uvést bys měl: *Prohlížeč, verze prohlížeče, operační systém, verze aplikace (popřípadě prostředí - záleží na projektu), rozlišení, případně mobilní zařízení.* Hodně záleží na firmě a projektu, tyto požadavky se mohou dosti lišit, ale neuškodí, když je nahlásíš - vývojáři tě budou mít mnohem raději.
- **Reprostepy (Steps)** - Je důležité vědět, jak ses k chybě dostal. Zda jsi klikl na levé či pravé tlačítko nebo napsal do Inputu *Ahoj* nebo *4545Dsad#*. Do reprostepů se píšou jasné kroky, které jsi udělal.
- **Aktuální výsledek (Actual result)** - Co je vlastně špatně? Jak to vypadá, když nastane chyba? Popsat ji můžeš slovně, obrázkově nebo natočit video. Častým kamarádem testera je screen obrazovky (na windows klávesová zkratka Win + Shift + S). Pokud se jedná o například o vizuální efekt, např. špatná animace, je vhodné natočit video, při kterém se snímá aplikace, ve které nastal problém. Jednoduchý záznam můžeš vytvořit programem [**ScreenToGif**](https://www.screentogif.com/). [**Gif**](https://www.interval.cz/clanky/gif-jpeg-a-png-jak-a-kdy-je-pouzit/) je [**obrazový formát**](https://cs.wikipedia.org/wiki/GIF) umožňující i animace.
- **Předpokládaný výsledek (Expected result)** - Popiš, jaký má být výsledek po opravení chyby. Neboj nemusíš se zde pouštět do žádných technických detailů. Vzhledem k tomu, že víš, že je daná věc chyba, tak bys měl mít představu, jak vypadá výsledek. Pokud jdeš podle ukázaného test casu, tak je to jasné. Popíšeš zde výsledek test casu. Pokud by se třeba jednalo o chybu animace, stačí zde napsat např. “*Animace funguje podle designu.*” Tahle položka je zde i kvůli **Definition of Done - tedy definici, podle které se může vyřešení chyby uznat za hotové.**

IT je běžné, že se používá angličtina pro dokumentaci. Ale záleží na firmě. Pokud jsi čistě v české firmě, není potřeba psát interní dokumentaci v angličtině. Pokud jsi v mezinárodním kolektivu, je angličtina nezbytná.

Zkus vyplnit svůj první report o chybě podle instrukcí

formulář

Stručný a výstižný titulek (Komentář - záznam lze uložit bez vyplněných povinných údajů)

Prostředí (v našem případě postačí prohlížeč - pokud jsi v chromu/edgi můžeš zkusit zjistit verzi, zadej do adresního řádku chrome://version nebo edge://version)

Reprostepy - kroky pro reprodukování chyby - popiš, co jsi udělal za kroky (v podstatě napíšeš kroky ze zadání)

Aktuální výsledek - přidej i fotografie

Předpokládaný výsledek - jaký má být výsledek (v zadání je napsaný očekavaný výsledek)

Hotovo → [vygeneruje se nějaký hezký report a vedle toho report, jak by mohl vypadat]

Vypadá tvůj report podobně? 

Dole pod reportem bude tlačítko přejít na další stránku