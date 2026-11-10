# SAMMPurNA – MNC Dashboards (ANC · HBNC/HBYC/PNC)

Single-file, offline-capable dashboard for Odisha NHM (Rev 93).

- Live site: https://nandiniprava1952-spec.github.io/SAMMPurNA/
- Works offline after first load; "＋ New Entry" saves on the device.
- Form language: English / ଓଡ଼ିଆ / both (selector in the form).
- Existing beneficiary search under "＋ New Entry" (ANC and HBNC): find earlier visits by name, village or mobile and pre-fill the form. Works offline.

## What's new in Rev 93
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
Open the live site once online. Android/Chrome: tap the **Install** bar (or menu → Install app). iPhone/Safari: Share → Add to Home Screen. After that it opens full-screen and works offline. Needs `manifest.webmanifest`, `sw.js` and the icon PNGs committed next to `index.html`; when you replace `index.html`, users see a "new version is ready — Reload" bar.

## Update the dashboard
Replace `index.html` with the new revision and commit to `main`. GitHub Pages redeploys in ~1 minute.

## Note on offline entries
Offline entries are stored in the browser for the exact address the page is opened from. Export a CSV before switching between the downloaded file and the GitHub link.

## Do NOT commit
Raw Kobo/CSV/Excel exports or any beneficiary data (blocked by `.gitignore`).
