import { useEffect, useRef, useState } from "react";
import { IdleAnimation, SkinViewer as Skinview3D } from "skinview3d";

interface SkinViewerProps {
  skinUrl: string;
  slim?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export const SkinViewer = ({
  skinUrl,
  slim = false,
  width = 150,
  height = 300,
  className,
}: SkinViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<Skinview3D | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!viewerRef.current) {
      viewerRef.current = new Skinview3D({
        canvas: canvasRef.current,
        width,
        height,
      });
      viewerRef.current.animation = new IdleAnimation();
    }

    setError(null);
    viewerRef.current.setSize(width, height);

    viewerRef.current.loadSkin(skinUrl, { model: "auto-detect" }).catch((e) => {
      console.error("Failed to load skin:", e);
      setError(e.toString());
    });
  }, [skinUrl, slim, width, height]);

  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          color: "red",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Skin Error: {error}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
    />
  );
};
