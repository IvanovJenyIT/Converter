import { Converter } from "@/widgets/converter";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex items-start justify-center p-4 md:p-10">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold">Currency converter</p>
          <div className="text-sm text-muted-foreground">
            Get real-time exchange rates
          </div>
        </div>
        <Converter />
      </div>
    </div>
  );
};
