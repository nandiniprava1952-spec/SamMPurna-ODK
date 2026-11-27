# SAMMPurNA – MNC Dashboards (ANC · HBNC/HBYC/PNC)

Single-file, offline-capable dashboard for Odisha NHM (Rev 93).

- Live site: https://nandiniprava1952-spec.github.io/SAMMPurNA/
- Works offline after first load; "＋ New Entry" saves on the device.
- Form language: English / ଓଡ଼ିଆ / both (selector in the form).
- Existing beneficiary search under "＋ New Entry" (ANC and HBNC): find earlier visits by name, village or mobile and pre-fill the form. Works offline.

## What's new in Rev 93
### Near EDD now means "EDD in the current month"
- **ANC module: "Near EDD" counts beneficiaries whose EDD falls in the current calendar month (1st to the last day, 30 or 31 / 28 or 29 days), not "today to +30 days".** Changed in the Home KPI card, the District Review table and the Summary Report (PDF / Word / Excel), the EDD-ratio metric, and the records filter ("Due this month", replaces "Due in next 30 days"; "Due in next 7 / 14 days" and "Overdue" are unchanged). The Summary Report header now prints "Near EDD window: 1-30 Nov 2026 (current month)". The month is taken from the date the dashboard or report is opened; it does not change with the Visit Date filters. EDDs earlier in the same month are included.

### Rev 141
- ANC dashboard keeps **Near EDD = due this month** (as in Rev137_EDD_month). All Rev 138-140 fixes are kept (cloud load retry / save guard, new ODK column names, newborn / child danger split by age). Same code as Rev 140, version label Rev 141.

### Rev 140
- **Newborn vs child danger signs for the newer ODK form.** The newer export has one danger flag (`class_child_in_danger`) and one sign list (`danger_sign_child`) for both newborns and young children. They are now split by age at the visit, using the dashboard's existing rule: age up to 28 days (or age not recorded) = newborn danger sign, older = child danger sign. Mother danger signs still come from `class_mother_in_danger` / `danger_sign_mother`.
- Danger signs carried over from an earlier visit (`child_in_danger_reg`) are no longer counted as a new danger sign on the repeat visit.

### Rev 139
- **New ODK form version understood (columns `class_*`, `*_input`, `*_reg`, `uid_registered`, `today_date_decimal`).** The HBNC dashboard now reads preterm birth (`class_preterm_birth`), low birth weight (`class_low_birth_weight`), child danger sign (`class_child_in_danger`, signs from `danger_sign_child`) and mother danger sign (`class_mother_in_danger`, signs from `danger_sign_mother`) from the newer export, besides the old column names. Old-format rows are read exactly as before.
- Repeat visits are linked to the beneficiary through `uid_registered` (and the `_reg` name / date-of-birth columns), so Beneficiaries Covered and Repeat Visits are counted per beneficiary.
- The visit date comes from `today_date_decimal` (when valid) instead of the submission date.
- Not changed (needs the XLSForm): newborn danger signs (no field in the new export), referral cases, and the child danger-sign labels (new codes D1, D2, D10 ... shown as codes).

### Rev 138
- **Cloud load no longer shows an incomplete result as if it were the full data (State login: HBNC showed 308 visits instead of ~87,000).** If some saved snapshots cannot be read (for example while an ODK sync is rewriting them) or the cloud returns less than half of what was on screen, the load is retried up to 3 times (20 s apart, fresh manifest). If it still fails and the old data was not cleared, the data on screen is kept and a message says so. If the old data had already been cleared to save memory, the partial records are shown with a clear WARNING and **Save records to cloud is blocked** until a full Load latest or a CSV / Excel load succeeds (offline-entry auto-sync is not affected).
- The version label now reads Rev 138.

### Rev 137
- **HBNC: no more "Page Unresponsive" right after login (State / large logins).** After login the dashboard loads the saved records from the cloud and then built every record and drew every screen in one long step (a State login is about 28,000 HBNC visits with about 900 columns each), so the browser could show "Page Unresponsive". The cloud load now does the same work in slices of about 1,200 records and draws the screens one after another, giving the browser a turn in between, with the status line showing "Preparing N records ...". The records and the screens are identical to before (checked on a 27,642-visit file). Logging out or starting another load stops a load that is still running. Small loads (under 3,000 records), CSV / Excel loads and ANC are unchanged.
- The version label now reads Rev 137.

### Rev 136
- **New "⟳ Sync from ODK" button (all logins, including facility logins).** Next to "Save records to cloud" and "Load latest". It asks the cloud script to fetch the newest ODK Central submissions right now (the script also does this by itself every 15 minutes), then reloads the open module from the cloud (a facility login receives only its own facility's records). It needs the OdkIngest.gs add-on and the `odksync` action in the cloud script. Nothing else in the dashboard changed.
- **PC / tablet header layout.** Log out now sits in the top-right corner right after the Online / Offline pill, and the cloud buttons, status message and "Viewing: ..." line sit on their own row under the title (same in HBNC, ANC and Training Tracker). Phones are unchanged.

### Rev 135
- **ANC on phones: the Visit date From / To filter boxes are now clearly visible.** They were bare, unlabelled native date boxes (and could show blank or collapsed on some phones). Each now has a label ("Visit date from" / "Visit date to"), the dark theme, a full-width 44 px box on phones, and the same look on larger screens. Filtering itself is unchanged.
- **ANC: fixes the "Page unresponsive" prompt on large files.** The danger-sign and High Risk Pregnancy checks were recalculated for every record on every load, filter change and redraw, and date text was re-parsed each time. They are now calculated once per record and cached (an edited record is recalculated), dates are parsed / formatted once per distinct value, and a filter change now redraws once instead of twice (typing in the search box waits 0.25 s). In a 20,000-visit test loading went from about 3.3 s to 1.5 s and a redraw from about 0.44 s to 0.17 s. Results are unchanged.
- **Log out button on phones.** The power symbol was a text character that many phones do not have in their font (shown as an empty box); it is now a small drawn icon that shows everywhere. On phones the button also no longer sits on top of the "Training Tracker" tab: it stays in the "Viewing: ..." row at the right.
- **Phones: the dashboard tabs fill the full row width** (HBNC / HBYC / PNC and ANC Home Visit side by side, equal width; Training Tracker shares the row when it is shown).

### Rev 134
- **HBNC / HBYC / PNC: designation labels corrected.** The HBNC form saves the worker's designation as 1 = Medical Officer, 3 = CHO, 4 = ANM, 5 = ASHA, 6 = MPW (7 = Nursing Officer kept). The dashboard had 2 = CHO, 3 = ANM, 4 = ASHA, 5 = Data Entry Operator, so ANMs were shown as ASHA, CHOs as ANM and ASHAs as Data Entry Operator. Fixed everywhere a designation is shown or chosen (Worker column, Designation filter, "Visits by Designation" cards, record detail, "＋ New Entry" list). The codes were confirmed by matching HBNC workers to the ANC export by mobile number. Raw data is unchanged. Codes 2 and Data Entry Operator are no longer listed because no record uses them; tell us if the form has them under another number.
- Note: HBNC entries made with "＋ New Entry" before Rev 134 were saved with the old numbering and will show a different designation now. Check and correct them with Edit. If a device has an uploaded designation list (code master upload), clear it so the built-in list applies.

### Rev 133
- **ANC on phones: the filter boxes are no longer huge.** On narrow screens the filters are stacked in a column, but each dropdown still had a "140 px" flex size that was applied as its height, and the searchable Block / Facility boxes copied it. All filter controls (Records filters and the Home chart controls) now keep their normal height and the full width. No change on larger screens.

### Rev 132
- **ANC: designation labels corrected - code 2 is ANM and code 3 is CHO (they were the other way round).** In the ANC form data, `user_designation` 1 = MO, 2 = ANM, 3 = CHO. The dashboard showed 2 as CHO and 3 as ANM, so every ANM was listed as a CHO (and every CHO as an ANM). Fixed in the Worker (Designation) column, the Designation filter, the "Visits by Designation" cards, the Worker Type chart choices and the record detail view. The "＋ New Entry" Designation list now saves the right code too (order: MO, ANM, CHO). The raw data is unchanged. HBNC is not changed in this revision.
- Note: ANC entries made with the PWA's "＋ New Entry" before Rev 132 were saved with the old numbering (choosing CHO saved 2, choosing ANM saved 3), so on the dashboard they now show the opposite designation. Check and correct them with Edit.

### Rev 131
- **New Entry (ANC and HBNC): a carried-over designation no longer sticks to the wrong worker.** After *Save & add another* (or when a beneficiary is picked from the search), the form keeps the previous worker's name and designation. If a different worker (for example an ANM taking over from a CHO) typed their own name but did not touch the Designation box, the entry was saved with the earlier worker's designation. Now, as soon as the worker name is changed, the carried-over designation is cleared, the field is marked and a note asks the worker to select their own designation (it is a required field, so the entry cannot be saved without it). A designation the worker has chosen by hand is never cleared. Entries already saved with the wrong designation are not changed; correct them with Edit.

### Rev 130
- **HBNC: faster loading of records (fixes the repeated "Page unresponsive" prompt while HBNC data loads).** The per-visit checks for death flags, SNCU/NICU discharge, GPS columns and designation columns each scanned every column of every record with text patterns. The column scan is now done once per column layout and reused. Results are unchanged; building the records is about 5x faster in a 5,000-record test.

### Rev 129
- **New Entry: "Existing beneficiary? Search to pre-fill" no longer copies the previous visit's worker name and designation.** Before, an ANM adding a repeat visit could be saved as the CHO (or MO) who made the earlier visit. Worker name and designation now stay as the person typed or selected them (they still carry over with Save & add another).

### Rev 126
- **Treatment Tracker (State login): records with no treatment data can now be deleted.** Ticked records that have treatment data are cleared as before; ticked records with no treatment data are removed from the Treatment Tracker list (the visit stays in the dashboard). The removal syncs to the cloud and is covered by **Undo delete**. Uploading a tracker file with data for a removed record brings it back.
- **Records table (State login): Edit / Delete buttons now also appear for records whose ID is in `meta/instanceID`, `instanceID`, `_id`, `KEY` or `uuid`** (previously only records with a `_uuid` column). Records with no ID column at all still show View only.
- **Treatment Tracker (State login): keyboard multi-select.** Shift+click a tick box selects the range since the last one clicked; Tab / ↑ ↓ / Home / End move between tick boxes (Space ticks), Shift+↑ / ↓ extends or shrinks the range; Ctrl/Cmd+A selects all; Esc clears; Delete key opens Delete selected (still asks you to type DELETE). Keys are ignored while typing in a text box.
- **Treatment Tracker Summary: From date / To date filter** (visit date) beside District / Block / Facility, with a Clear dates button. Applies to the case-type table and the District / Block / Facility table.
- **New Entry form (facility login): ODK-style appearance** with a header toggle: **ODK Web** (light Enketo-style page, numbered questions, section header bars), **ODK Collect** (one section per screen, progress bar, Jump-to list, Back / Next with required-question check, Save on the last screen) or **Classic** (old dark form). The choice is remembered on the device; phones default to ODK Collect. The form opens **full screen** for facility login (all three styles); on wide screens the questions stay centred in a readable column. The page's own top bar (title, Save / Load, tabs) is hidden while the form is open and returns when it is closed, and the form header is compact on phones. Other logins are unchanged.

- **Load latest / cloud load uses much less memory** (State login): when memory use is already high, the data already on screen is released before the cloud data is read in (instead of holding two full copies), and districts are read two at a time. If the load does not finish, a message says the screen data was cleared and to try again.

### Rev 92
- **Faster, lighter "Save records to cloud"** (State login especially): rows are compared without building two JSON strings each (about 4x faster), rows are no longer copied when they already have only the known columns, big uploads (over 30,000 records) save one district at a time with short pauses so the browser can free memory, and the save pauses with a clear message (instead of crashing) if memory runs very low. Districts already saved stay saved; run it again to continue.

### Rev 91
- **Out-of-memory guard** for *Load New CSV / Excel*: very large files (over 25,000 records) skip the automatic cloud save, and files over 8,000 records skip the automatic refresh from the cloud, so the browser tab doesn't crash. Use "Save records to cloud" / "Load latest" instead (a computer works best). For huge files prefer CSV over Excel, or split by district.

### Rev 90
- HBNC: after login the dashboard now opens on a clean **Home** view (previously Records-only cards and filters could also appear on Home).

### Rev 89
- HBNC: **Nursing Officer** added to the Designation choices ("＋ New Entry" and the Visits by Designation cards).

### Rev 88
- ANC "＋ New Entry": the **Home location (GPS)** section (latitude, longitude, accuracy, area; auto-captured, works offline) is now inside the form, like HBNC, and is saved with the entry and to the cloud.

### Rev 87
- % KPI cards (HBNC and ANC) now show the **figure as the main number and the percentage in brackets**, e.g. **3 (12.5%)**.

### Rev 86
- % KPI cards (HBNC and ANC) now show the figure in brackets right next to the percentage, e.g. **12.5% (3)**; hover for "3 of 24 visits".

### Rev 85
- **% KPI cards now also show the figure** (e.g. "12.5% - 3 of 24 visits") in HBNC and ANC.
- HBNC death cards: death columns are now found by name more flexibly (e.g. "Death of Newborn", "Mother Died").
- The running build ("Rev 85") is shown next to the login badge, so you can check you have the latest file.

### Rev 84
- HBNC: new KPI cards **Newborn / Child Deaths** and **Mother Deaths** (visits with a death reported) under Dashboard, District Review and Records. Click a card to list those visits. Not shown on Home.

### Rev 83
- HBNC Home: removed the "Fast Breathing (>60/min)" and "No Spontaneous Movement / Lethargy" cards; "Preterm / Low Birth Weight" is now two cards, **Preterm Births** and **Low Birth Weight** (each clickable to list its visits).

### Rev 82
- HBNC **Visits by Designation**: the worker's designation is now read from `user_designation` (code or label text) or any other column containing "designation". Visits with a blank designation take the designation the same worker (name + district + block) has in their other visits when it clearly dominates (60%+). Only visits with no usable information stay in "Not recorded".

### Rev 81
- **Cloud repair:** if saved cloud data for a block/district is damaged ("Skipped: saved data incomplete or damaged"), saving no longer refuses. Load a file that contains those records (Load New CSV / Excel saves automatically, or click Save records to cloud) and the damaged copy is rebuilt from it. Network/server hiccups are still only retried, never overwritten.

### Rev 80
- Auto-save after **Load New CSV / Excel** made more reliable: it now waits for any cloud save/load already running (instead of failing), retries 6 times over about 5 minutes, and shows the real reason if it still cannot save. Offline-entry auto-save uses the same safe wait.

### Rev 79
- WhatsApp summary (ANC and HBNC offline entries) now has an **Address** line (village name, facility name) right below the visit date.

### Rev 78
- HBNC "＋ New Entry": **Notes** field added under Action & referral (same as ANC).
- Notes now appear in the WhatsApp summary message (ANC and HBNC).
- The "WhatsApp" section is renamed **WhatsApp (referral)** in ANC and HBNC.

### Rev 77
- HBNC tab renamed **Load New CSV / Excel**.
- After a CSV / Excel file is loaded in ANC or HBNC, its records are **saved to the cloud automatically** (merged with existing records) and the dashboard **refreshes with the updated records**. Needs a cloud login and internet; if not available yet, it waits and retries (every minute, when back online, after login).

### Rev 76
- Removed the "Send WhatsApp (BDM)" button and the BDM number box from Offline Records (ANC and HBNC). CSV / Excel export and Delete all are unchanged.

### Rev 75
- "＋ New Entry" (ANC and HBNC): dropdown choices (District, Block, Visit number, etc.) now always show readable text on the dark list, on phones/browsers that open a white native dropdown.

### Rev 74
- HBNC "＋ New Entry": new **Availability** field under *Child & mother* (Available / Not available / Migrated / Died / Refused).

### Rev 73
- HBNC "＋ New Entry": new **Discharged from newborn care facility (SNCU/ NBSU/NICU)** (Yes/No) field under *Birth details*. It feeds the SNCU Discharged KPI card and is saved to the cloud with the entry.

### Rev 72
- Removed the "＋ New Entry" and "Offline Records" tabs from the top bar of ANC and HBNC (the buttons on the upload card are unchanged).

### Rev 71
- HBNC **SNCU Discharged** KPI card now follows the response to *"Discharged from newborn care facility (SNCU/ NICU)"* (Yes = discharged; counted once per beneficiary; the card opens all their visits).

### Rev 70
- **Auto cloud save of offline "＋ New Entry" records**: as soon as the phone is online and a district/block/State login is active, new entries are uploaded to the cloud automatically (when the phone comes back online, when the app is reopened, and by a retry every minute). Entries always stay on the phone too. Offline (no-cloud) mode never uploads.

### Earlier (Rev 69)
- Search box under "＋ New Entry" now searches by **name / village / mobile** in both ANC and HBNC.
- Village names match in English or Odia and can be combined with a name (e.g. `Sita Badmal`).
- HBNC also searches the WhatsApp number; search results show the village.

## Install as an app (PWA)
Open the live site once online. Android/Chrome: tap the **Install** bar (or menu → Install app). iPhone/Safari: Share → Add to Home Screen. After that it opens full-screen and works offline. Needs `manifest.webmanifest`, `sw.js` and the icon PNGs committed next to `index.html`; when you replace `index.html`, installed apps pick it up through the in-app update flow below.

## In-app update flow
1. **Update found** – the app checks for a new version when it opens, when you return to it, when the phone comes back online, and every 30 minutes. If one exists, a card appears at the top with a circular progress ring and a percentage, labelled *Downloading update…*.
2. **Update ready** – at 100% the card changes to *Update available* with **Update** and **Later** buttons. **Later** hides the card until the next check (the downloaded copy is kept, so it reappears instantly).
3. **Installing** – **Update** shows a spinning ring with *Installing update…*, then the app restarts on its own.
4. **After the restart** – *✔ Updated to the latest version* appears for a few seconds.

How it works: `sw.js` serves the cached app (cache `sammpurna-shell-v2`) and no longer swaps in a new `index.html` silently. The page compares the `ETag` (or `Last-Modified`) of `index.html` on GitHub Pages with the one it has cached, downloads the new file into a staging cache with real progress, and only replaces the running copy when **Update** is tapped. Saved offline entries are not touched (they live in the browser's own storage, not in the app cache). Checks need internet; offline the app just keeps running the installed version.
To release: replace `index.html` and commit as before – nothing else to change. Only bump `CACHE` in `sw.js` if you change `sw.js` itself in a way that needs a fresh shell.

## Update the dashboard
Replace `index.html` with the new revision and commit to `main`. GitHub Pages redeploys in ~1 minute.

## Note on offline entries
Offline entries are stored in the browser for the exact address the page is opened from. Export a CSV before switching between the downloaded file and the GitHub link.

## Do NOT commit
Raw Kobo/CSV/Excel exports or any beneficiary data (blocked by `.gitignore`).

## Language button on the login screen
A **ଓଡ଼ିଆ / English** button sits in the top-left corner of the login screen (the Online / Offline pill is top-right). It switches the login screen between English and Odia. The choice is saved in the same setting the New Entry forms use (`sampurna_oe_lang`), so the forms open in the language chosen at login (the form's own English / ଓଡ଼ିଆ / both selector still works and stays in sync).
