/* ═══════════════════════════════════════════════════════════
   CampusHire — Placement Portal  |  script.js
   ═══════════════════════════════════════════════════════════ */

/* ── State ───────────────────────────────────────────────── */
let selectedRole = null;   // 'officer' | 'recruiter' | 'student'
let currentMode  = 'login'; // 'login'  | 'register'
let toastTimer   = null;

/* ── Role Config ─────────────────────────────────────────── */
const ROLE_CONFIG = {
  officer: {
    color:        'var(--officer)',
    label:        '🏛️  Placement Officer',
    loginHeading: 'Officer Portal',
    loginBtnText: 'Sign In as Officer',
    loginOnly:    true,
  },
  recruiter: {
    color:        'var(--recruiter)',
    label:        '🏢  Recruiter',
    loginHeading: 'Recruiter Access',
    loginBtnText: 'Sign In',
    registerHeading: 'Join as Recruiter',
    registerSub:  'Register to start finding and hiring student talent.',
    registerBtnText: 'Register as Recruiter',
    loginOnly:    true,
  },
  student: {
    color:        'var(--student)',
    label:        '🎓  Student',
    loginHeading: 'Student Portal',
    loginBtnText: 'Sign In',
    registerHeading: 'Create Student Account',
    registerSub:  'Register to upload your CV and get discovered by top recruiters.',
    registerBtnText: 'Register as Student',
    loginOnly:    false,
  },
};

/* ══════════════════════════════════════════════════════════
   LOGO UPLOAD
══════════════════════════════════════════════════════════ */
document.getElementById('logo-file').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (ev) {
    const drop = document.getElementById('logo-drop');
    drop.innerHTML = `<img src="${ev.target.result}" alt="Institution Logo" />`;
    drop.classList.add('has-logo');
  };
  reader.readAsDataURL(file);
});

/* ══════════════════════════════════════════════════════════
   ROLE SELECTION  (Step 1)
══════════════════════════════════════════════════════════ */
function selectRole(role) {
  selectedRole = role;

  /* Deselect all cards */
  document.querySelectorAll('.role-card').forEach(function (card) {
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  });

  /* Select the clicked card */
  const chosen = document.querySelector(`[data-role="${role}"]`);
  chosen.classList.add('selected');
  chosen.setAttribute('aria-checked', 'true');

  /* Enable the Continue button */
  document.getElementById('btn-next').disabled = false;
}

/* ══════════════════════════════════════════════════════════
   STEP NAVIGATION
══════════════════════════════════════════════════════════ */

/* Step 1 → Step 2 */
function goToForm() {
  if (!selectedRole) return;

  const config = ROLE_CONFIG[selectedRole];

  /* Swap visible step panels */
  document.getElementById('step-role').classList.remove('active');
  document.getElementById('step-form').classList.add('active');

  /* Update progress dots */
  document.getElementById('dot-1').classList.replace('active', 'done');
  document.getElementById('dot-2').classList.add('active');

  /* Role identity strip */
  document.getElementById('role-dot').style.background   = config.color;
  document.getElementById('role-name-display').textContent = config.label;

  /* Placement Officer = login only */
  if (config.loginOnly) {
    document.getElementById('mode-toggle').style.display    = 'none';
    document.getElementById('officer-notice').style.display = 'flex';
  } else {
    document.getElementById('mode-toggle').style.display    = 'flex';
    document.getElementById('officer-notice').style.display = 'none';
  }

  /* Default to login view */
  setMode('login');
}

/* Step 2 → Step 1 */
function goBack() {
  document.getElementById('step-form').classList.remove('active');
  document.getElementById('step-role').classList.add('active');

  document.getElementById('dot-2').classList.remove('active');
  document.getElementById('dot-1').classList.replace('done', 'active');
}

/* ══════════════════════════════════════════════════════════
   MODE TOGGLE  (Login ↔ Register)
══════════════════════════════════════════════════════════ */
function setMode(mode) {
  currentMode = mode;
  const config  = ROLE_CONFIG[selectedRole];
  const isLogin = mode === 'login';

  /* Show / hide the two forms */
  document.getElementById('login-form').style.display    = isLogin ? 'block' : 'none';
  document.getElementById('register-form').style.display = isLogin ? 'none'  : 'block';

  /* Toggle tab active state */
  document.getElementById('btn-login').classList.toggle('active',    isLogin);
  document.getElementById('btn-register').classList.toggle('active', !isLogin);
  document.getElementById('btn-login').setAttribute('aria-selected',    isLogin  ? 'true' : 'false');
  document.getElementById('btn-register').setAttribute('aria-selected', !isLogin ? 'true' : 'false');

  /* Update login heading & button text */
  document.getElementById('login-heading').textContent  = config.loginHeading;
  document.getElementById('login-btn-text').textContent = config.loginBtnText;

  /* Update register heading, sub & button text */
  if (!isLogin && !config.loginOnly) {
    document.getElementById('register-heading').textContent = config.registerHeading;
    document.getElementById('register-sub').textContent     = config.registerSub;
    document.getElementById('reg-btn-text').textContent     = config.registerBtnText;

    /* Show the right role-specific section */
    document.getElementById('recruiter-fields').style.display =
      selectedRole === 'recruiter' ? 'block' : 'none';
    document.getElementById('student-fields').style.display =
      selectedRole === 'student'   ? 'block' : 'none';
  }
}

/* ══════════════════════════════════════════════════════════
   FILE UPLOAD HANDLER  (Company ID / College ID card)
══════════════════════════════════════════════════════════ */
function handleFileUpload(input, zoneId, labelId) {
  const file = input.files[0];
  if (!file) return;

  const zone  = document.getElementById(zoneId);
  const label = document.getElementById(labelId);

  /* Validate size (5 MB max) */
  const MAX_MB = 5;
  if (file.size > MAX_MB * 1024 * 1024) {
    showToast(`⚠️ File too large. Max size is ${MAX_MB} MB.`, 'var(--danger)');
    input.value = '';
    return;
  }

  /* Update the zone to show the file name */
  zone.classList.add('file-loaded');
  label.textContent = `✅  ${file.name}`;
  showToast('📎 File uploaded successfully!', 'var(--student)');
}

/* ══════════════════════════════════════════════════════════
   PASSWORD VISIBILITY TOGGLE
══════════════════════════════════════════════════════════ */
function togglePwd(inputId, btn) {
  const input  = document.getElementById(inputId);
  const isText = input.type === 'text';
  input.type   = isText ? 'password' : 'text';
  btn.textContent = isText ? '👁' : '🙈';
  btn.setAttribute('aria-label',
    isText ? 'Show password' : 'Hide password'
  );
}

/* ══════════════════════════════════════════════════════════
   PASSWORD STRENGTH METER
══════════════════════════════════════════════════════════ */
function updateStrength(val) {
  /* Reset all bars */
  ['s1', 's2', 's3', 's4'].forEach(function (id) {
    document.getElementById(id).className = 'pwd-bar';
  });

  if (!val) return;

  /* Score rules */
  let score = 0;
  if (val.length >= 8)             score++; /* minimum length    */
  if (/[A-Z]/.test(val))           score++; /* has uppercase     */
  if (/[0-9]/.test(val))           score++; /* has number        */
  if (/[^A-Za-z0-9]/.test(val))   score++; /* has special char  */

  /* Map score → CSS class */
  const cls = score <= 1 ? 'weak' : score <= 2 ? 'medium' : 'strong';

  /* Colour filled bars */
  for (let i = 0; i < score; i++) {
    document.getElementById(['s1','s2','s3','s4'][i]).classList.add(cls);
  }
}

/* ══════════════════════════════════════════════════════════
   FORM SUBMISSION HANDLER
══════════════════════════════════════════════════════════ */
function handleSubmit(mode) {
  const config     = ROLE_CONFIG[selectedRole];
  const roleLabel  = config.label;
  const color      = config.color;

    if(mode === 'login') {

        const password =
            document.getElementById('login-pwd-field').value;

        const storedPassword = "campushire123";

    if(mode === 'login') {

        const password =
            document.getElementById('login-pwd-field').value;

        const storedPassword = "campushire123";

        if(password === storedPassword){
            showToast(
                "✅ Login Successful",
                "var(--student)"
            );
        }
        else{
            showToast(
                "❌ Invalid Password",
                "var(--danger)"
            );
        }

        return;
    }

    showToast(
        "🎉 Account Created Successfully",
        "var(--student)"
    );


        if(password === storedPassword){
            showToast(
                "✅ Login Successful",
                "var(--student)"
            );
        }
        else{
            showToast(
                "❌ Invalid Password",
                "var(--danger)"
            );
        }

        return;
    }

    showToast(
        "🎉 Account Created Successfully",
        "var(--student)"
    );

  /*
   * 🔌 BACKEND INTEGRATION POINT
   * Replace the showToast call above with a real fetch():
   *
   * fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email, password, role: selectedRole })
   * })
   * .then(res => res.json())
   * .then(data => { ... })
   * .catch(err => { ... });
   */
}

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════════════════ */
function showToast(message, color) {
  color = color || 'var(--accent)';

  /* Cancel any existing timer */
  clearTimeout(toastTimer);

  /* Update content */
  document.getElementById('toast-msg').textContent          = message;
  document.getElementById('toast-dot').style.background     = color;

  /* Animate in */
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  /* Auto-dismiss after 3.2 s */
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 3200);
}