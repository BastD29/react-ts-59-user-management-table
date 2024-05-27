import { CLEAR_SORT, SET_SORT } from "../constants/actions";
import { PlantType } from "../models/plant";
import { useSortContext } from "./contexts/useSortContext";

const useSort = () => {
  const { state: sort, dispatch } = useSortContext();

  const handleSort = (key: keyof PlantType) => {
    dispatch({ type: SET_SORT, payload: key });
  };

  const clearSort = () => {
    dispatch({ type: CLEAR_SORT });
  };

  return { handleSort, clearSort, sort };
};

export { useSort };
