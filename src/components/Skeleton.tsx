const Skeleton = () => {
  return (
    <div className="flex flex-col w-full gap-3 animate-pulse">
      <div className="h-2 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-2 col-span-2 rounded bg-slate-200"></div>
        <div className="h-2 col-span-1 rounded bg-slate-200"></div>
      </div>
      <div className="h-2 rounded bg-slate-200"></div>
      <div className="h-2 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-2 col-span-1 rounded bg-slate-200"></div>
        <div className="h-2 col-span-2 rounded bg-slate-200"></div>
      </div>
      <div className="h-2 rounded bg-slate-200"></div>
      <div className="h-2 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-2 col-span-2 rounded bg-slate-200"></div>
        <div className="h-2 col-span-1 rounded bg-slate-200"></div>
      </div>
      <div className="h-2 rounded bg-slate-200"></div>
    </div>
  );
};

export default Skeleton;
