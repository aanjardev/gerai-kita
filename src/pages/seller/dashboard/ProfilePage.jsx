import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../CompleteProfilePage.css";
import "../Auth.css";

// Komponen Peta yang sudah diperbaiki
function DraggableMarker({ onPositionChange, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef(null);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const map = useMapEvents({
    click(e) {
      const newPos = e.latlng;
      setPosition(newPos);
      onPositionChange(newPos);
      map.flyTo(newPos, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onPositionChange(newPos);
        }
      },
    }),
    [onPositionChange]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
}

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [storeName, setStoreName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoFileName, setLogoFileName] = useState("");
  const [location, setLocation] = useState({ lat: -7.983908, lng: 112.621391 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profile, error } = await supabase
          .from("sellers")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (error) {
          console.error("Error fetching profile:", error);
        } else if (profile) {
          setStoreName(profile.store_name || "");
          setWhatsappNumber(profile.whatsapp_number || "");
          setDescription(profile.description || "");
          setLogoUrl(profile.logo_url || "");
          if (profile.location && typeof profile.location === "string") {
            try {
              const cleanedPoint = profile.location
                .replace("POINT(", "")
                .replace(")", "");
              const [lngStr, latStr] = cleanedPoint.split(" ");
              if (latStr && lngStr) {
                const lat = parseFloat(latStr);
                const lng = parseFloat(lngStr);
                if (!isNaN(lat) && !isNaN(lng)) {
                  setLocation({ lat, lng });
                }
              }
            } catch (e) {
              console.error("Failed to parse location, using default.", e);
            }
          }
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setLogoFileName(e.target.files[0].name);
      setLogoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let newLogoUrl = logoUrl;
      // Jika ada file logo baru yang dipilih, proses upload
      if (logoFile) {
        // Hapus URL objek blob lokal sebelum mengupload
        if (newLogoUrl.startsWith("blob:")) {
          newLogoUrl = "";
        }
        const fileExt = logoFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `logos/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("store-assets")
          .upload(filePath, logoFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: publicURLData } = supabase.storage
          .from("store-assets")
          .getPublicUrl(filePath);
        newLogoUrl = publicURLData.publicUrl;
      }

      const locationPoint = `POINT(${location.lng} ${location.lat})`;
      const updates = {
        store_name: storeName,
        whatsapp_number: whatsappNumber,
        description: description,
        location: locationPoint,
        logo_url: newLogoUrl,
      };

      const { error } = await supabase
        .from("sellers")
        .update(updates)
        .eq("id", user.id);
      if (error) throw error;
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Memuat data profil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="auth-header">Pengaturan Profil Toko</h1>
        <p className="profile-subheader">
          Perbarui informasi tokomu yang akan dilihat oleh pelanggan.
        </p>
      </div>
      <form onSubmit={handleProfileUpdate}>
        <div className="profile-grid">
          {/* Kolom Kiri: Input Teks (SUDAH DIPERBAIKI) */}
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="storeName">Nama Toko / Gerai Anda</label>
              <input
                id="storeName"
                className="auth-input"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="whatsapp">Nomor WhatsApp</label>
              <input
                id="whatsapp"
                className="auth-input"
                type="tel"
                placeholder="Contoh: 628123456789"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Deskripsi Toko</label>
              <textarea
                id="description"
                className="auth-input"
                placeholder="Deskripsi singkat tentang toko Anda"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {/* Kolom Kanan: Logo dan Peta */}
          <div className="form-section">
            <div className="input-group">
              <label>Logo Toko</label>
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              )}
              <label htmlFor="logoInput" className="file-input-wrapper">
                <span className="file-input-button">
                  {logoUrl ? "Ganti Logo" : "Pilih File"}
                </span>
                <input
                  id="logoInput"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
              {logoFileName && <p className="file-name">{logoFileName}</p>}
            </div>
            <div className="input-group">
              <label>Tentukan Lokasi Toko</label>
              <MapContainer
                key={JSON.stringify(location)}
                center={[location.lat, location.lng]}
                zoom={13}
                style={{
                  height: "250px",
                  width: "100%",
                  borderRadius: "8px",
                  zIndex: 0,
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker
                  onPositionChange={(newPos) => setLocation(newPos)}
                  initialPosition={location}
                />
              </MapContainer>
            </div>
          </div>
          <div className="submit-button-container">
            <button
              className="auth-button"
              type="submit"
              disabled={loading}
              style={{ width: "100%", maxWidth: "300px" }}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
