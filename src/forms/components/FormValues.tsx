import Accordeon from "./Accordeon";

interface FormValuesProps {
    json: any;
    path: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    CalculatedValues: string[];
    ValuesNames: Record<string, string>;
    handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleQuit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FormValues({ json, path, handleChange, CalculatedValues, ValuesNames, handleAdd, handleQuit}: FormValuesProps) {
    const renderTextField = (label, value, key) => {
        const displayTitle = ValuesNames[label] || label;
        return(
            <div key={key} className="flex flex-col space-y-2 bg-white">
            <label className="bg-white font-semibold text-sm" htmlFor={key}>
                {displayTitle}
            </label>
            <input
                className=" bg-white border rounded-md p-1"
                type="text"
                name={key}
                value={value}
                placeholder={value}
                onChange={(e) => handleChange(e)}
            />
        </div>
        )
    };

    const renderNumberField = (label, value, key) => {
        const displayTitle = ValuesNames[label] || label;
        const keySegment = key.split(".").pop();

        return(
            <div key={key} className="flex flex-col justify-between space-y-2 bg-white">
            <label className="bg-white font-semibold text-sm" htmlFor={key}>
                {displayTitle}
            </label>
            {(CalculatedValues.includes(keySegment)) ? <p className="bg-white rounded-md p-1">{value}</p> : 
            <input
                className=" bg-white border rounded-md p-1"
                type="number"
                name={key}
                defaultValue={value === 0 ? '' : value}
                placeholder={0}
                onChange={(e) => handleChange(e)}
            />
        }
        </div>
        )
    };

    const renderBooleanField = (label, value, key) => {
        const displayTitle = ValuesNames[label] || label;
        return (
            <div key={key} className="flex flex-col space-y-2 bg-white">
                <label className="bg-white font-semibold text-sm" htmlFor={key}>
                    {displayTitle}
                </label>
                <select
                    className="bg-white border rounded-md p-1"
                    name={key}
                    defaultValue={value ? 'true' : 'false'}
                    onChange={
                        (e) => handleChange(e)
                    }
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
        );
    };

    const renderArrayButtons = (key) => {
        return (
            <div key={key} className="flex flex-col space-y-2 bg-white">
                <label className="bg-white font-semibold text-sm" htmlFor={key}>
                    {key}
                </label>
            </div>
        );
    }

    const renderContent = (data, parentKey) => {
        return Object.entries(data).map(([key, val]) => {
            const uniqueKey = `${parentKey}.${key}`;
            if(key === "Data"){
                renderArrayButtons(key);
            }
            if (typeof val === 'object') {
                return renderAccordeon(key, val, uniqueKey);
            }else if(typeof val === 'string'){
                return renderTextField(key, val, uniqueKey);
            }else if(typeof val === 'boolean'){
                return renderBooleanField(key, val, uniqueKey);
            } 
            else {            
                return renderNumberField(key, val, uniqueKey);
            }
        });
    };

    const renderAccordeon = (title, content, key) => {
        const displayTitle = ValuesNames[title] || title;
        if(Array.isArray(content)){
            return (
                <Accordeon key={key} title={displayTitle} path={key} arrayIndex={Object.keys(content)[0]} onAdd={handleAdd} onQuit={handleQuit}>
                    {renderContent(content, key)}
                </Accordeon>
            );
        }
        return (
            <Accordeon key={key} title={displayTitle}>
                {renderContent(content, key)}
            </Accordeon>
        );

    };

    return (
        <>
            {renderContent(json,path)}
        </>
    );
}
export default FormValues;