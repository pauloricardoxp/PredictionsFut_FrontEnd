const LiveBadge = () => (
  <div className="flex items-center gap-xs bg-red-600/20 px-xs py-1 rounded-full border border-red-500/30">
    <span className="w-2 h-2 rounded-full bg-red-500 live-pulse" />
    <span className="font-label-mono text-[10px] font-bold text-red-500 tracking-tighter">
      LIVE
    </span>
  </div>
)

export default LiveBadge