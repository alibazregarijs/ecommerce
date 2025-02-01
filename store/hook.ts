import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFuntion = () => AppDispatch;

export const useProductDispatch: DispatchFuntion = useDispatch;

export const useProductSelector: TypedUseSelectorHook<RootState> = useSelector;
