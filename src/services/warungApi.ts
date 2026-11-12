// --- 1. INTERFACE: Memetakan data nyata dari API ke dalam Object ---
export interface CabangWarung {
  id: string;
  regency_id: string;
  name: string;
}

export interface StafWarung {
  login: { uuid: string };
  name: { first: string; last: string };
  phone: string;
  email: string;
  picture: { medium: string };
}

export interface BahanWarung {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

// --- 2. FUNGSI INTI API (.then(), .resolve(), .reject() & Pre-built Async fetch) ---
function ambilDataRealApi<T>(url: string, extractor?: (json: any) => T): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(url) // Pre-built async function
      .then((response) => {
        if (!response.ok) {
          reject(`Gagal mengambil data dari server (Status: ${response.status})`);
          return;
        }
        return response.json();
      })
      .then((json) => {
        if (!json) return;
        const hasil = extractor ? extractor(json) : json;
        if (Array.isArray(hasil) && hasil.length > 0) {
          resolve(hasil as T); // Berhasil -> kirim data via resolve()
        } else {
          reject("Data tidak ditemukan di server."); // Kosong -> reject()
        }
      })
      .catch((error) => {
        reject("Koneksi internet bermasalah: " + error.message); // Error jaringan -> reject()
      });
  });
}

// --- 3. CUSTOM ASYNC FUNCTIONS (async / await) UNTUK 3 MODUL ---

// Modul Cabang (/branches): Mengambil data Kecamatan Asli di Kota Malang (Kode 3573)
export async function getCabangWarung(): Promise<CabangWarung[]> {
  return await ambilDataRealApi<CabangWarung[]>(
    "https://www.emsifa.com/api-wilayah-indonesia/api/districts/3573.json"
  );
}

// Modul Staf (/staff): Mengambil data personil asli dari RandomUser API
export async function getStafWarung(): Promise<StafWarung[]> {
  return await ambilDataRealApi<StafWarung[]>(
    "https://randomuser.me/api/?results=8",
    (json) => json.results
  );
}

// Modul Stok & Inventori (/inventory): Mengambil data bahan pangan & sembako asli dari TheMealDB
export async function getStokWarung(keyword: string = ""): Promise<BahanWarung[]> {
  return await ambilDataRealApi<BahanWarung[]>(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    (json) => {
      const daftar: BahanWarung[] = (json.meals || []).slice(0, 40);
      if (!keyword.trim()) return daftar;
      return daftar.filter((item) =>
        item.strIngredient.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  );
}