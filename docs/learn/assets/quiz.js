// Multiple-choice quiz component.
// Markup: <div class="q" data-correct="2"><p>Question</p><ol class="opts"><li>…</li>…</ol>
//         <p class="why">Explanation</p></div>   (data-correct is 0-based)
// Each <li> becomes a button. The first pick counts toward the score and shows the
// explanation; picking again is allowed but doesn't change the score.
// A <p class="score"> anywhere on the page shows the running tally.
(() => {
  const qs = [...document.querySelectorAll('.q')];
  const score = document.querySelector('.score');
  let answered = 0, right = 0;

  const tally = () => {
    if (!score) return;
    score.textContent = answered === qs.length
      ? `You got ${right} of ${qs.length} on the first try.` + (right === qs.length ? ' Clean sweep.' : ' Re-read the explanations for the ones you missed.')
      : `${answered} of ${qs.length} answered.`;
  };

  qs.forEach((q, qi) => {
    const correct = Number(q.dataset.correct);
    const why = q.querySelector('.why');
    if (why) { why.hidden = true; why.setAttribute('role', 'status'); }
    const items = [...q.querySelectorAll('.opts > li')];
    let first = true;
    items.forEach((li, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.innerHTML = li.innerHTML;
      li.replaceChildren(b);
      b.addEventListener('click', () => {
        const ok = i === correct;
        b.dataset.state = ok ? 'right' : 'wrong';
        if (ok) items.forEach(other => { const ob = other.firstChild; if (ob !== b) ob.disabled = true; });
        if (first) {
          first = false; answered++; if (ok) right++;
          if (why) why.hidden = false;
          tally();
        }
        if (ok) b.disabled = true;
      });
    });
  });
  tally();
})();
