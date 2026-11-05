import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, ShoppingBag } from "lucide-react";
import { VinylEdition, Expedition } from "../types";
import { VINYL_EDITIONS, EXPEDITIONS } from "../data";
import { lithosAudio } from "../audioEngine";

interface PersistentPlayerProps {
  activeEdition: VinylEdition;
  onSelectEdition: (edition: VinylEdition) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenCart: () => void;
  onToast: (msg: string) => void;
}

export const PersistentPlayer: React.FC<PersistentPlayerProps> = ({
  activeEdition,
  onSelectEdition,
  isPlaying,
  onTogglePlay,
  onOpenCart,
  onToast,
}) => {
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      lithosAudio.setHydrophoneGain(0);
    } else {
      setIsMuted(false);
      lithosAudio.setHydrophoneGain(val);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      lithosAudio.setHydrophoneGain(volume || 0.75);
    } else {
      setIsMuted(true);
      lithosAudio.setHydrophoneGain(0);
    }
  };

  const handlePrevEdition = () => {
    const currentIndex = VINYL_EDITIONS.findIndex(e => e.id === activeEdition.id);
    const prevIndex = (currentIndex - 1 + VINYL_EDITIONS.length) % VINYL_EDITIONS.length;
    const nextEd = VINYL_EDITIONS[prevIndex];
    onSelectEdition(nextEd);
    const exp = EXPEDITIONS[prevIndex] || EXPEDITIONS[0];
    if (isPlaying) {
      lithosAudio.play(exp);
    }
    onToast(`Selected: ${nextEd.title.split(":")[0]}`);
  };

  const handleNextEdition = () => {
    const currentIndex = VINYL_EDITIONS.findIndex(e => e.id === activeEdition.id);
    const nextIndex = (currentIndex + 1) % VINYL_EDITIONS.length;
    const nextEd = VINYL_EDITIONS[nextIndex];
    onSelectEdition(nextEd);
    const exp = EXPEDITIONS[nextIndex] || EXPEDITIONS[0];
    if (isPlaying) {
      lithosAudio.play(exp);
    }
    onToast(`Selected: ${nextEd.title.split(":")[0]}`);
  };

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      animId = requestAnimationFrame(render);
      const analyser = lithosAudio.getAnalyser();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlaying || !analyser) {
        ctx.strokeStyle = "#25252b";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#e04528";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0d]/95 backdrop-blur-md border-t border-[#1f1f23] px-4 sm:px-8 py-2.5 text-[#e5e5e7] select-none shadow-[0_-4px_25px_rgba(0,0,0,0.9)] font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Active Record Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-[#2a2a30] shadow-md transition-transform duration-700 ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
            style={{ background: activeEdition.mockupTheme.marbleStyle }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#0c0c0d] border border-[#e04528]" />
          </div>

          <div className="min-w-0">
            <span className="text-[#e04528] text-xs font-semibold mr-2">
              {activeEdition.catalogNumber}
            </span>
            <span className="font-semibold text-xs text-white truncate">
              {activeEdition.title.split(":")[0]}
            </span>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevEdition}
            className="w-7 h-7 flex items-center justify-center text-[#8e8e93] hover:text-white rounded hover:bg-[#1c1c1f] transition-colors cursor-pointer"
            title="Previous"
          >
            <SkipBack size={14} />
          </button>

          <button
            onClick={onTogglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
              isPlaying
                ? "bg-[#e04528] text-white shadow-[0_0_12px_rgba(224,69,40,0.4)]"
                : "bg-[#25252a] hover:bg-[#e04528] text-white"
            }`}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          <button
            onClick={handleNextEdition}
            className="w-7 h-7 flex items-center justify-center text-[#8e8e93] hover:text-white rounded hover:bg-[#1c1c1f] transition-colors cursor-pointer"
            title="Next"
          >
            <SkipForward size={14} />
          </button>

          {/* Minimalist Audio Oscillogram */}
          <div className="hidden md:block w-28 h-4 bg-[#08080a] border border-[#222226] rounded-sm px-1 relative">
            <canvas ref={canvasRef} width={112} height={16} className="w-full h-full" />
          </div>
        </div>

        {/* Right: Master Volume & Cart Button */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="text-[#8e8e93] hover:text-white cursor-pointer"
            >
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1.2"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-[#25252b] accent-[#e04528] cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#1c1c1f] hover:bg-[#e04528] border border-[#2a2a30] hover:border-[#e04528] text-white px-3 py-1.5 rounded-sm text-xs font-medium transition-all cursor-pointer"
          >
            <ShoppingBag size={12} />
            <span>Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
