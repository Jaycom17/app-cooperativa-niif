interface YesNoSelectProps {
    message: string;
    path: string;
    data: any;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function YesNoSelect({ message, path, data, handleChange }: YesNoSelectProps) {
    return (
        <div className="flex items-center gap-2 justify-between bg-gray-200 p-1 rounded">
            <h3 className="font-semibold">{message}</h3>
            <select
                className="border-none rounded"
                name={path}
                id=""
                defaultValue={data ? 'true' : 'false'}
                onChange={
                    (e) => handleChange(e)
                }
            >
                <option value="true">Si</option>
                <option value="false">No</option>
            </select>
        </div>
    );
}

export default YesNoSelect;