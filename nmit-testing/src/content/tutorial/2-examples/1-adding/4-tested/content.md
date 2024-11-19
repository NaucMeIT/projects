---
type: lesson
title: Máš otestováno?
---

Formulář lze uložit a vytvoří se nekorektní záznam. To je bug. Takže hurá na bug report. Už jsi zkušený, takže to zvládneš sám.

<form>
<div>
<label for="title">Stručný a výstižný titulek</label>
<input type="text" id="title" name="title" placeholder="Např. Selhání přihlašovacího procesu" required>
</div>

<div>
<label for="environment">Prostředí</label>
<input type="text" id="environment" name="environment" placeholder="Např. Produkční prostředí, Chrome 91" required>
</div>

<div>
<label for="reproduction-steps">Reprostepy</label>
<textarea id="reproduction-steps" name="reproduction-steps" rows="4" placeholder="1. Přihlaste se na stránku" required></textarea>
</div>

<div>
<label for="current-result">Aktuální výsledek</label>
<textarea id="current-result" name="current-result" rows="3" placeholder="Např. Systém zobrazuje chybovou stránku místo očekávaného dashboardu" required></textarea>
</div>

<div>
<label for="expected-result">Předpokládaný výsledek</label>
<textarea id="expected-result" name="expected-result" rows="3" placeholder="Např. Úspěšné přihlášení a zobrazení uživatelského dashboardu" required></textarea>
</div>

<button type="submit" class="submit-form">Odeslat hlášení</button>
<div class="reports-container">
<div class="report">
<h2>Tvůj report</h2>
<div id="user-report"></div>
</div>
<div class="report">
<h2>Náš vzorový report</h2>
<div id="example-report">
<div class="report-field">
<h3>Titulek:</h3>
Problém s přihlašováním na platformě
</div>
<div class="report-field">
<h3>Prostředí:</h3>
Produkční prostředí, Firefox 92
</div>
<div class="report-field">
<h3>Reprostepy:</h3>
1. Otevřete hlavní přihlašovací stránku<br>
2. Zadejte platné přihlašovací údaje<br>
3. Klikněte na tlačítko "Přihlásit"
</div>
<div class="report-field">
<h3>Aktuální výsledek:</h3>
Přihlašovací proces zamrzá, žádná odezva
</div>
<div class="report-field">
<h3>Předpokládaný výsledek:</h3>
Úspěšné přihlášení a přesměrování na hlavní dashboard
</div>
</div>
</div>
</div>
<script>
		const form = document.querySelector('form');
		const submitButton = document.querySelector('.submit-form');
		const reportsContainer = document.querySelector('.reports-container');
		const userReportContainer = document.getElementById('user-report');
		form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				const reportData = {
						title: formData.get('title'),
						environment: formData.get('environment'),
						reproductionSteps: formData.get('reproduction-steps'),
						currentResult: formData.get('current-result'),
						expectedResult: formData.get('expected-result')
				};
				userReportContainer.innerHTML = `
						<div class="report-field">
								<h3>Titulek:</h3>
								${reportData.title}
						</div>
						<div class="report-field">
								<h3>Prostředí:</h3>
								${reportData.environment}
						</div>
						<div class="report-field">
								<h3>Reprostepy:</h3>
								${reportData.reproductionSteps}
						</div>
						<div class="report-field">
								<h3>Aktuální výsledek:</h3>
								${reportData.currentResult}
						</div>
						<div class="report-field">
								<h3>Předpokládaný výsledek:</h3>
								${reportData.expectedResult}
						</div>
				`;
				reportsContainer.style.display = 'grid';
				form.reset();
				submitButton.blur();
				reportsContainer.scrollIntoView({ behavior: 'smooth' });
		});
</script>
</form>

Vypadá tvůj report podobně?

Takhle bys mohl pokračovat dál s každým polem. Například s daty je to vtipné pořízení. Protože v každé zemi se nepíšou stejně.
