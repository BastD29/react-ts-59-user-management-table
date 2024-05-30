import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import { OptionType } from "../../models/option";
import useOutsideClick from "../../hooks/useOutsideClick";
import ChevronUpIcon from "../Icons/ChevronUpIcon/ChevronUpIcon";
import ChevronDownIcon from "../Icons/ChevronDownIcon/ChevronDownIcon";
import { PlantType } from "../../models/plant";
import { plants } from "../../data/plants";
import style from "./Dropdown.module.scss";

type DropdownProps = {
  dataKey: keyof PlantType;
  label: string;
  name: string;
  value: string;
};

const getUniqueOptions = (arr: PlantType[], key: keyof PlantType) => {
  return Array.from(new Set(arr.map((item) => String(item[key]))));
};

const formatLabel = (value: string) =>
  value.replace(/-/g, " ").charAt(0).toUpperCase() +
  value.replace(/-/g, " ").slice(1);

const Dropdown: React.FC<DropdownProps> = ({ dataKey, label, name, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { handleFilter } = useFilter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const options: OptionType[] = useMemo(
    () =>
      getUniqueOptions(plants, dataKey).map((value) => ({
        value,
        label: formatLabel(value),
      })),
    [dataKey]
  );

  // console.log("options:", options);

  const handleSelect = (val: string) => {
    handleFilter({ target: { name, value: val } } as ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >);
    setIsOpen(false);
  };

  return (
    <div className={style["dropdown"]} ref={dropdownRef}>
      <div
        className={style["dropdown__header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* {formatLabel(value) || label}{" "} */}
        {value || label} {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      {isOpen && (
        <div className={style["dropdown__list"]}>
          <div
            className={style["dropdown__option"]}
            onClick={() => handleSelect("")}
          >
            {label}
          </div>
          {options.map((option) => (
            <div
              className={style["dropdown__option"]}
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
