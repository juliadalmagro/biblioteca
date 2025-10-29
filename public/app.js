async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if(!res.ok) {
    const err = await res.json().catch(()=>({error:res.statusText}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

let currentUser = null;
let currentUserFull = null;

document.getElementById('loginForm').onsubmit = async (ev) => {
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const username = fd.get('username');
  const password = fd.get('password');
  try {
    const r = await fetchJSON('/api/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, password })
    });
    currentUser = r.user;
    await afterLogin();
  } catch (e) {
    alert('Falha ao entrar: ' + e.message);
  }
};

async function afterLogin() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('booksSection').classList.remove('hidden');
  if(currentUser.role === 'admin') {
    document.getElementById('adminNav').classList.remove('hidden');
  }
  document.getElementById('userInfo').textContent = 'Olá, ' + currentUser.username + ' (' + currentUser.role + ')';
  currentUserFull = await fetchJSON('/api/user/me');
  loadBooks();
}

document.getElementById('logoutBtn').onclick = async () => {
  await fetch('/api/logout', { method: 'POST' });
  location.reload();
};

async function loadBooks() {
  const list = document.getElementById('booksList');
  try {
    const books = await fetchJSON('/api/books');
    currentUserFull = await fetchJSON('/api/user/me');
    list.innerHTML = books.map(b => renderBookCard(b)).join('');
    document.querySelectorAll('.loanBtn').forEach(btn => {
      btn.onclick = async () => {
        try {
          const id = btn.dataset.id;
          await fetchJSON('/api/user/loan/' + id, { method: 'POST' });
          alert('Empréstimo solicitado com sucesso');
          await afterLogin();
        } catch (e) { alert('Erro: ' + e.message); }
      };
    });
    document.querySelectorAll('.returnBtn').forEach(btn => {
      btn.onclick = async () => {
        try {
          const id = btn.dataset.id;
          await fetchJSON('/api/user/return/' + id, { method: 'POST' });
          alert('Devolução realizada com sucesso');
          await afterLogin();
        } catch (e) { alert('Erro: ' + e.message); }
      };
    });
  } catch (e) {
    list.textContent = 'Falha ao carregar: ' + e.message;
  }
}

function renderBookCard(b) {
  const activeLoan = currentUserFull && currentUserFull.loans && currentUserFull.loans.find(l => l.bookId === b.id && !l.returnedAt);
  let actions = '';
  if(b.available) {
    actions = '<button class="loanBtn" data-id="'+b.id+'">Pedir empréstimo</button>';
  } else if(activeLoan) {
    actions = '<button class="returnBtn" data-id="'+b.id+'">Devolver</button>';
  } else {
    actions = '<span class="small">Indisponível</span>';
  }
  const lastLoan = currentUserFull && currentUserFull.loans ? currentUserFull.loans.filter(l=>l.bookId===b.id).slice(-1)[0] : null;
  const loanInfo = lastLoan ? '<div class="small">Emprestado: '+(lastLoan.borrowedAt ? new Date(lastLoan.borrowedAt).toLocaleString() : '-') + (lastLoan.returnedAt ? '<br/>Devolvido: '+new Date(lastLoan.returnedAt).toLocaleString() : '') +'</div>' : '';
  return '<div class="book-card"><div class="book-title">'+escapeHtml(b.title)+'</div><div class="book-author">'+escapeHtml(b.author)+'</div>'+loanInfo+'<div class="book-actions">'+actions+'</div></div>';
}

function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
