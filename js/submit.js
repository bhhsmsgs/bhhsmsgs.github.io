const sb = supabase.createClient('https://betegxuivbdklzasqywt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGVneHVpdmJka2x6YXNxeXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTY3MDIsImV4cCI6MjA5NTc3MjcwMn0.yTEZOhtfpB6Ifk5SF99ZBl-ETiPAaQ--XM3DZnQwG1A');

async function submitMessage() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return; }
  const message = document.getElementById('message-input').value.trim();
  const res = await fetch('https://YOUR-RENDER-APP.onrender.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, token: session.access_token }),
  });
  const data = await res.json();
  document.getElementById('status').textContent = data.result === 'approved' ? '✅ Submitted!' : '❌ Rejected.';
}

async function logOut() { await sb.auth.signOut(); window.location.href = 'index.html'; }