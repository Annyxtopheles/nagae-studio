import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Disc, Volume2, VolumeX, SkipBack, SkipForward, Activity, ShoppingBag } from "lucide-react";
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

  // Sync volume with audio engine
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

  // Skip between vinyl editions
  const handlePrevEdition = () => {
    const currentIndex = VINYL_EDITIONS.findIndex(e => e.id === activeEdition.id);
    const prevIndex = (currentIndex - 1 + VINYL_EDITIONS.length) % VINYL_EDITIONS.length;
    const nextEd = VINYL_EDITIONS[prevIndex];
    onSelectEdition(nextEd);
    const exp = EXPEDITIONS[prevIndex] || EXPEDITIONS[0];
    if (isPlaying) {
      lithosAudio.play(exp);
    }
    onToast(`Selected [${nextEd.catalogNumber}] ${nextEd.title}`);
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
    onToast(`Selected [${nextEd.catalogNumber}] ${nextEd.title}`);
  };

  // Canvas visualizer animation
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
        // Flatline idle line
        ctx.strokeStyle = "#27272D";
        ctx.lineWidth = 1.5;
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
      ctx.strokeStyle = "#D94E28";
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-md border-t border-[#27272D] px-4 lg:px-8 py-2.5 text-[#ECEAE4] select-none shadow-[0_-4px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Active Record Info & Spinning Vinyl Disc */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border border-[#27272D] shadow-md transition-transform duration-700 ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
            style={{ background: activeEdition.mockupTheme.marbleStyle }}
          >
            <div className="w-3 h-3 rounded-full bg-[#0A0A0B] border border-[#D94E28]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[#D94E28] font-mono text-[10px] font-bold">
                {activeEdition.catalogNumber}
              </span>
              <span className="text-[10px] font-mono text-[#8F8E8A] hidden sm:inline">
                {activeEdition.format}
              </span>
            </div>
            <p className="font-['Cinzel'] font-bold text-xs text-[#ECEAE4] truncate leading-tight">
              {activeEdition.title.split(":")[0]}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls & Waveform Oscilloscope */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevEdition}
              className="w-7 h-7 flex items-center justify-center text-[#8F8E8A] hover:text-[#ECEAE4] hover:bg-[#141416] border border-transparent hover:border-[#27272D] transition-colors cursor-pointer"
              title="Previous Release"
            >
              <SkipBack size={13} />
            </button>

            <button
              onClick={onTogglePlay}
              className={`w-8 h-8 flex items-center justify-center font-mono font-bold transition-all cursor-pointer ${
                isPlaying
                  ? "bg-[#D94E28] text-white shadow-[0_0_12px_rgba(217,78,40,0.5)]"
                  : "bg-[#27272D] hover:bg-[#D94E28] text-[#ECEAE4] hover:text-white"
              }`}
              title={isPlaying ? "Pause Stream" : "Play Release"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            <button
              onClick={handleNextEdition}
              className="w-7 h-7 flex items-center justify-center text-[#8F8E8A] hover:text-[#ECEAE4] hover:bg-[#141416] border border-transparent hover:border-[#27272D] transition-colors cursor-pointer"
              title="Next Release"
            >
              <SkipForward size={13} />
            </button>
          </div>

          {/* Real-time Oscilloscope Mini-Canvas */}
          <div className="hidden md:block w-36 h-6 bg-[#0A0A0B] border border-[#27272D] px-1 relative">
            <canvas ref={canvasRef} width={140} height={24} className="w-full h-full" />
            <span className="absolute bottom-0 right-1 text-[7px] font-mono text-[#8F8E8A] tracking-tighter">
              {isPlaying ? "192kHz" : "OFFLINE"}
            </span>
          </div>
        </div>

        {/* Right: Master Volume & Cart Reservation CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="text-[#8F8E8A] hover:text-[#ECEAE4] cursor-pointer"
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
              className="w-16 h-1 bg-[#27272D] accent-[#D94E28] cursor-pointer"
              title={`Master Volume: ${Math.round(volume * 100)}%`}
            />
          </div>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#141416] hover:bg-[#D94E28] border border-[#27272D] hover:border-[#D94E28] text-[#ECEAE4] hover:text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <ShoppingBag size={12} />
            <span className="hidden sm:inline">VAULT CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
