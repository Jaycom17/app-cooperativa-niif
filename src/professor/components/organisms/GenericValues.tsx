import Accordeon from "../../../forms/components/Accordeon";

interface GenericValuesProps {
    json: Record<string, any>;
    ValuesNames: Record<string, string>;
}

function GenericValues({ json, ValuesNames}: GenericValuesProps) {

    const renderTextField = (label, value, key) => {
        const displayTitle = ValuesNames[label] || label;
        return(
            <div key={key} className="flex flex-col space-y-2 bg-white">
            <label className="bg-white font-semibold text-sm" htmlFor={key}>
                {displayTitle}
            </label>
            <p
                className=" bg-white border-b-2  p-1"
            >{value}</p>
        </div>
        )
    };

    const renderNumberField = (label, value, key) => {
        const displayTitle = ValuesNames[label] || label;
        return(
            <div key={key} className="flex flex-col justify-between space-y-2 bg-white">
            <label className="bg-white font-semibold text-sm" htmlFor={key}>
                {displayTitle}
            </label>
            <p
            className=" bg-white border-b-2  p-1"
            >{value}</p>
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
                <p
                className=" bg-white border-b-2  p-1"
            >{value ? "Si": "No"}</p>
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
        return (
            <Accordeon key={key} title={displayTitle}>
                {renderContent(content, key)}
            </Accordeon>
        );
    };

    return (
        <>
            {renderContent(json)}
        </>
    );
}
export default GenericValues;
