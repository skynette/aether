
interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, placeholder, icon }) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-primary">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export default InputField