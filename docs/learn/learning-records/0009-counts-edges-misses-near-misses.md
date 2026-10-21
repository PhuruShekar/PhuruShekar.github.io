# Counts edges correctly, doesn't see near misses yet

Lesson 6 exercises (2026-10-21), on live phurushekar.com (v1). He counted 4 edges and explained 3 as the Skills section's three columns, which is right: at 1440 the lines were 356px (headings, Skills column 1), 392px (Journey text), 604px and 856px (Skills columns 2 and 3). Grid columns are a fair reason for extra edges. He called none of them odd.

What he didn't see, partly because the snippet only drew edges shared by 3+ blocks (now 2+): the project cards' text starts at 376, 624 and 868px. Those sit 20px off the heading edge and 12–20px off the Skills columns directly below them. The cards' padding moves the text off the grid, so two sections that look aligned aren't. The Journey's 36px indent is deliberate: the timeline dots sit on the heading edge and the text starts after them.

Phone: he reports nothing drifted at 390px (not checked by me).

**Implications**: he can count edges and justify them; the next step is seeing near misses (a few px to ~24px off), which look like mistakes where a clear indent looks intended. Good evidence for v2 dropping cards: text aligns to the grid directly. No quiz score reported for lessons 5 or 6; the statement-size exercise is still open.
