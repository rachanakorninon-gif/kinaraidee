# Campaign 3,000 Premium — support & incident copy pack

Status: **DRAFT / PRE-LAUNCH**

These are operational templates only. Replace bracketed fields after the real provider, rules, dates, tax treatment, support route and campaign status are approved. Do not use any template to imply that PRE-LAUNCH research or ordinary signup creates a prize entry.

## Copy rules

- Never confirm payment from a screenshot alone.
- Never manually promise campaign eligibility before backend/provider reconciliation.
- Never disclose payment secrets, internal IDs or another participant's information.
- Never announce a provisional winner as final.
- If campaign status is uncertain, use fail-closed wording and escalate.

---

## A. PRE-LAUNCH public reply

> ขณะนี้แคมเปญยังอยู่ในช่วงเตรียมความพร้อม (PRE-LAUNCH) และยัง **ไม่เปิดรับสิทธิ์ลุ้นรางวัล** ครับ การสมัครบัญชี การใช้งานแอป หรือการทดลองหน้า Premium ตอนนี้ยังไม่ถือเป็นสิทธิ์เข้าร่วมแคมเปญ เมื่อเงื่อนไข ระบบชำระเงิน และข้อกำหนดที่เกี่ยวข้องพร้อมครบ เราจะประกาศสถานะและกติกาฉบับเต็มอย่างชัดเจนอีกครั้ง

## B. “สมัครแอปแล้ว ได้สิทธิ์หรือยัง?”

> ตอนนี้ยังไม่ได้สิทธิ์จากการสมัครแอปเพียงอย่างเดียวครับ สิทธิ์แคมเปญจะพิจารณาจากเงื่อนไขฉบับจริงและสถานะ Premium ที่ระบบ backend ตรวจสอบได้ หลังจากแคมเปญเปิด LIVE อย่างเป็นทางการเท่านั้น

## C. “ทดลอง Premium Research Preview แล้ว ได้สิทธิ์ไหม?”

> ไม่ได้ครับ หน้า Premium Research Preview ใช้เพื่อทดสอบแนวคิดและราคาเท่านั้น ไม่มีการรับชำระเงินและไม่สร้างสิทธิ์ลุ้นรางวัล

## D. Payment appears pending / Premium not active

> เราจะตรวจจากสถานะการชำระเงินและ subscription ที่ระบบ backend ได้รับจากผู้ให้บริการโดยตรงครับ ภาพหน้าจอหรือข้อความจากฝั่งเบราว์เซอร์เพียงอย่างเดียวยังใช้ยืนยัน Premium ไม่ได้ กรุณาส่ง [ข้อมูลอ้างอิงที่อนุญาตตามนโยบายจริง] ผ่าน [ช่องทาง Support] โดย **อย่าส่งรหัสผ่าน, OTP, เลขบัตรเต็ม หรือข้อมูลลับทางการเงิน**

Internal action:

1. verify backend payment/subscription reference
2. verify webhook/reconciliation state
3. verify entitlement state
4. verify campaign state/cutoff/rules
5. reply from backend truth only

## E. Payment succeeded but campaign eligibility not shown

> สถานะ Premium และสถานะแคมเปญเป็นคนละขั้นตอนกันครับ เราจะตรวจ 1) สถานะ Premium จาก backend และผู้ให้บริการชำระเงินจริง และ 2) เงื่อนไขแคมเปญตามกติกาและช่วงเวลาที่กำหนด หากพบว่าระบบยังประมวลผลไม่ครบ เราจะดำเนินการ reconciliation โดยไม่เพิ่มสิทธิ์ด้วยมือจากภาพหน้าจอครับ

## F. Duplicate subscriptions/accounts

> ระบบแคมเปญต้องยึดตามกติกาเรื่องผู้เข้าร่วม/สิทธิ์ที่ประกาศอย่างเป็นทางการครับ การมี subscription หรือบัญชีซ้ำจะไม่ถูกตีความให้ได้สิทธิ์เพิ่มโดยอัตโนมัติ เราจะตรวจจากข้อมูล backend และกติกาฉบับที่มีผลจริง

## G. Cancellation question

> ผลของการยกเลิก Premium ต่อสิทธิ์แคมเปญจะเป็นไปตามกติกาฉบับจริงและสถานะ subscription ที่ผู้ให้บริการยืนยันครับ ก่อนเปิดแคมเปญ LIVE เราจะระบุเงื่อนไขการยกเลิกและ cutoff ให้ชัดเจน

## H. Refund question

> การคืนเงินอาจมีผลต่อสถานะ Premium และสิทธิ์แคมเปญตามกติกาที่ประกาศครับ ทีมงานจะยึดสถานะ backend/ผู้ให้บริการและเงื่อนไขที่มีผลจริง ไม่ใช้ภาพหน้าจอหรือการแก้ยอดด้วยมือเป็นหลักฐานสิทธิ์

## I. Dispute / chargeback question

> สถานะ dispute/chargeback จะถูกตรวจจากผู้ให้บริการชำระเงินและกติกาแคมเปญที่มีผลจริงครับ หากสถานะยังอยู่ระหว่างตรวจสอบ เราจะไม่ยืนยันสิทธิ์ล่วงหน้าจนกว่าข้อมูล backend จะชัดเจน

## J. Campaign temporarily PAUSED — public notice

> **แจ้งสถานะแคมเปญ: หยุดรับสิทธิ์ใหม่ชั่วคราว**
>
> ขณะนี้เราได้พักการรับสิทธิ์ใหม่ชั่วคราวเพื่อทบทวนความถูกต้องของ [ระบบ/ข้อมูลที่ได้รับผลกระทบแบบไม่เปิดเผยข้อมูลอ่อนไหว] ระหว่างนี้ `entries_open` ถูกปิดไว้เพื่อรักษาความถูกต้องและความเป็นธรรม เราจะแจ้งสถานะที่ยืนยันแล้วผ่านช่องทางทางการอีกครั้ง

Do not state an ETA unless an approved operational owner has provided one.

## K. Campaign resumed after incident

> **อัปเดตสถานะแคมเปญ**
>
> การตรวจสอบ [ประเด็นโดยสรุป] เสร็จสิ้นแล้ว และระบบกลับมาเปิดรับสิทธิ์ใหม่ตามเงื่อนไข/ช่วงเวลาที่ประกาศอย่างเป็นทางการ การกลับมาเปิดดำเนินการครั้งนี้ผ่านการตรวจสอบสถานะ backend และบันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว

Only use after audited PAUSED -> LIVE approval.

## L. Campaign CLOSED — awaiting selection

> แคมเปญปิดรับสิทธิ์ตามกำหนดแล้วครับ ขณะนี้ไม่มีการรับสิทธิ์ใหม่ และทีมงานกำลังดำเนินการตรวจสอบ/freeze รายชื่อผู้มีสิทธิ์ตามกติกาและขั้นตอนที่ได้รับอนุมัติ ผลจะประกาศตามช่องทางและช่วงเวลาที่ระบุในกติกาฉบับเต็ม

## M. “จำนวนผู้มีสิทธิ์ทำไมเปลี่ยน?”

> จำนวนที่แสดงต้องมาจากระบบ backend ที่ตรวจสอบสิทธิ์แบบ unique user ตามกติกาที่มีผลจริงครับ การเปลี่ยนแปลงอาจเกิดจาก reconciliation หรือสถานะที่กติกากำหนด เช่น การคืนเงิน/ยกเลิก/ตัดสิทธิ์ที่ได้รับการยืนยัน หากพบความคลาดเคลื่อนที่อาจกระทบความเป็นธรรม ทีมงานจะพักการรับสิทธิ์ใหม่และตรวจสอบก่อนครับ

## N. Eligibility dispute intake

> เพื่อให้ตรวจสอบได้ถูกต้อง กรุณาส่ง [ข้อมูลอ้างอิงที่อนุญาต: เช่น อีเมลบัญชี/เลขอ้างอิงคำสั่งซื้อบางส่วนตามนโยบายจริง] ผ่าน [ช่องทาง Support] โดยไม่ส่งรหัสผ่าน OTP หรือข้อมูลบัตรเต็ม ทีมงานจะตรวจจาก backend/provider และตอบผลตามกติกาที่มีผลจริงครับ

Internal record fields:

- case ID
- received timestamp
- user/account reference (minimum necessary)
- provider/subscription reference (restricted)
- backend entitlement state
- campaign state/cutoff
- reconciliation result
- decision + rule/reason code
- reviewer
- resolution timestamp

## O. Security/privacy incident — public holding statement

> เรากำลังตรวจสอบเหตุการณ์ที่อาจกระทบ [บริการ/ข้อมูลตามที่ได้รับอนุมัติให้สื่อสาร] และได้ใช้มาตรการป้องกันที่เหมาะสม รวมถึงการพักส่วนของแคมเปญที่อาจได้รับผลกระทบไว้ก่อน เราจะสื่อสารข้อมูลที่ยืนยันแล้วและแนวทางสำหรับผู้ใช้ผ่านช่องทางทางการ

Do not speculate about breach scope, affected users or root cause before verification and approved incident communication.

## P. Prize availability issue

> ขณะนี้แคมเปญถูกพักไว้ชั่วคราวเพื่อทบทวนความพร้อมด้านรางวัลและเงื่อนไขที่เกี่ยวข้อง เราจะไม่เปิดรับสิทธิ์ใหม่จนกว่าสถานะจะได้รับการยืนยันและสอดคล้องกับกติกาที่มีผลจริง

Do not substitute a prize silently unless final rules/legal approval allow it.

## Q. Provisional winner contact — first message

Status: **TEMPLATE ONLY — do not use before a lawful selection has occurred.**

> สวัสดีครับ ติดต่อจากโครงการ “กินอะไรดี” เกี่ยวกับผลแคมเปญ [ชื่อแคมเปญ] บัญชีของคุณถูกเลือกเป็น **ผู้ได้รับการคัดเลือกเบื้องต้น (provisional)** และยังต้องตรวจสอบคุณสมบัติตามกติกาก่อนยืนยันผลสุดท้าย
>
> กรุณาติดต่อกลับผ่าน [ช่องทางทางการ] ภายใน [deadline] เพื่อดำเนินการตรวจสอบตามขั้นตอน เราจะ **ไม่ขอรหัสผ่าน, OTP หรือข้อมูลบัตรเต็ม** ทางข้อความนี้

Do not mention “winner confirmed” at this stage.

## R. Provisional winner confirmed — private message

Status: **TEMPLATE ONLY**

> การตรวจสอบคุณสมบัติตามกติกาเสร็จสิ้นแล้วครับ และคุณได้รับการยืนยันเป็นผู้ได้รับรางวัลของแคมเปญ [ชื่อแคมเปญ] ขั้นตอนถัดไปคือ [ภาษี/เอกสาร/การส่งมอบตามกติกาที่อนุมัติ] ผ่าน [ช่องทางทางการ]

Only use after eligibility + legal/tax validation is complete.

## S. Provisional candidate invalid / alternate process

> จากการตรวจสอบตามกติกาที่ประกาศ พบว่าไม่สามารถยืนยันคุณสมบัติของการคัดเลือกครั้งนี้ได้เนื่องจาก [เหตุผลตาม rule/reason code ที่สามารถเปิดเผยได้] กระบวนการถัดไปจะดำเนินตามเงื่อนไขเรื่องผู้สำรอง/การคัดเลือกใหม่ที่ระบุไว้ในกติกาฉบับเต็ม

No silent reselection and no discretionary wording outside final rules.

## T. Winner announcement — public shell

Status: **TEMPLATE ONLY**

> 🎉 ประกาศผลแคมเปญ [ชื่อแคมเปญ]
>
> ผู้ได้รับรางวัลที่ผ่านการตรวจสอบคุณสมบัติตามกติกาเรียบร้อยแล้ว: **[ข้อมูลสาธารณะที่ได้รับอนุมัติให้เผยแพร่เท่านั้น]**
>
> การคัดเลือกดำเนินการตาม [วิธี/ขั้นตอนสรุปที่ legal อนุมัติให้สื่อสาร] จากกลุ่มผู้มีสิทธิ์ที่ถูก freeze ตาม cutoff ของแคมเปญ
>
> ขอบคุณทุกคนที่ร่วมใช้งาน “กินอะไรดี” ครับ

Do not expose full identity/contact data unless specifically approved/required.

## U. “Apple เป็นผู้สนับสนุนไหม?”

> ไม่ครับ Apple Inc. ไม่ใช่ผู้สนับสนุน ผู้รับรอง ผู้ดำเนินการ หรือผู้จัดแคมเปญนี้ เว้นแต่ในอนาคตจะมีข้อตกลงเป็นลายลักษณ์อักษรที่ระบุเป็นอย่างอื่น

## V. Internal SEV-1 escalation message

> **SEV-1 Campaign Integrity Incident**
>
> Trigger: [payment truth / eligibility count / security/privacy / legal/rules mismatch / prize availability]
>
> Immediate state: [kill switch ON / entries_open=false / campaign PAUSED]
>
> Detected at: [timestamp]
>
> Scope known so far: [verified facts only]
>
> Owners paged: [campaign owner] / [technical owner] / [legal/permit owner if applicable]
>
> Next evidence check: [backend reconciliation / provider / logs / rules version]

## W. Internal resume approval record

> **Campaign Resume Approval**
>
> Incident/case: [ID]
>
> Root cause / verified resolution: [summary]
>
> Eligibility/count reconciliation: [PASS evidence]
>
> Security/privacy check: [PASS/N/A evidence]
>
> Legal/rules check: [PASS/N/A evidence]
>
> Kill-switch test: [PASS]
>
> Approved by: [authorized owner]
>
> Approved at: [timestamp]
>
> State change: PAUSED -> LIVE

## X. Pre-send checklist for support/public messages

- [ ] Is campaign status from backend/audited source?
- [ ] Are we accidentally implying PRE-LAUNCH creates entries?
- [ ] Are we confirming payment from backend/provider rather than screenshot?
- [ ] Are we exposing unnecessary identity/payment data?
- [ ] Are we calling a provisional candidate a final winner?
- [ ] Does wording match the current published rules/version?
- [ ] Is legal/incident review required for this message?
- [ ] Are all `[TBD]` / bracket placeholders resolved before sending?

Until LIVE approval, use only PRE-LAUNCH-safe templates.