# QA production và ảnh

- Parser xác minh 260 ID liên tục S001–S260, 260 prompt và 13 chương.
- Mỗi câu liên kết một ảnh I001–I260; timestamps null.
- Script và narration giữ nguyên lời nguồn; không tạo audio/video.
- Tiến độ ảnh thực nằm trong manifest.json và qa từng scene của storyboard.json.
- Không đánh dấu hoàn tất bộ ảnh khi chưa đủ 260 bitmap đã đọc và kiểm tra.

## Kiểm tra ảnh

- I001: 1672×941; Visual review: Mio, thin unlettered note, ox and silver coins visible; cel-shaded period market; no readable text; anatomy acceptable. Native 1672x941 is within 0.1% of 16:9; future composition uses 1920x1080.
- I002: 1672×941; Visual review: note-versus-silver exchange and unnumbered trust gauge visible; no readable text; historical clothing and anatomy acceptable.
- I003: 1672×941; Visual review: fading market, declining paper value metaphor and traders selecting silver are clear; no readable text; period robes and anatomy acceptable.
- I004: 1672×941; Visual review: covert woodblock workshop, imitation notes and suspicious merchant under lamplight; clear two-part editorial composition, no readable text, anatomy acceptable.
- I005: 1672×941; Visual review: torn and stained notes contrasted with durable metal coins; paper texture callouts and fictional guide cameo; no readable text, anatomy acceptable.
- I006: 1672×941; Visual review: guide reveals military drum, tax collection gate and woodblock workshop behind damaged paper; clear causal metaphor, no readable text.
- I007: 1672×941; Visual review: woodblock money output expands faster than silver mining; qualitative arrows without labels, coherent palette and period tools, anatomy acceptable.
- I008: 1672×941; Visual review: mining, furnace and coin casting chain; clear labor and material constraint, no readable text, natural figures and period equipment.
- I009: 1672×941; Visual review: state woodblock workshop with paper, ink, red abstract seals and supervising ruler; no readable lettering, period setting and anatomy acceptable.
- I010: 1672×941; Visual review: heavy coin carriers contrasted with confident paper-note trade and high trust gauge; qualitative contrast, no readable text, anatomy acceptable.
- I011: 1672×941; Visual review: empty treasury, military drum and officials looking toward period woodblock workshop; clear deficit-financing metaphor, no readable text, anatomy acceptable.
- I012: 1672×941; Visual review: palace military drum, troops and expanding woodblock workshop; no readable text, coherent period clothing and anatomy.
- I013: 1672×941; Visual review: tax gate sends a small coin stream while woodblock workshop releases much larger paper-note stream; qualitative amounts, no text, anatomy acceptable.
- I014: 1672×941; Visual review: shrinking paper-note purchasing power and larger note stacks for equal baskets of goods; unlettered qualitative diagram, guide cameo, no anatomy issues.
- I015: 1672×941; Visual review: continuous paper-cutout panorama from Song trade to Yuan court and Ming markets; one editorial scene with ample lower safe space, no lettering.
- I016: 1672×941; Visual review: thriving Song market, voluntary paper transaction and high qualitative trust gauge; period dress, no readable text, anatomy acceptable.
- I017: 1672×941; Visual review: bronze coins, silver ingots and gold pieces on balance scales in historical market; no readable text, clear commodity-money focus.
- I018: 1672×941; Visual review: merchant weighs coinage beside raw metal and furnace; no text, clear material-value illustration, natural figure anatomy.
- I019: 1672×941; Visual review: narrow mine and small labor-intensive minting output; qualitative production bottleneck, no lettering. Workshop is a stylized process metaphor rather than a documented reconstruction.
- I020: 1672×941; Visual review: mining, smelting and manual metalworking chain; qualitative labor-cost metaphor, no text. Minting details are generalized illustration, not a technical reconstruction.
- I021: 1672×941; Visual review: porters struggle with heavy coin strings and chests on a mountain route; period dress, natural figures, no readable text.
- I022: 1672×941; Visual review: enormous coin loads on merchant caravan contrasted with small unlettered paper bundle; no readable text, clear transport comparison.
- I023: 1672×941; Visual review: metal assets remain in a deposit storehouse while a merchant carries a sealed paper claim; no lettering, period setting and natural anatomy.
- I024: 1672×941; Visual review: two traders examine issuer seal and paper note with full metal reserve chest behind; no readable seal lettering, natural hands and period dress.
- I025: 1672×941; Visual review: consistent teal-haired guide and three distinct symbolic pillars under an unlettered note; redemption, tax acceptance and restrained issuance are shown qualitatively.
- I026: 1672×941; Visual review: paper-to-silver redemption at counter with healthy qualitative gauge; natural figures, no readable note text; tiny coin marks are decorative.
- I027: 1672×941; Visual review: citizen pays with paper note at official tax gate; clear acceptance gesture, no lettering on note or banners, period clothing and natural hands.
- I028: 1672×940; Visual review: confident merchants hold notes with guarded, locked issuance workshop behind; clear controlled-supply metaphor, no readable text.
- I029: 1672×941; Visual review: three intact supports carry an unlettered note above a thriving market; qualitative institutional-support metaphor, natural anatomy.
- I030: 1672×941; Visual review: note remains supported while one of three pillars cracks and trust gauge becomes unstable; clear metaphor, no text.
- I031: 1672×941; Visual review: expanding woodblock issuance, official refusing paper and low trust gauge; economic-risk metaphor without numerical claims, no readable text.
- I032: 1672×941; Visual review: guide peels paper surface to reveal institutions, reserves, fiscal flows and public acceptance; one paper-cutout editorial scene, no readable text.
- I033: 1672×941; Visual review: central note connects households, merchants, army, tax office and treasury through qualitative threads; no readable labels, natural figure anatomy.
- I034: 1672×941; Visual review: Song-style trade network in mountainous river region contrasts paper exchange with heavy iron-coin transport; no border map or readable text.
- I035: 1672×941; Visual review: mountainous Song-era market with cumbersome dark iron coins and strained traders; natural figures, no readable labels.
- I036: 1672×941; Visual review: large dark iron coins contrasted with smaller bronze coins at a merchant table; qualitative weight comparison, no readable text.
- I037: 1672×941; Visual review: porters carry heavy iron-coin strings uphill while merchants look exhausted; period clothing, natural anatomy, no readable text.
- I039: 1672×941; Visual review: private merchant counter issues unlettered paper claims to a trusted traveler; period market, natural hands and faces.
- I040: 1672×941; Visual review: customer deposits metal coins and receives receipt-like note at private counter; no readable text, natural anatomy.
- I041: 1672×941; Visual review: locked coin storehouse remains on the left while paper moves across market stalls; clear deposit-versus-circulation metaphor, no readable text.
- I042: 1672×941; Visual review: same note passes along a trade chain under a high qualitative trust gauge; no readable labels or note text, natural anatomy.
- I043: 1672×941; Visual review: swift paper courier versus laborious metal transport; split editorial comparison, no readable text, natural figure anatomy.
- I044: 1672×941; Visual review: deposits flow into reserve chest on one side and paper claims circulate on the other; qualitative issuer structure, no readable text.
- I038: 1672×941; Visual review: corrected simple ceramic open oil lamp; original faces, hands, robes, paper slip and reserve chest preserved; no readable note text; source version retained.
- I045: 1672×941; Small reserve chest contrasted with oversized paper claims; qualitative metaphor, clear historical counter.
- I046: 1672×941; Calm redemption counter and limited customers; reserve motif and period clothing consistent.
- I047: 1672×941; Crowd rush and falling trust gauge clearly show a run; gauge has no numerical claim.
- I048: 1672×941; Queue, reserve depletion and period lantern reviewed; infographic flows remain qualitative.
- I049: 1672×941; Closed private counters and distressed holders; stylized storefronts, no readable signage.
- I050: 1672×941; Mio contrasts intact paper with an empty reserve chest; fictional guide and historical objects kept distinct.
- I051: 1672×941; Tilted balance contrasts oversized paper claims with small reserves; decorative ledger marks carry no measured data.

## Kiểm tra bàn giao phần ảnh

51 scene assets có PNG hợp lệ, checksum trùng bản ghi, không trùng file nội dung; tất cả đã xem trực quan. Liên kết file của storyboard, sentences và prompts đã đồng bộ, bao gồm I038 bản sửa. 209 ảnh chưa sinh; I052 bị chặn bởi hạn mức ImageGen. Không checkpoint bước images là hoàn tất. Không tạo audio/video.
- I052: 1672×941; Officials inspecting private paper issuers, with disorder in the market behind them; period buildings and robes coherent, ornamental marks not used as factual labels.
- I053: 1672×941; State takeover shown by a connected flow from private reserves to an official woodblock-printing office; ornamental paper patterns carry no date or denomination.
- I054: 1672×941; Mio and before-after governance contrast reviewed; damaged storefronts are a visual metaphor, not a claim of literal destruction.
- I055: 1672×941; A fork and torn paper illustrate a hypothetical failure path; architecture and period figures coherent, no factual labels in image.
- I056: 1672×941; Market recovery and paper exchange clearly framed, woodblock workshop and clothing consistent; no modern machines or readable labels.
- I057: 1672×941; State-issued paper exchange and active river market reviewed; floating note is a qualitative editorial motif, not an authentic note reproduction.
- I058: 1672×941; Mio, paper-versus-governance balance and officials reviewed; gauge and scale are qualitative metaphors without numeric labels.
- I060: 1672×941; Heavy iron-coin loads contrasted with convenient paper exchange; exaggerated load illustrates burden, no literal weight claim.
- I061: 1672×941; Voluntary market exchange and carrying-cost contrast reviewed; natural foreground hands, coherent historical clothing.
- I062: 1672×941; Paper-versus-iron carrying burden shown by scales and porters; qualitative comparison, no exact weight or denomination.
- I063: 1672×941; Fiscal circulation linked by arrows among officials, purchases, soldier payments and markets; conceptual flow, not a literal simultaneous event.
- I064: 1672×941; Treasury, taxpayer queue and market exchange reviewed; graphical flow communicates fiscal demand, not a quantified chart.

- I059 first version rejected: European-style screw presses; targeted edit replaces them with hand-rubbed woodblock tables. Additional period constraints added to remaining Chinese-history prompts.
- I059: 1672×941; Revision reviewed: all central screw presses replaced by flat woodblock worktables and hand rubbing; Mio and infographic layout preserved. No machinery remains.
- I065: 1672×941; Hand-rubbed woodblock printing and outward/return monetary flows reviewed; no European press, no quantitative labels.
- I066: 1672×941; Real-economy circulation contrasted with excessive paper issuance; hand printing and paper lanterns fit period, flows are conceptual.
- I067: 1672×941; Old and new patterned series contrasted at official exchange counter; flat woodblocks, simple oil bowls and period robes reviewed.
- I068: 1672×941; Returned worn notes exchanged for fresh unlettered notes; hand-rubbing workshop visible, no mechanical press.
- I069: 1672×941; Damaged notes removed from circulation, fresh notes issued; destruction shown illustratively, not a claim of a specific documented ceremony.
- I070: 1672×941; Obsolete counterfeit block contrasted with a different new note pattern; an illustrative security mechanism, not an authentic recovered block.
- I072: 1672×941; Official supervises manual woodblock issuance; gauge shows qualitative discipline, not measured inflation or a historical instrument.

- I071 initial version rejected: Readable numerals on modern notes; replace with unlettered ornamental currency.
- I071: 1672×941; Revision reviewed: modern notes now use generic ornamental patterns with blank centers; readable numerals and portrait removed. Explicit historical-modern comparison, guide and layout preserved.
- I073: 1672×941; Manual printing and rising paper supply compared with unchanged goods baskets; columns are qualitative and have no numeric axis.
- I074: 1672×941; Huizi confidence depicted by calm exchange and a qualitative gauge; woodblock rubbing, paper lamps and river setting reviewed.
- I075: 1672×941; Stable paper system linked with goods and treasury by a balanced-scale metaphor; no denomination or exact historical diagram.
- I076: 1672×941; War pressure shown by an oversized symbolic drum and approaching cavalry; giant drum is editorial metaphor, no graphic injury.
- I077: 1672×941; Officials under military-budget pressure beside hand-printing workshop; papers contain only decorative ledger marks, scene is illustrative.
- I078: 1672×941; War, reserve depletion, issuance and confidence linked in a conceptual chain; no numeric claims or mechanical printing.
- I079: 1672×941; Stable huizi circulation shown by confident exchange and qualitative green gauge; hand printing and period setting reviewed.
- I080: 1672×941; Payment and savings depicted through market exchange and bundled paper holdings; manual woodblocks, river trade and foreground anatomy coherent.

- Delivery audit 2026-10-04T10:08:14.475Z: 80 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 180 scenes remaining.
- I081: 1672×941; Medieval military pressure contrasted with fiscal accounting; giant drum is editorial metaphor, no specific battle or measured costs claimed.
- I082: 1672×941; Song logistics facing Jin pressure reviewed; scroll is an illustrative landscape plan, not a verified territorial map. Medieval attire and supply carts coherent.
- I083: 1672×941; Mongol cavalry pressure linked to Song reserves and logistical routes; generalized invasion illustration, no specific siege location or border claim.
- I084: 1672×941; Food stores, spears, carts, horses and payments combine war-cost categories; reserves are symbolic, not exact recorded wealth.
- I085: 1672×941; Tax burden depicted through strained porters and officials; symbolic severity, no numerical tax rate or legible institutional label.
- I086: 1672×941; Officials negotiate with reluctant lenders, with decreasing coin piles; qualitative credit constraint and illustrative landscape scroll.
- I087: 1672×941; Hand-rubbed printing accelerates under war pressure; no mechanical press, papers unlettered, medieval military backdrop coherent.
- I088: 1672×941; Oversized paper supply flows to market and military payments; manual printing and period costumes reviewed, quantity is metaphorical.

- Delivery audit 2026-10-04T10:20:45.902Z: 88 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 172 scenes remaining.
- I089: 1672×941; War spending, hand printing and weakening confidence connected by arrows; gauge is qualitative, no institutional label or numeric claim.
- I090: 1672×941; Paper remains in market use alongside stylized metal value stores; metal icons are illustrative, not an authentic coin-type reconstruction.
- I091: 1672×941; Paper-based bargaining continues under doubt; foreground anatomy, goods baskets and manual printing reviewed.
- I092: 1672×941; Paper prominence compared with a smaller copper-coin grouping; no exact circulation share claimed, ornate coin marks not used as factual labels.
- I093: 1672×941; Ongoing payment flows contrasted with lower qualitative confidence gauge; currency is intact, no numbered axis or denomination.
- I094: 1672×941; Common payment medium used across multiple market transactions; foreground hands and coherent robes reviewed, no readable note labels.
- I095: 1672×941; Fading paper and falling gauge metaphorically show weakening trust; visual dissolving is symbolic, not literal material deterioration.
- I096: 1672×941; Same rice sack compared with increasing paper stacks; qualitative purchasing-power example, not an exact historical rice price.

- Delivery audit 2026-10-04T10:32:26.028Z: 96 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 164 scenes remaining.
- I097: 1672×941; Paper holdings exchanged for silver, food and textiles; generalized value-store motifs, no authentic coin-type or exact exchange ratio claim.
- I098: 1672×941; Merchants learn issuance expectations through gossip and a conceptual branching network; hand woodblock process and period setting reviewed.
- I099: 1672×941; Thought-cloud links military pressure to further issuance; depicts public expectations, not a precise historical conversation or event.
- I100: 1672×940; Rapid spending under declining confidence shown by market crowd and gauge; qualitative gauge, manual printing and note handling reviewed.
- I101: 1672×941; Mio separates money supply from confidence response with opposing flows; guide anatomy coherent, unlettered bills and no quantitative axis.
- I102: 1672×941; Rapid exchange from paper into goods and metal linked by arrows; conceptual money-use velocity, no measured speed or exchange rate.

- I103 initial version rejected: Unverified AI geography and implied territorial extent; replace map with abstract unlabeled institutional or trade nodes.

- I104 initial version rejected: Unverified AI geography and implied territorial extent; replace map with abstract unlabeled institutional or trade nodes.
- I103: 1672×941; Revision reviewed: all geographic silhouettes and territorial routes removed; abstract Chinese market and administrative nodes replace foreign-location vignettes. No territorial or foreign-currency-adoption claim. Manual printing preserved.
- I104: 1672×941; Revision reviewed: geographic map and territorial extent removed, replaced by abstract central issuance and market nodes; ruler, hand printing and port preserved. Does not imply conquest of all China in 1260.

- Delivery audit 2026-10-04T10:52:27.125Z: 104 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 156 scenes remaining.
- I105: 1672×940; Metal-currency restriction and official paper emphasis reviewed; shutter is a stylized wooden closure, manual printing shown and no readable denomination.
- I106: 1672×941; Paper connects tax office, market exchange and military payments in a conceptual collage; period figures and foreground hands reviewed.
- I107: 1672×941; Mio compares Yuan issuance with abstract modern institutions; generic unlettered modern note, no national currency, historical-modern separation explicit.
- I109: 1672×941; Two distinct paths contrast paper payments with weighed silver accounting; scale and silver are conceptual, decorative banner emblems are not factual labels.
- I110: 1672×941; Stable generalized Yuan market and manual issuance reviewed; no territorial map, currency patterns ornamental and foreground anatomy coherent.
- I112: 1672×941; Mio indicates continuing circulation through trade over time; no exact year labels or map, caravan and market motifs conceptually connect the story.

- I108 initial version rejected: Unrequested unverified geographic map in background; replace with an ornamental screen.

- I111 initial version rejected: Paper-stack jump exaggerates a scene about moderate inflation; replace with gentle qualitative change.

- Remaining prompts amended to use conceptual networks instead of AI geography; flags and banknotes remain purely ornamental and unlettered. Original source prompts preserved in sourcePrompt.
- I108: 1672×941; Revision reviewed: wall geography removed; blank floral screen, decorative caravan silhouettes, manual woodblock printing and exchange preserved.
- I111: 1672×941; Revision reviewed: four similarly low paper stacks and stable goods baskets show gentle qualitative inflation; steep arrow and tower removed, no exact numerical data.

- Delivery audit 2026-10-04T11:20:46.317Z: 112 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 148 scenes remaining.
- I113: 1672×941; Reviewed: treasury outflows to military, administrators and manual printers illustrate accumulating fiscal pressure; ornamental blank notes, no geographic map.
- I114: 1672×941; Reviewed: split war drum and rival armed camps illustrate civil-war expenditure as an editorial metaphor; no territorial borders or quantitative claim.
- I115: 1672×941; Reviewed: large blank-note stacks contrast with small tax inflows; manual woodblock tables, Yuan-period architecture, no mechanical printing or numbers.
- I116: 1672×941; Reviewed: military icons connect to growing blank-note stacks; qualitative relationship rather than invented regression data, manual printing coherent.
- I117: 1672×941; Reviewed: dominant war drum contrasts with smaller flood and drought vignettes; qualitative comparative metaphor, no numerical disaster attribution.
- I118: 1672×941; Reviewed: Mio teal bob, round glasses and mustard jacket coherent; chain connects war, treasury outflows, manual printing and rising prices without numbers.
- I119: 1672×941; Reviewed: silver ingots and intact chain anchor a blank ornamental note; stylized coins are illustrative, no authentic monetary artifact claim.
- I120: 1672×941; Reviewed: broken chain and silver anchor contrast with expanding blank-note stacks; manual printing and Yuan setting maintained, no numerical claim.

- Delivery audit 2026-10-04T11:33:12.657Z: 120 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 140 scenes remaining.
- I121: 1672×941; Reviewed: floating blank ornamental note separated from shadowed silver, legal decree and market exchange illustrate fiat circulation; manual printing, no exact data.
- I122: 1672×941; Reviewed: four identical goods baskets against steeply increasing paper stacks illustrate late-period inflation qualitatively; no invented prices or axes.
- I123: 1672×941; Reviewed: central court visually diminished among regional armed leaders; divided authority depicted through vignettes without geography or borders.
- I124: 1672×941; Reviewed: declining color gauge, manual printing and distressed market illustrate danger of eroding authority and excessive issuance; no numerical readings.
- I125: 1672×941; Reviewed: three icon supports depict tax collection, state authority and controlled issuance supporting a blank note; coherent hand woodblock workshop.
- I126: 1672×941; Reviewed: blank decree curls away while traders choose silver; stylized coins and bullion illustrative, no authentic artifact claim.
- I127: 1672×941; Reviewed: traders weigh silver ingots and set ornamental paper notes aside; historical market coherent, no geographic or numeric claims.
- I128: 1672×941; Reviewed: sequential acceptance and refusal gestures with check/cross icons illustrate quiet loss of acceptance; blank notes, qualitative editorial sequence.

- Delivery audit 2026-10-04T11:42:32.168Z: 128 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 132 scenes remaining.
- I129: 1672×941; Reviewed: merchant offers scale with silver against offered blank paper note; trade metaphor, no geographic map or numeric claims.
- I130: 1672×941; Reviewed: abstract broken paper network and spreading bullion connections depict substitution; no land outlines or territorial positioning.
- I131: 1672×941; Reviewed: Mio character consistent beside enlarged ornamental vertical note; explicitly stylized illustration, not a reproduction of Da Ming Baochao.
- I132: 1672×941; Reviewed: fading blue banners and new red court imply dynastic change without an exact palace or artifact reconstruction claim; hand woodblock printing.
- I133: 1672×941; Reviewed: founding emperor figure, agrarian registers and goods illustrate early Ming economic reorganization; fictionalized portrait, no readable data.
- I134: 1672×941; Reviewed: restrictive official gesture contrasts merchant port with agricultural vignettes; no exact regulation text or geographic boundaries.
- I135: 1672×941; Reviewed: grain, textile and labor icons flow to state warehouses; coherent tax-in-kind metaphor without invented figures.
- I136: 1672×941; Reviewed: officials present a standardized large ornamental vertical note to traders; manual woodblock workshop, no denomination or legible writing.

- Delivery audit 2026-10-04T11:54:59.145Z: 136 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 124 scenes remaining.
- I137: 1672×941; Reviewed: fresh vertical ornamental note lifted from manual woodblock table in Ming workshop; blank central field, no readable denomination.
- I138: 1672×941; Reviewed: consistent Mio beside oversized note; deliberate size exaggeration from supplied prompt, not a literal 34 by 22 centimetre scale reconstruction.
- I139: 1672×941; Reviewed: bark, soaking fibers, pulp screen and drying sheets illustrate hand papermaking before woodblock printing; no mechanical press or exact process claim.
- I140: 1672×941; Reviewed: intact ornamental note versus torn plain paper illustrates material durability concept, not controlled laboratory comparison or an authentic artifact.
- I141: 1672×941; Reviewed: vertical note shows stylized coin-string motifs; no readable characters or denominational number, hand woodblock workshop.
- I142: 1672×941; Reviewed: coin-string motif linked to physical bronze coins by explanatory arrow; Mio consistent, qualitative representation not a guaranteed redemption claim.
- I144: 1672×941; Reviewed: officials and guards seize counterfeit woodblocks; protected ornamental note contrasted with torn counterfeit papers, no graphic injury or legal quotation.

- I143 initial version rejected: Generated rectangular seal contains pseudo-characters that may be mistaken for authentic official wording; replace with abstract geometric red seal.
- I143: 1672×941; Revision reviewed: red rectangular seal simplified to abstract interlocking grid; no quoted official wording, grey fibrous paper and decorative seals retained, illustrative rather than facsimile.

- Delivery audit 2026-10-04T12:07:17.690Z: 144 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 116 scenes remaining.
- I145: 1672×941; Reviewed: official rewards reporting citizen with silver while guards seize suspected counterfeiter; symbolic scene, no exact reward amount or legal wording.
- I146: 1672×941; Reviewed: fibers, decorative seals and manual woodblocks surround note as security features; illustrative design, no authentic seal script claimed.
- I147: 1672×941; Reviewed: unchanged ornamental note versus distressed market and declining gauge illustrates depreciation; consistent Mio, no numerical value.
- I148: 1672×941; Reviewed: crowded hand woodblock workshop and abundant note stacks depict early overissuance; no modern printing apparatus or numeric claim.
- I149: 1672×941; Reviewed: split comparison uses balanced circulation loop versus one-way expanding issuance; qualitative historical contrast without fabricated data.
- I150: 1672×941; Reviewed: expanding workshop notes contrast with narrow distant tax gateway collecting goods; no effective return flow shown, no quantitative claim.
- I151: 1672×941; Reviewed: empty drawers, chests and shelving at redemption counter with refused note holders clearly convey unavailable reserves; no exact institutional reconstruction.
- I152: 1672×941; Reviewed: official refusal gesture to note holder and direction toward grain delivery depict limited acceptance for tax; coherent tax-in-kind scene.

- Delivery audit 2026-10-04T12:16:28.336Z: 152 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 108 scenes remaining.
- I153: 1672×940; Reviewed: cracked tax-support pillar and declining gauge are editorial metaphors for weakened fiat support; no quantitative readings.
- I154: 1672×941; Reviewed: puzzled merchants face official refusing offered note beside issuance workshop; coherent blank ornamental note and period clothing.
- I155: 1672×941; Reviewed: citizen caught between refusing official and trader asking for silver; blank note, no geographic or exact monetary claims.
- I156: 1672×941; Reviewed: exaggerated paper towers and blocked trade pathways illustrate continued expansion and congestion; deliberate metaphor, manual workshop.
- I157: 1672×941; Reviewed: same goods baskets contrast with increasingly large note piles; qualitative purchasing-power loss, no fabricated prices.
- I158: 1672×941; Reviewed: oversized note shrinks symbolically beside stable silver and goods; illustration does not purport to encode the exact 98.8 percent estimate.
- I159: 1672×941; Reviewed: family watches decreasing goods and shrinking value symbols across an abstract generational sequence; no fabricated years.
- I160: 1672×941; Reviewed: merchant refuses ornamental note while using silver scale for trade; no exact private-market share or authentic artifact claim.

- Delivery audit 2026-10-04T12:29:59.189Z: 160 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 100 scenes remaining.
- I161: 1672×941; Reviewed: official paper distribution contrasted with nearby silver trade; blank ornamental notes, period clothing and manual woodblock workshop.
- I162: 1672×941; Reviewed: divided scene contrasts state-driven paper use with private refusal; no exact legal mandate quotation or numerical claim.
- I163: 1672×941; Reviewed: confident acceptance and green gauge illustrate voluntary trust; generic currency, no exact historical trust measurement.
- I164: 1672×941; Reviewed: silver bullion at merchant counter while paper fades in background; coherent substitution metaphor, blank ornamental notes.
- I165: 1672×941; Reviewed: silver scales dominate market and abstract trade nodes; no coastline, political map or territorial claims.
- I166: 1672×941; Reviewed: sequence moves in-kind goods and paper toward silver tax collection; qualitative administrative adaptation, no false quantitative timeline.
- I167: 1672×941; Reviewed: Mio with consistent teal hair, glasses and mustard jacket compares printing, tax gate and silver; abstract explanatory arrangement.

- I168 initial version rejected: European eighteenth-century tricorn hat and coat appear in an early Ming scene; replace with coherent Chinese merchant clothing.
- I168: 1672×941; Revision reviewed: European tricorn, curls and coat removed; merchants now have black topknots or cloth caps and Chinese cross-collar robes, blank notes and hand carving preserved.

- Delivery audit 2026-10-04T12:50:41.959Z: 168 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 92 scenes remaining.

- I174 prompt corrected before generation: colonial American printer uses period hand-operated screw press; medieval Chinese hand-rubbing constraint removed for this scene.
- I169: 1672×941; Reviewed: cost comparison juxtaposes Chinese paper rubbing and generic European metal workshop across cultures; conceptual production-cost comparison, not one-site reenactment.
- I170: 1672×941; Reviewed: cross-period Chinese woodblock and European hand press with growing paper stacks and dotted absent silver reserve; no quantities or geographic claim.
- I171: 1672×941; Reviewed: cross-period security comparison shows fibers, red ornament, controlled blocks and layered motifs; no authentic anti-counterfeit artifact or seal reproduction.
- I174: 1672×941; Reviewed: colonial American waistcoats and linen shirts, hand-operated wooden screw press and detailed leaf impressions; illustrative patterns, not exact Franklin equipment reconstruction.
- I175: 1672×941; Reviewed: abstract chronology moves from Chinese hand woodblocks toward European press and intricate designs; no measured innovation timeline or modern machines.
- I176: 1672×941; Reviewed: consistent Mio separates official and clandestine issuance streams using different colors and workshops; worn appearance is stylistic, not a diagnostic criterion for counterfeit notes.

- I172 initial version rejected: European printer, screw press and heraldic banner appear in a specifically Chinese Song or Ming scene; replace with Chinese manual woodblock workshop.

- I173 initial version rejected: European printer, screw press and heraldic banner appear in a specifically Chinese Song or Ming scene; replace with Chinese manual woodblock workshop.
- I172: 1672×941; Revision reviewed: European screw press, clothing and architecture replaced with Chinese cross-collar artisans, square lattice windows and hand-rubbed flat woodblock tables; historical context and note design transition preserved.
- I173: 1672×941; Revision reviewed: European screw press, clothing and architecture replaced with Chinese cross-collar artisans, square lattice windows and hand-rubbed flat woodblock tables; historical context and note design transition preserved.

- Delivery audit 2026-10-04T13:17:55.852Z: 176 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 84 scenes remaining.
- I177: 1672×941; Reviewed: hidden manual woodblock workshop feeds suspicious-note exchange at night; generic counterfeit illustration with blank panels.
- I178: 1672×941; Reviewed: open official workshop releases abundant notes with abstract red seals; manual woodblocks, coherent Chinese setting, no exact seal wording.
- I179: 1672×941; Reviewed: cross-period streams of ornamental notes converge on one limited goods pile; conceptual economic comparison, no numerical or geographic claim.
- I180: 1672×941; Reviewed: small clandestine workshop contrasts with huge official hand-printing operation and war drum; deliberate comparative metaphor, no exact issuance ratio.

- ImageGen quota blocker at I181 observed 2026-10-04T13:23:05.768Z. Exact HTTP 429 preserved in image_generation_error-I181.json. Reset reported 2026-10-05T09:27:13.000Z / 2026-10-05 16:27:13 Asia/Ho_Chi_Minh. No further generation attempted after this error.

- Delivery audit 2026-10-04T13:26:54.333Z: 180 selected images; PNG headers, aspect ratios, unique checksums and recorded file hashes valid; 80 scenes remaining.
