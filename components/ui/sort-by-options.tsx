"use client"

// VERY IMPORTANT THAT THESE ARE NAMED THE EXACT SAME AS THE COLUMS WE WANNA SORT BY
const sortOptions = [
    { value: 'facility_name', label: 'Sort by Name' },
    { value: 'citytown', label: 'Sort by City' },
    { value: 'state', label: 'Sort by State' }
];

// Define the props our component will accept
type SortDropdownProps = {
    selectedValue: string;
    onSortChange: (newSortValue: string) => void;
};

export default function SortDropdown({ selectedValue, onSortChange }: SortDropdownProps) {
    
    // This function runs when the user selects a new option
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // It calls the function passed down from the parent
        // to update the parent's state
        onSortChange(event.target.value);
    };

    return (
        // The `select` element is the core of the dropdown.
        // We style it here with basic Tailwind classes.
        <select 
            value={selectedValue} 
            onChange={handleChange}
            className="p-2 rounded-md bg-white/10 border border-white/20 text-white"
        >
            {/* We map over our options array to create an <option> for each one */}
            {sortOptions.map(option => (
                <option 
                    key={option.value} 
                    value={option.value}
                    className="text-black" // Options often need their own color
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}