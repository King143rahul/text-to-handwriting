// File: js/utils/rich-text.mjs
export function setupRichText() {
  const note = document.getElementById('note');
  const toolbar = document.getElementById('rich-text-toolbar');
  if(!toolbar || !note) return;

  const rtHeading = document.getElementById('rt-heading');
  const rtBold = document.getElementById('rt-bold');
  const rtColor = document.getElementById('rt-color');
  const rtTable = document.getElementById('rt-table');

  note.addEventListener('mouseup', (e) => {
    const selection = window.getSelection();
    if (selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      toolbar.style.left = `${Math.max(10, rect.left + window.scrollX - 20)}px`;
      toolbar.style.top = `${Math.max(10, rect.top + window.scrollY - 60)}px`;
      toolbar.classList.add('visible');
    } else {
      toolbar.classList.remove('visible');
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!toolbar.contains(e.target) && e.target !== note) {
      toolbar.classList.remove('visible');
    }
  });

  rtHeading.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('formatBlock', false, 'H3');
  });

  rtBold.addEventListener('click', (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const span = document.createElement('span');
      span.style.textShadow = '0 0 1px currentColor';
      span.textContent = selection.toString();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);
    }
  });

  rtColor.addEventListener('input', (e) => {
    document.execCommand('foreColor', false, e.target.value);
  });

  const rtBullet = document.getElementById('rt-bullet');
  if (rtBullet) {
    rtBullet.addEventListener('click', (e) => {
      e.preventDefault();
      document.execCommand('insertUnorderedList', false, null);
    });
  }

  rtTable.addEventListener('click', (e) => {
    e.preventDefault();
    const tableHTML = `
      <table class="paper-table">
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
        <tr><td>Cell 3</td><td>Cell 4</td></tr>
      </table><br>
    `;
    document.execCommand('insertHTML', false, tableHTML);
  });
}
