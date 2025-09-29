
const API_URL = "https://8080-bdecbfeafecccdbcbeeaefdcadcfebaceabaa.premiumproject.examly.io/leaves";

export const getAllLeaves = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to fetch leaves: ${res.status}`);
    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("Error in getAllLeaves:", err);
    throw err;
  }
};

// Add a new leave
export const addLeave = async (leave) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leave),
    });
    if (!res.ok) throw new Error(`Failed to add leave: ${res.status}`);
    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("Error in addLeave:", err);
    throw err;
  }
};

// Update an existing leave
export const updateLeave = async (id, leave) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leave),
    });
    if (!res.ok) throw new Error(`Failed to update leave: ${res.status}`);
    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("Error in updateLeave:", err);
    throw err;
  }
};

// Delete a leave
export const deleteLeave = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete leave: ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error in deleteLeave:", err);
    throw err;
  }
};
