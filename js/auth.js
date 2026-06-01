const sb = supabase.createClient('https://betegxuivbdklzasqywt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGVneHVpdmJka2x6YXNxeXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTY3MDIsImV4cCI6MjA5NTc3MjcwMn0.yTEZOhtfpB6Ifk5SF99ZBl-ETiPAaQ--XM3DZnQwG1A');

async function signUp() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const { error } = await sb.auth.signUp({ email, password });
  document.getElementById('message').textContent = error ? error.message : 'Check your email to confirm!';
}

async function logIn() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { document.getElementById('message').textContent = error.message; return; }
  const { data: profile } = await sb.from('profiles').select('is_approved, is_admin').eq('id', data.user.id).single();
  if (!profile?.is_approved) { document.getElementById('message').textContent = 'Pending approval.'; await sb.auth.signOut(); return; }
  window.location.href = profile.is_admin ? 'admin.html' : 'dashboard.html';
}