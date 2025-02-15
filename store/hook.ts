import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFuntion = () => AppDispatch;

export const useProductDispatch: DispatchFuntion = useDispatch;
export const useCartDispatch: DispatchFuntion = useDispatch;
export const useCommentDispatch: DispatchFuntion = useDispatch;

export const useProductSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCommentSelector: TypedUseSelectorHook<RootState> = useSelector;

