import FormValues from "./FormValues";
import TabBar from "./TabBar";
import { useState } from "react";

interface Form110TabsProps {
    json: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    TabsNames: Record<string, string>;
    CalculatedValues: string[];
    ValuesNames: Record<string, string>;
    onReport?: boolean;
    handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleQuit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FormTabs({json, handleChange, TabsNames, CalculatedValues, ValuesNames, onReport = false, handleAdd, handleQuit}: Form110TabsProps) {
    const keys = Object.keys(json);

    const tabs = keys.map(key => ({
        name: key,
        label: TabsNames[key] || key
    }));

    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const renderForm = (json: any, path: string) => (
        <FormValues json={json} path={path} handleChange={handleChange} CalculatedValues={CalculatedValues} ValuesNames={ValuesNames} handleAdd={handleAdd} handleQuit={handleQuit}/>
    );
    return (
        <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen">
            <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onReport={onReport}/>
            {tabs.map(tab => (
                activeTab === tab.name ? renderForm(json[tab.name], tab.name) : null
            ))}
        </section>
    );
} export default FormTabs;