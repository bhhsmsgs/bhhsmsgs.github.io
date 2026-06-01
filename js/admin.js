const sb = supabase.createClient('https://betegxuivbdklzasqywt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGVneHVpdmJka2x6YXNxeXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTY3MDIsImV4cCI6MjA5NTc3MjcwMn0.yTEZOhtfpB6Ifk5SF99ZBl-ETiPAaQ--XM3DZnQwG1A');

(async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return; }
  const { data: profile } = await sb.from('profiles').select('is_admin').eq('id', session.user.id).single();
  if (!profile?.is_admin) { window.location.href = 'index.html'; return; }
  loadPendingUsers(); loadMessages();
})();

async function loadPendingUsers() {
  const { data } = await sb.from('profiles').select('id, email').eq('is_approved', false);
  document.getElementById('pending-users').innerHTML = data.map(u => `<div>${u.email} <button onclick="approveUser('${u.id}')">Approve</button></div>`).join('');
}

async function approveUser(id) { await sb.from('profiles').update({ is_approved: true }).eq('id', id); loadPendingUsers(); }

async function loadMessages() {
  const { data } = await sb.from('messages').select('*').order('created_at', { ascending: false });
  document.getElementById('message-log').innerHTML = '<table border="1"><tr><th>Email</th><th>Message</th></tr>' + data.map(m => `<tr><td>${m.user_email}</td><td>${m.message_text}</td></tr>`).join('') + '</table>';
}