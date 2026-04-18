"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FAMILY_CONDITIONS, FAMILY_RELATIVES } from "@/lib/form-schema";

export default function FamilyHistoryFields() {
  const { watch, setValue } = useFormContext();
  const fh = watch("familyHistory") || {};
  const isNone = fh.none || false;

  const conditions = (fh.conditions || []) as Array<{ condition: string; relatives: string[] }>;

  const toggleRelative = (conditionIndex: number, relative: string, checked: boolean) => {
    const updated = conditions.map((c: any, i: number) => {
      if (i !== conditionIndex) return c;
      const currentRelatives = (c.relatives || []) as string[];
      return {
        ...c,
        relatives: checked
          ? [...currentRelatives, relative]
          : currentRelatives.filter((r:string) => r !== relative),
      };
    });
    setValue("familyHistory.conditions", updated);
  };

  const toggleCondition = (condition: string, checked: boolean) => {
    if (checked) {
      setValue("familyHistory.conditions", [...conditions, { condition, relatives: [] }]);
      setValue("familyHistory.none", false);
    } else {
      setValue("familyHistory.conditions", conditions.filter((c:any) => c.condition !== condition));
    }
  };

  const handleNone = (checked: boolean) => {
    if (checked) {
      setValue("familyHistory.conditions", []);
      setValue("familyHistory.none", true);
    } else {
      setValue("familyHistory.none", false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Family History</h3>
      <p className="text-sm text-gray-body">Check which conditions exist in your family members</p>

      <div className="flex items-center gap-2 mb-3 p-3 bg-primary/5 rounded-lg">
        <Checkbox
          id="fh-none"
          checked={isNone}
          onCheckedChange={handleNone}
          className="border-primary"
        />
        <label htmlFor="fh-none" className="text-sm font-medium cursor-pointer">None</label>
      </div>

      {/* Desktop: Table layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="p-2 text-left font-semibold min-w-[160px]">Condition</th>
              {FAMILY_RELATIVES.map((rel) => (
                <th key={rel} className="p-2 text-center font-semibold">{rel}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FAMILY_CONDITIONS.map((condition) => {
              const condIndex = conditions.findIndex((c:any) => c.condition === condition);
              const isActive = condIndex !== -1;
              const currentRelatives = isActive ? (conditions[condIndex].relatives || []) : [];

              if (condition === 'Other') {
                return (
                  <tr key={condition} className="border-t">
                    <td className="p-2 flex items-center gap-2">
                      <Checkbox
                        checked={isActive}
                        onCheckedChange={(checked) => toggleCondition(condition, !!checked)}
                        disabled={isNone}
                        className="border-primary"
                      />
                      <span>Other</span>
                    </td>
                    {FAMILY_RELATIVES.map((rel) => (
                      <td key={rel} className="p-2 text-center">
                        {isActive && (
                          <Checkbox
                            checked={currentRelatives.includes(rel)}
                            onCheckedChange={(checked) => toggleRelative(condIndex, rel, !!checked)}
                            className="border-primary"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              }

              return (
                <tr key={condition} className="border-t hover:bg-gray-50">
                  <td className="p-2 flex items-center gap-2">
                    <Checkbox
                      checked={isActive}
                      onCheckedChange={(checked) => toggleCondition(condition, !!checked)}
                      disabled={isNone}
                      className="border-primary"
                    />
                    <span>{condition}</span>
                  </td>
                  {FAMILY_RELATIVES.map((rel) => (
                    <td key={rel} className="p-2 text-center">
                      {isActive && (
                        <Checkbox
                          checked={currentRelatives.includes(rel)}
                          onCheckedChange={(checked) => toggleRelative(condIndex, rel, !!checked)}
                          className="border-primary"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}