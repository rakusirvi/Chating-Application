const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="relative hidden lg:flex flex-col items-center justify-center p-12 ">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 mb-9  gap-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-base-content/70 text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
