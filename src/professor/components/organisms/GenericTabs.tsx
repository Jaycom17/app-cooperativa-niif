import GenericValues from "./GenericValues";
import TabBar from "../../../forms/components/TabBar";
import { useState } from "react";

interface GenericTabsProps {
  json: Record<string, any>;
  TabsNames?: Record<string, string>;
  ValuesNames?: Record<string, string>;
  onReport?: boolean;
}

function GenericTabs({
  json,
  TabsNames,
  ValuesNames,
  onReport = false,
}: GenericTabsProps) {

  const keys = json ? Object.keys(json) : [];
  const tabs = keys.map((key) => ({
    name: key,
    label: TabsNames?.[key] || key,
  }));

  const [activeTab, setActiveTab] = useState(() => tabs[0]?.name || "");

  const renderForm = (json: any) => (
    <GenericValues json={json} ValuesNames={ValuesNames!} />
  );

  return (
    <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReport={onReport}
      />
      {tabs.map((tab) =>
        activeTab === tab.name ? renderForm(json[tab.name]) : null
      )}
    </section>
  );
}
export default GenericTabs;
