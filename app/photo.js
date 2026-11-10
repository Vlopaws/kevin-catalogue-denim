"use client";
import { useEffect, useRef } from "react";

const remplacement = "/sans-photo.svg";

// Image distante ; si elle manque ou si son site refuse l'affichage, image de remplacement.
// L'erreur peut survenir avant l'hydratation : on la revérifie au montage.
export default function Photo({ src, alt }) {
  const ref = useRef(null);
  useEffect(() => {
    const img = ref.current;
    if (img.complete && img.naturalWidth === 0) img.src = remplacement;
  }, []);
  return (
    <img
      ref={ref}
      src={src || remplacement}
      alt={alt}
      onError={(e) => { e.currentTarget.src = remplacement; }}
    />
  );
}
