'use client';

type SearchBarProps = {
  value: string;
  onSearchChange: (newQuery: string) => void;
};

export default function SearchBar({ onSearchChange, value } : SearchBarProps ) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="min-w-[100px] max-w-[250px]">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by zip"
        className="w-full px-4 py-3 bg-background border border-foreground rounded-lg text-foreground placeholder-foreground-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}
