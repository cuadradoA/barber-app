const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ==============================
// CREAR CITA
// ==============================

export async function createAppointment(payload) {

  const res = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}


// ==============================
// LOGIN DEL DUEÑO
// ==============================

export async function login(username, password) {

  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}


// ==============================
// OBTENER CITAS (PÚBLICO)
// ==============================

export async function getAppointments(date) {

  const url = new URL(`${API_URL}/api/appointments`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}


// ==============================
// DASHBOARD - CITAS DEL DÍA
// ==============================

export async function getDashboardAppointments(date, token) {

  const url = new URL(`${API_URL}/api/dashboard/appointments`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}


// ==============================
// DASHBOARD - ESTADÍSTICAS
// ==============================

export async function getStats(date, token) {

  const url = new URL(`${API_URL}/api/dashboard/stats`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}

export async function getServices(type) {

  const res = await fetch(
    `${API_URL}/api/services?type=${type}`
  );

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();

}